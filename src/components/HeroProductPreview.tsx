import React, { useState, useEffect } from 'react';
import { Shield, Zap, RefreshCw, CheckCircle2, AlertTriangle, Play, Pause, Volume2, Sparkles, Sliders, ChevronRight } from 'lucide-react';

interface QueueItem {
  id: number;
  text: string;
  status: 'completed' | 'generating' | 'verifying' | 'pending' | 'retrying';
  attempt: number;
}

export default function HeroProductPreview() {
  const [activeMode, setActiveMode] = useState<'safe' | 'turbo'>('safe');
  const [isRunning, setIsRunning] = useState(true);
  const [countdown, setCountdown] = useState(6);
  const [soundPlayed, setSoundPlayed] = useState(false);

  const [queue, setQueue] = useState<QueueItem[]>([
    {
      id: 1,
      text: "01 — Wide cinematic establishing shot, futuristic neo-tokyo skyline under purple neon rain",
      status: 'completed',
      attempt: 1
    },
    {
      id: 2,
      text: "02 — Follow the same protagonist walking down rain-slicked neon alley with cybernetic visor",
      status: 'verifying',
      attempt: 1
    },
    {
      id: 3,
      text: "03 — Close-up portrait of operative decoding holographic data terminal, matching wardrobe",
      status: 'pending',
      attempt: 0
    },
    {
      id: 4,
      text: "04 — Climax hero shot overlooking illuminated dystopian metropolis from cathedral spire",
      status: 'pending',
      attempt: 0
    }
  ]);

  // Simulated timer
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Advance state
          setQueue((q) => {
            const next = [...q];
            if (next[1].status === 'verifying') {
              next[1].status = 'completed';
              next[2].status = 'generating';
            } else if (next[2].status === 'generating') {
              next[2].status = 'verifying';
            }
            return next;
          });
          return activeMode === 'safe' ? 8 : 4;
        }
        return prev - 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [isRunning, activeMode]);

  const playSynthesizedChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.45);
      setSoundPlayed(true);
      setTimeout(() => setSoundPlayed(false), 1500);
    } catch (_) {}
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Decorative Outer Ambient Glows */}
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-electric/20 via-aqua-liquid/15 to-violet-deep/20 rounded-3xl blur-2xl opacity-70 pointer-events-none -z-10" />

      {/* Main Container Glass Window */}
      <div className="glass-tier2 rounded-3xl p-5 md:p-7 overflow-hidden border border-white/15 shadow-2xl transition-all duration-300">
        
        {/* Top Window Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
            </div>
            <div className="h-4 w-px bg-white/15 mx-1" />
            <div className="flex items-center gap-2">
              <img src="/icons/icon32.png" alt="Flowmator" className="w-6 h-6 rounded-lg shadow" />
              <span className="font-semibold text-sm tracking-wide text-white">Flowmator Control Surface</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Google Flow Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={playSynthesizedChime}
              title="Test Extension Audio Chime"
              className="px-2.5 py-1 text-xs rounded-full glass-tier3 text-brandText-secondary hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-aqua-liquid" />
              <span>{soundPlayed ? 'Chime Played! 🔔' : 'Audio Chime'}</span>
            </button>
            <span className="text-[11px] text-brandText-tertiary bg-graphite-900/60 px-2 py-1 rounded-md border border-white/5">
              Interactive Preview
            </span>
          </div>
        </div>

        {/* Interior Surface: Mode Switcher & Stats */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Mode Selector Pill */}
          <div className="md:col-span-2 glass-tier3 p-1.5 rounded-2xl flex items-center justify-between border border-white/10">
            <button
              onClick={() => setActiveMode('safe')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                activeMode === 'safe'
                  ? 'bg-gradient-to-r from-violet-electric to-violet-deep text-white shadow-lg shadow-violet-electric/30 border border-white/20'
                  : 'text-brandText-secondary hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Safe Sequence Mode</span>
              <span className="text-[10px] opacity-75 bg-black/20 px-1.5 py-0.5 rounded">Verified</span>
            </button>

            <button
              onClick={() => setActiveMode('turbo')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                activeMode === 'turbo'
                  ? 'bg-gradient-to-r from-cyan-500 to-aqua-liquid text-graphite-900 shadow-lg shadow-aqua-liquid/30 font-semibold'
                  : 'text-brandText-secondary hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Turbo Interval Mode</span>
              <span className="text-[10px] opacity-80 bg-black/20 px-1.5 py-0.5 rounded">Fast Push</span>
            </button>
          </div>

          {/* Real-time Status Gauge */}
          <div className="glass-tier3 px-4 py-2 rounded-2xl flex items-center justify-between border border-white/10">
            <div>
              <div className="text-[11px] text-brandText-tertiary uppercase tracking-wider">Canvas Verification</div>
              <div className="text-xs font-medium text-white flex items-center gap-1.5 mt-0.5">
                {activeMode === 'safe' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Active DOM Diffing</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Timer Cadence: 25-45s</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-brandText-tertiary">Next Action in</div>
              <div className="text-base font-mono font-bold text-aqua-liquid">{countdown}s</div>
            </div>
          </div>
        </div>

        {/* Live Storyboard Sequence Queue */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Sequential Prompt Queue</span>
              <span className="text-xs text-brandText-tertiary">({queue.length} scenes in memory)</span>
            </div>
            <div className="text-xs text-brandText-tertiary flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" /> 1 Done
              <span className="inline-block w-2 h-2 rounded-full bg-violet-400" /> 1 Verifying
              <span className="inline-block w-2 h-2 rounded-full bg-brandText-tertiary" /> 2 Waiting
            </div>
          </div>

          <div className="space-y-2.5">
            {queue.map((item, idx) => {
              const isDone = item.status === 'completed';
              const isVerifying = item.status === 'verifying';
              const isGenerating = item.status === 'generating';

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-graphite-900/60 border-emerald-500/20 text-brandText-secondary'
                      : isVerifying
                      ? 'bg-violet-900/25 border-violet-electric/40 text-white shadow-lg shadow-violet-electric/15 ring-1 ring-violet-electric/30'
                      : isGenerating
                      ? 'bg-aqua-liquid/10 border-aqua-liquid/30 text-white'
                      : 'bg-graphite-800/40 border-white/5 text-brandText-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      isVerifying ? 'bg-violet-500/30 text-violet-200 border border-violet-400/40 animate-pulse' :
                      'bg-white/5 text-brandText-tertiary border border-white/10'
                    }`}>
                      #{idx + 1}
                    </span>
                    <p className="text-xs truncate font-medium">{item.text}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDone && (
                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Tile Verified
                      </span>
                    )}
                    {isVerifying && (
                      <span className="text-[11px] font-medium text-violet-200 bg-violet-600/30 border border-violet-400/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-aqua-liquid" />
                        Canvas Diffing...
                      </span>
                    )}
                    {isGenerating && (
                      <span className="text-[11px] font-medium text-aqua-liquid bg-aqua-liquid/15 border border-aqua-liquid/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        CDP Injected
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className="text-[11px] font-medium text-brandText-tertiary bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        In Queue
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause Queue' : 'Resume Sequence'}</span>
            </button>

            <span className="text-xs text-brandText-tertiary hidden sm:inline">
              Sequence Protector: <strong className="text-emerald-400">Armed</strong> (Halts on error tile)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-brandText-secondary">
            <span className="font-mono text-white">4 Prompts</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">0 Broken Frames</span>
          </div>
        </div>

      </div>
    </div>
  );
}
