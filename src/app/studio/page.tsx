"use client";

import React, { useState } from "react";
import { Camera, Film, Sparkles, Sliders, Copy, Layers, Play } from "lucide-react";

export default function StudioPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const renderSpecs = [
    {
      title: "Imperial Ceylon Sapphire Halo (Bespoke Solitaire)",
      department: "Photography & Render",
      director: "Julian Sterling",
      lensSpec: "100mm f/2.8 Macro 1:1 Reproduction",
      lightingSetup: "Dual Key Diffused Softboxes + Micro Snoot for Table Facet Caustics",
      refractiveIndex: "1.762 – 1.770 (Ceylon Sapphire), 2.417 (Diamond Halo)",
      prompt8K: "Editorial high-jewelry photograph of a 5-carat emerald-cut Ceylon sapphire ring surrounded by micro-pavé diamonds, set in platinum 950. The ring rests upon dark polished obsidian slate with subtle champagne gold caustic light refractions. Ultra-sharp facet reflections, zero optical aberrations, 8k resolution, cinematic lighting, Hasselblad H6D-100c quality.",
    },
    {
      title: "Solitaire Royal 3ct (18K Yellow Gold Cathedral Setting)",
      department: "Photography & Render",
      director: "Julian Sterling",
      lensSpec: "90mm Tilt-Shift Macro for Edge-to-Edge Sharpness",
      lightingSetup: "Subtle Overhead Rim Light + Silver Reflector Under Carriage",
      refractiveIndex: "2.417 (Ideal Cut Diamond)",
      prompt8K: "Museum-grade jewelry macro shot of a 3-carat round brilliant solitaire diamond mounted on an 18K polished yellow gold cathedral band. Warm gold specular highlights, brilliant internal rainbow prism flare from pavilion facets. Pure black velvet background with minimal depth of field falloff.",
    },
  ];

  const videoScripts = [
    {
      title: "360° Artisan Turnaround: The Anatomy of Brilliance",
      director: "Kai Thorne (Video Production)",
      format: "9:16 Vertical Reel (4K 60fps)",
      audioDirection: "Deep ambient cello swells transitioning into delicate mechanical ticking of gem setting tools.",
      scenes: [
        { time: "0:00 - 0:02", desc: "Extreme macro slow-motion: artisan tweezers lower a 3ct diamond into platinum prongs." },
        { time: "0:02 - 0:05", desc: "Directional light sweeps across table facet, triggering vivid prismatic fire." },
        { time: "0:05 - 0:08", desc: "Smooth 360-degree rotation of complete ring on floating mirror pedestal." },
        { time: "0:08 - 0:10", desc: "Subtle fade: 'House of Jewelux — Where Heritage Meets Autonomous Precision'." },
      ],
    },
  ];

  const handleCopyPrompt = (idx: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#121c2e] via-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Creative Visual Studio • Macro Photography &amp; Video Production</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Creative Render Studio</h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Formulating physical ray-tracing prompts, optical refractive indices, and cinematic video storyboards for House of Jewelux high-jewelry collections.
          </p>
        </div>
      </div>

      {/* 3D Macro Photography Prompts */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>8K Macro Photorealistic Render Specifications</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderSpecs.map((spec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[#1e293b] bg-[#0f172a] hover:border-[#d4af37]/30 transition-all space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#d4af37]">
                    {spec.department} • {spec.director}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 mt-0.5">{spec.title}</h3>
                </div>
              </div>

              {/* Optical Camera Spec Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                  <span className="text-slate-400 block text-[10px]">Lens & Sensor</span>
                  <span className="font-semibold text-slate-200">{spec.lensSpec}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                  <span className="text-slate-400 block text-[10px]">Refractive Index</span>
                  <span className="font-mono text-amber-400">{spec.refractiveIndex}</span>
                </div>
                <div className="col-span-2 p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                  <span className="text-slate-400 block text-[10px]">Lighting Rig</span>
                  <span className="text-slate-300">{spec.lightingSetup}</span>
                </div>
              </div>

              {/* Copyable 8K Prompt Box */}
              <div className="p-3.5 rounded-xl bg-[#080d18] border border-[#1e293b] text-xs text-amber-200/90 relative group">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block mb-1">
                  Midjourney v6 / Gemini Imagen Prompt:
                </span>
                <p className="line-clamp-4 leading-relaxed font-mono text-[11px]">
                  {spec.prompt8K}
                </p>
                <button
                  onClick={() => handleCopyPrompt(idx, spec.prompt8K)}
                  className="mt-2 text-[10px] font-mono px-2.5 py-1 rounded bg-[#1e293b] text-slate-200 hover:text-white flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedIndex === idx ? "Copied to Clipboard!" : "Copy Full Prompt"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Video Scripts */}
      <div className="space-y-4 pt-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
          <Film className="w-4 h-4 text-sky-400" />
          <span>Cinematic Video Storyboards &amp; Short Scripts</span>
        </h2>

        {videoScripts.map((v, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-[#1e293b] bg-[#0f172a] space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400">
                  {v.director} • {v.format}
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">{v.title}</h3>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs text-slate-300">
              <strong className="text-slate-400 font-mono text-[10px] uppercase block mb-1">Audio &amp; Voiceover Direction</strong>
              {v.audioDirection}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {v.scenes.map((scene, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs space-y-1.5"
                >
                  <span className="text-[10px] font-mono font-bold text-[#d4af37] bg-amber-500/10 px-2 py-0.5 rounded">
                    {scene.time}
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed pt-1">{scene.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
