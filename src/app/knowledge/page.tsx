"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Plus,
  Search,
  BookOpen,
  Tag,
  Clock,
  Shield,
  X,
} from "lucide-react";

export default function KnowledgePage() {
  const { knowledgeDocs, addKnowledgeDoc, activeCompany } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Doc Form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<
    "brand_guidelines" | "sop" | "product_spec" | "strategy" | "policy"
  >("brand_guidelines");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  const filteredDocs = knowledgeDocs.filter((doc) => {
    if (selectedCategory !== "all" && doc.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addKnowledgeDoc({
      companyId: activeCompany.id,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
      author: "Founder Yuvraj Soni",
      version: "1.0",
    });

    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Company Memory Vault • Isolated Knowledge Repository</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Knowledge Base &amp; Brand Memory
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Central repository for <strong>{activeCompany.name}</strong> Brand Bible, Standard Operating Procedures (SOPs), ethical sourcing protocols, and gemological guidelines. All AI employees ground their actions on these documents.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Document</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "brand_guidelines", "sop", "product_spec", "strategy"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
              }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents or tags..."
            className="text-xs pl-9 pr-4 py-2 rounded-xl bg-[#0f172a] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none w-full sm:w-64 placeholder:text-slate-600 transition-all"
          />
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-2xl border border-[#1e293b] bg-[#0f172a] hover:border-[#d4af37]/30 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  {doc.category.replace("_", " ")}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Version {doc.version}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-100">{doc.title}</h2>
              <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                <span>Author: {doc.author}</span>
                <span>•</span>
                <span>Updated: {formatDate(doc.updatedAt)}</span>
              </div>

              {/* Content Preview */}
              <div className="mt-4 p-4 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs text-slate-300 font-mono leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {doc.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {doc.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1 text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Isolated to {activeCompany.name}</span>
              </span>
              <span className="font-mono text-[10px]">Active Grounding Context</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0f172a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-bold text-slate-100">Add Knowledge Document</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Document Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. VIP Concierge High-Jewelry Etiquette SOP"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                >
                  <option value="brand_guidelines">Brand Guidelines</option>
                  <option value="sop">Standard Operating Procedure (SOP)</option>
                  <option value="product_spec">Product Specifications</option>
                  <option value="strategy">Business Strategy</option>
                  <option value="policy">Company Policy</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Content (Markdown supported)</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Document body, principles, and guidelines for AI employees..."
                  rows={6}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. etiquette, concierge, vip, guidelines"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1e293b] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1e293b] text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black font-bold hover:brightness-110 shadow-lg shadow-amber-500/20"
                >
                  Commit Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
