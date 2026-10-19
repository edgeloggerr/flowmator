import React, { useState } from 'react';
import { Layers, Terminal, Cpu, Monitor, CheckCircle, AlertOctagon, ArrowRight, Info, ShieldCheck, Database } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  tech: string;
  details: string;
  codeSnippet: string;
}

const STAGES: Stage[] = [
  {
    id: 'queue',
    name: '1. Queue & State Store',
    subtitle: 'Persistent Local Queue',
    icon: Database,
    tech: 'chrome.storage.local',
    details: 'Prompts parsed from raw multi-lines or CSV files. Each prompt receives a UUID, attempt counter, status tag, and error container. Persisted completely locally with zero external network syncing.',
    codeSnippet: `// Storage schema
{
  id: crypto.randomUUID(),
  text: "01 — Wide cinematic...",
  status: "pending",
  attempts: 0,
  error: null
}`
  },
  {
    id: 'controller',
    name: '2. Execution Controller',
    subtitle: 'Sidepanel Orchestrator',
    icon: Cpu,
    tech: 'chrome.sidePanel + background.js',
    details: 'Runs inside the sidepanel isolated context. Manages execution loops, lock-screen tab validations (verifying labs.google or flow.google), countdown tickers, and state dispatching.',
    codeSnippet: `// Tab target validation
function isFlowUrl(url) {
  return url.includes("labs.google") || 
         url.includes("flow.google");
}`
  },
  {
    id: 'dispatch',
    name: '3. Hardware-Level Dispatch',
    subtitle: 'CDP + In-Page Fallback',
    icon: Terminal,
    tech: 'chrome.debugger (Protocol 1.3)',
    details: 'Primary method attaches Chromium DevTools Protocol (CDP) to dispatch authentic isTrusted: true input events (Input.insertText, Input.dispatchKeyEvent) into ProseMirror. If CDP is unavailable, seamlessly falls back to in-page transaction dispatching.',
    codeSnippet: `// Chrome DevTools Protocol Dispatch
await chrome.debugger.sendCommand(target, "Input.insertText", {
  text: promptText
});
// Jitter delay (100-500ms) before Enter
await chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", {
  type: "rawKeyDown", windowsVirtualKeyCode: 13, key: "Enter"
});`
  },
  {
    id: 'flow-dom',
    name: '4. Google Flow Canvas',
    subtitle: 'Angular / ProseMirror Editor',
    icon: Monitor,
    tech: 'Google Flow UI Surface',
    details: 'Google Flow receives the hardware input, validates prompt length, and queues the generation on Google cloud infrastructure. The canvas updates dynamically via client-side DOM mutations.',
    codeSnippet: `// Google Flow UI targets
div.ProseMirror[contenteditable="true"]
button.generate-icon-button
img[data-media-id]`
  },
  {
    id: 'verification',
    name: '5. Canvas Tile Verification',
    subtitle: 'Snapshot & Polling Diff',
    icon: ShieldCheck,
    tech: 'chrome.scripting (world: MAIN)',
    details: 'Before dispatch, takes a snapshot of existing image media-ids and error tiles. Actively polls for up to 90 seconds. Diffs canvas images and detects any newly generated <flow-error-tile> with custom error text.',
    codeSnippet: `// Active DOM Diffing
const newImages = currentImgs.filter(img => {
  const id = img.getAttribute('data-media-id');
  return id && !beforeSet.has(id);
});`
  },
  {
    id: 'recovery',
    name: '6. Safe Protector & Audio Chime',
    subtitle: 'Rate-Limit Cool-off & Halt',
    icon: AlertOctagon,
    tech: 'Web Audio API + UI Alert Banner',
    details: 'If an error tile appears (e.g. rate limit, policy flag), initiates a 12s cool-off before retrying. If retries are exhausted, halts the sequence, triggers a dual-tone audio chime (587Hz -> 880Hz), and presents interactive Retry/Skip controls.',
    codeSnippet: `// Web Audio synthesized chime
const osc = ctx.createOscillator();
osc.frequency.setValueAtTime(587.33, ctx.currentTime);
osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);`
  }
];

export default function ArchitectureDiagramIsland() {
  const [activeStage, setActiveStage] = useState<Stage>(STAGES[2]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Visual Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          const isSelected = activeStage.id === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? 'glass-tier2 border-violet-electric/60 shadow-lg shadow-violet-electric/25 ring-1 ring-violet-electric/40'
                  : 'glass-tier3 border-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-aqua-liquid' : 'text-brandText-secondary'}`} />
                <span className="text-[10px] font-mono text-brandText-tertiary">#0{STAGES.indexOf(stage) + 1}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{stage.name.split('. ')[1]}</div>
                <div className="text-[10px] text-brandText-tertiary truncate mt-0.5">{stage.tech.split(' ')[0]}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Drawer */}
      <div className="glass-tier2 rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-aqua-liquid">
              {React.createElement(activeStage.icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{activeStage.name}</h4>
              <span className="text-xs text-brandText-tertiary font-mono">{activeStage.tech}</span>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brandText-secondary">
            Click any step above to inspect architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-start">
          <div className="md:col-span-7 space-y-4">
            <p className="text-brandText-secondary text-sm leading-relaxed">{activeStage.details}</p>
            
            <div className="p-3.5 rounded-xl bg-graphite-900/60 border border-white/5 flex items-start gap-3">
              <Info className="w-4 h-4 text-aqua-liquid shrink-0 mt-0.5" />
              <div className="text-xs text-brandText-tertiary">
                <strong className="text-white">Design Principle: </strong> 
                Third-party web applications like Google Flow frequently modify their client-side DOM. Flowmator uses resilient multi-strategy selectors and hardware emulation rather than hard-coded script injections.
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-graphite-900/90 shadow-inner">
              <div className="px-3.5 py-2 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-brandText-tertiary">
                <span>Verified Code Excerpt</span>
                <span className="text-aqua-liquid">scripts/sidepanel.js</span>
              </div>
              <pre className="p-3.5 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                <code>{activeStage.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
