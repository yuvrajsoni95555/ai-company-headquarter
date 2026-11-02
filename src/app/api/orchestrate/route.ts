import { NextRequest, NextResponse } from "next/server";
import { decomposeFounderObjective } from "@/lib/ai/orchestrator";
import { MissingCredentialsError } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const { objective } = await req.json();

    if (!objective || typeof objective !== "string") {
      return NextResponse.json({ error: "Objective text is required" }, { status: 400 });
    }

    const plan = await decomposeFounderObjective(objective, req.headers);

    return NextResponse.json({
      success: true,
      objective,
      plan,
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
        error: err.message || "Failed to orchestrate objective",
      },
      { status: 500 }
    );
  }
}
