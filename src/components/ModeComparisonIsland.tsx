import React, { useState } from 'react';
import { Shield, Zap, CheckCircle2, AlertCircle, Clock, Eye, RotateCcw, Lock } from 'lucide-react';

export default function ModeComparisonIsland() {
  const [selectedMode, setSelectedMode] = useState<'safe' | 'turbo'>('safe');

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Mode Switcher Buttons */}
      <div className="flex justify-center mb-8">
        <div className="glass-tier3 p-1.5 rounded-full inline-flex border border-white/15 shadow-xl">
          <button
            onClick={() => setSelectedMode('safe')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedMode === 'safe'
                ? 'bg-gradient-to-r from-violet-electric to-violet-deep text-white shadow-lg shadow-violet-electric/40 border border-white/20'
                : 'text-brandText-secondary hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Safe Sequence Mode</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">Verified</span>
          </button>

          <button
            onClick={() => setSelectedMode('turbo')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedMode === 'turbo'
                ? 'bg-gradient-to-r from-cyan-500 to-aqua-liquid text-graphite-900 shadow-lg shadow-aqua-liquid/40 font-bold border border-white/20'
                : 'text-brandText-secondary hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Turbo Interval Mode</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-900 font-mono">Fast Push</span>
          </button>
        </div>
      </div>

      {/* Main Comparison Glass Card */}
      <div className="glass-tier2 rounded-3xl p-6 md:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow based on active mode */}
        <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          selectedMode === 'safe' ? 'bg-violet-electric/15' : 'bg-aqua-liquid/15'
        }`} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Descriptive Analysis */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 bg-white/5">
              {selectedMode === 'safe' ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Continuous Storyboard Integrity</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300">High-Volume Batch Injection</span>
                </>
              )}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {selectedMode === 'safe'
                ? 'Canvas-Verified Sequencing with Zero Missing Frames'
                : 'Rapid Timed Injection with Randomized Human Jitter'}
            </h3>

            <p className="text-brandText-secondary text-sm md:text-base leading-relaxed">
              {selectedMode === 'safe'
                ? 'Safe Sequence Mode snapshots the Google Flow DOM state before dispatching. It actively watches for generated image media-ids and intercepts <flow-error-tile> elements. If Google rate-limits or rejects a prompt, the sequence protector pauses to keep your narrative storyline intact.'
                : 'Turbo Interval Mode dispatches queued prompts continuously at randomized intervals (e.g. 25s–45s). It maximizes injection speed for broad experimental prompt batches where individual frame order is flexible and manual monitoring is acceptable.'}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {selectedMode === 'safe' ? (
                <>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Pre-Flight Snapshot:</strong> Catalogs existing canvas media-ids.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Error Tile Detection:</strong> Detects policy & rate-limit tiles.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Rate-Limit Cool-off:</strong> Auto-cooldown (12s) before retry.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Sequence Protector:</strong> Audio alert & pause on failure.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Continuous Dispatch:</strong> Injects prompts non-stop.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Randomized Cadence:</strong> 25-45s human-like jitter.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>High Throughput:</strong> Fast prompt pipeline.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-brandText-primary">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Low Verification Overhead:</strong> Minimal DOM polling.</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Visual Parameter Dashboard Widget */}
          <div className="lg:col-span-5">
            <div className="glass-tier3 p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Engine Configuration</span>
                <span className="text-[11px] font-mono text-aqua-liquid">
                  {selectedMode === 'safe' ? 'ENGINE: VERIFIED_SAFE' : 'ENGINE: TURBO_RAPID'}
                </span>
              </div>

              {selectedMode === 'safe' ? (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" /> Canvas Polling Timeout
                    </span>
                    <span className="font-mono text-white font-semibold">90 seconds</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5 text-violet-400" /> Max Auto-Retries
                    </span>
                    <span className="font-mono text-white font-semibold">2 Attempts</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Rate-Limit Cool-off
                    </span>
                    <span className="font-mono text-white font-semibold">12 seconds</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" /> Sequence Protector
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Active (Pause on gap)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> Minimum Interval
                    </span>
                    <span className="font-mono text-white font-semibold">25 seconds</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> Maximum Interval
                    </span>
                    <span className="font-mono text-white font-semibold">45 seconds</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Jitter Range
                    </span>
                    <span className="font-mono text-white font-semibold">100-500ms</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-graphite-900/60 border border-white/5">
                    <span className="text-brandText-secondary flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-400" /> User Oversight
                    </span>
                    <span className="font-mono text-yellow-400 font-semibold">Manual Monitoring</span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={selectedMode === 'safe' ? '/documentation/safe-sequence-mode' : '/documentation/turbo-mode'}
                  className="w-full py-2.5 rounded-xl glass-tier3 text-center block text-xs font-semibold text-white hover:border-violet-electric/40 transition-colors"
                >
                  Read Full {selectedMode === 'safe' ? 'Safe Sequence' : 'Turbo Mode'} Specs ➔
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
