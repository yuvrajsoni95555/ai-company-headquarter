import { NextRequest, NextResponse } from "next/server";
import { executeAgentTask, superviseTaskDeliverable } from "@/lib/ai/orchestrator";
import { MissingCredentialsError } from "@/lib/ai/provider";
import { generateVerificationHash } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const {
      taskTitle,
      taskDescription,
      agentId,
      agentName,
      agentDesignation,
      departmentName,
      previousAuditHash,
    } = await req.json();

    if (!taskTitle || !agentId) {
      return NextResponse.json(
        { error: "taskTitle and agentId are required" },
        { status: 400 }
      );
    }

    // Step 1: Agent Execution Loop
    const execution = await executeAgentTask(
      taskTitle,
      taskDescription || taskTitle,
      agentId,
      agentName || "Specialist Agent",
      agentDesignation || "Autonomous Specialist",
      departmentName || "Operations",
      req.headers
    );

    // Step 2: Independent Supervision (Archon Prime)
    const supervision = await superviseTaskDeliverable(
      taskTitle,
      execution.deliverable,
      agentName || "Specialist Agent",
      departmentName || "Operations",
      req.headers
    );

    // Step 3: Cryptographic SHA-256 Audit Hash
    const timestamp = new Date().toISOString();
    const prevHash = previousAuditHash || "0000000000000000000000000000000000000000000000000000000000000000";
    const auditHash = generateVerificationHash(
      `${agentName} -> Archon Prime`,
      `Executed & Supervised: ${taskTitle} (${supervision.verdict})`,
      timestamp,
      prevHash
    );

    return NextResponse.json({
      success: true,
      deliverable: execution.deliverable,
      modelUsed: execution.model,
      tokensUsed: execution.tokensUsed,
      executionNote: execution.executionNote,
      supervision,
      auditHash,
      timestamp,
    });
  } catch (err: any) {
    if (err instanceof MissingCredentialsError || err.name === "MissingCredentialsError") {
      return NextResponse.json(
        {
          success: false,
          requiresApiKey: true,
          message: err.message,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to execute agent task",
      },
      { status: 500 }
    );
  }
}
