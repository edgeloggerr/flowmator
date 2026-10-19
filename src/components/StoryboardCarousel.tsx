import React, { useState } from 'react';
import { Film, Sparkles, Copy, Check, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface StoryboardPreset {
  id: string;
  genre: string;
  title: string;
  description: string;
  frames: {
    number: string;
    label: string;
    prompt: string;
    aesthetic: string;
  }[];
}

const PRESETS: StoryboardPreset[] = [
  {
    id: 'noir',
    genre: 'Cinematic Noir',
    title: 'Rainy Detective Investigation',
    description: 'A 4-frame noir sequence moving from an establishing office shot to an alley pursuit.',
    frames: [
      {
        number: 'Shot 01',
        label: 'Establishing Shot',
        prompt: '1. Establishing shot, rainy 1940s detective office window at midnight, neon Venetian blinds casting shadows, monochrome film noir style',
        aesthetic: 'High contrast chiaroscuro, rain streaks, dim neon reflection'
      },
      {
        number: 'Shot 02',
        label: 'Medium Close-up',
        prompt: '2. Medium close-up, rugged detective in trenchcoat examining classified telegram under dim desk lamp, high contrast chiaroscuro',
        aesthetic: 'Cigarette smoke haze, focused beam lighting, 35mm grain'
      },
      {
        number: 'Shot 03',
        label: 'Tracking Shot',
        prompt: '3. Low-angle tracking shot, trenchcoat figure stepping out into wet reflective cobblestone street, dark alleys, dramatic backlight',
        aesthetic: 'Reflective puddles, distant silhouette, steam rising'
      },
      {
        number: 'Shot 04',
        label: 'Climax Confrontation',
        prompt: '4. Climax over-the-shoulder shot, silhouette confrontation beneath street lamp with smoke rising from subway grate, 35mm film grain',
        aesthetic: 'Dramatic silhouette backlighting, harsh shadows, tension'
      }
    ]
  },
  {
    id: 'cyberpunk',
    genre: 'Sci-Fi Cyberpunk',
    title: 'Neo-Shinjuku 2099 Pursuit',
    description: 'A continuous futuristic narrative from panoramic megastructure heights to night market streets.',
    frames: [
      {
        number: 'Shot 01',
        label: 'Wide Panorama',
        prompt: '1. Wide panoramic view of Neo-Shinjuku 2099, towering holographic billboards, flying aerodynes weaving between megastructures',
        aesthetic: 'Cyan and magenta volumetric lighting, megastructure scale'
      },
      {
        number: 'Shot 02',
        label: 'Medium Action',
        prompt: '2. Medium shot of cyborg courier with neon visor speeding on monowheel through crowded rain-slicked night market',
        aesthetic: 'Motion blur, neon street stall reflections, steam'
      },
      {
        number: 'Shot 03',
        label: 'Detail Close-up',
        prompt: '3. Close-up biometric scanner terminal emitting cyan holographic readouts in dark high-tech alleyway',
        aesthetic: 'Holographic chromatic aberration, macro lens focus'
      },
      {
        number: 'Shot 04',
        label: 'Hero Vantage',
        prompt: '4. Low-angle hero shot of rogue operative perched atop cathedral gargoyle overlooking illuminated dystopian city',
        aesthetic: 'Overlook perspective, windblown fabric, neon haze'
      }
    ]
  },
  {
    id: 'anime',
    genre: 'Anime Pastoral',
    title: 'Studio Ghibli Serenity',
    description: 'Gentle watercolor storytelling moving from emerald countryside to seaside railway tracks.',
    frames: [
      {
        number: 'Shot 01',
        label: 'Panoramic Meadow',
        prompt: '1. Studio Ghibli inspired watercolor panorama of rolling emerald hills, blooming wildflowers, and distant windmill under puffy summer clouds',
        aesthetic: 'Soft hand-painted gouache, azure skies, warm breeze'
      },
      {
        number: 'Shot 02',
        label: 'Village Corner',
        prompt: '2. Quaint seaside village cobblestone street with a vintage bicycle leaning against bakery flowerpot, warm golden sunlight',
        aesthetic: 'Golden afternoon lighting, terracotta tiles, nostalgic warmth'
      },
      {
        number: 'Shot 03',
        label: 'Coastal Rail',
        prompt: '3. Nostalgic train track crossing running along the coastline, sparkling turquoise ocean, nostalgic Japanese summer vibe',
        aesthetic: 'Glittering waves, nostalgic train signal, blue horizon'
      },
      {
        number: 'Shot 04',
        label: 'Dusk Haven',
        prompt: '4. Whimsical treehouse library nestled in giant mossy oak tree with floating lanterns glowing at dusk, hand-painted anime background',
        aesthetic: 'Twilight fireflies, warm lantern glow, moss texture'
      }
    ]
  }
];

export default function StoryboardCarousel() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const preset = PRESETS[selectedPresetIndex];
  const frame = preset.frames[activeFrameIndex];

  const handleCopyChain = () => {
    const text = preset.frames.map((f) => f.prompt).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-tier2 rounded-3xl p-6 md:p-10 border border-white/15 shadow-2xl">
      
      {/* Top Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPresetIndex(idx);
                setActiveFrameIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedPresetIndex === idx
                  ? 'glass-btn-primary shadow-lg'
                  : 'glass-tier3 text-brandText-secondary hover:text-white'
              }`}
            >
              {p.genre}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopyChain}
          className="px-3.5 py-1.5 rounded-full glass-tier3 text-xs text-aqua-liquid hover:text-white flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Chain Copied to Clipboard!' : 'Copy 4-Shot Prompt Sequence'}</span>
        </button>
      </div>

      {/* Preset Title & Description */}
      <div className="mt-6 mb-8">
        <span className="text-xs font-mono text-aqua-liquid uppercase tracking-wider">{preset.genre} Template</span>
        <h3 className="text-2xl font-bold text-white mt-1">{preset.title}</h3>
        <p className="text-xs md:text-sm text-brandText-secondary mt-1">{preset.description}</p>
      </div>

      {/* Horizontal Frame Navigation Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {preset.frames.map((f, idx) => {
          const isActive = idx === activeFrameIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveFrameIndex(idx)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isActive
                  ? 'glass-tier3 border-violet-electric/60 ring-1 ring-violet-electric/40 shadow-lg shadow-violet-electric/20'
                  : 'bg-graphite-900/60 border-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-brandText-tertiary mb-1">
                <span>{f.number}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-aqua-liquid animate-pulse" />}
              </div>
              <div className="text-xs font-bold text-white truncate">{f.label}</div>
            </button>
          );
        })}
      </div>

      {/* Active Frame Showcase Glass Box */}
      <div className="glass-tier3 rounded-2xl p-6 border border-white/10 space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-violet-600/30 border border-violet-400/30 text-violet-200 text-xs font-mono font-semibold">
              {frame.number} : {frame.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFrameIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeFrameIndex === 0}
              className="p-1.5 rounded-lg glass-tier3 text-brandText-secondary hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveFrameIndex((prev) => Math.min(preset.frames.length - 1, prev + 1))}
              disabled={activeFrameIndex === preset.frames.length - 1}
              className="p-1.5 rounded-lg glass-tier3 text-brandText-secondary hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-graphite-900/90 border border-white/5 font-mono text-xs text-brandText-primary leading-relaxed">
          {frame.prompt}
        </div>

        <div className="flex items-center justify-between text-xs text-brandText-tertiary pt-2 border-t border-white/5">
          <span>
            <strong className="text-brandText-secondary">Target Atmosphere:</strong> {frame.aesthetic}
          </span>
          <span className="font-mono text-emerald-400 text-[11px]">Ready for Flowmator Safe Mode</span>
        </div>
      </div>

    </div>
  );
}
