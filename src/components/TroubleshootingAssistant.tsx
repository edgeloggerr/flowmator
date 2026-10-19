import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ChevronRight, AlertTriangle, ArrowRight, RefreshCw, ExternalLink } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  category: string;
  cause: string;
  steps: string[];
  docLink: string;
}

const ISSUES: Issue[] = [
  {
    id: 'tab-detection',
    title: 'Flowmator displays "Google Flow Not Detected" lock screen',
    category: 'Tab Validation',
    cause: 'The active Chrome tab does not match supported URL patterns (labs.google or flow.google), or Chrome tab permissions are pending.',
    steps: [
      'Ensure you have opened https://flow.google.com or https://labs.google/flow in an active Chrome window.',
      'Click anywhere inside the Google Flow web page so it becomes the focused active tab.',
      'Click the "Recheck Tab" button inside the Flowmator side panel lock screen.',
      'If using multiple Chrome windows, ensure the side panel is docked to the window holding the Google Flow tab.'
    ],
    docLink: '/documentation/troubleshooting#tab-detection'
  },
  {
    id: 'prompt-submission',
    title: 'Prompts are in queue but not entering the input box',
    category: 'Input Dispatch',
    cause: 'The Google Flow ProseMirror rich text editor was not focused, or another extension is blocking Chrome DevTools Protocol.',
    steps: [
      'Click once inside the Google Flow prompt input area to ensure the ProseMirror cursor is active.',
      'Check whether the Chrome top bar shows "Flowmator started debugging this browser". This confirms the Chrome DevTools Protocol is attached.',
      'If you have Chrome DevTools (F12) open on the same tab, close it, as Chrome allows only one debugger attachment per tab.',
      'Flowmator will automatically fall back to in-page transaction dispatching if CDP is occupied.'
    ],
    docLink: '/documentation/troubleshooting#prompt-submission'
  },
  {
    id: 'tile-timeout',
    title: 'Generation timed out after 90 seconds without verified tile',
    category: 'Canvas Verification',
    cause: 'Google Flow servers experienced high generation latency, or the generated image tile format changed in a recent Google update.',
    steps: [
      'Check the Google Flow web page directly: did the image generate, or is it still showing a circular loading spinner?',
      'If Google Flow is taking longer than 90s during peak traffic, switch to Turbo Interval Mode with a 60s delay to allow extended processing.',
      'Check if an ad-blocker or content-blocker is hiding newly inserted img elements on labs.google.',
      'Review your Chrome console (Ctrl+Shift+J) for any WebSocket disconnections from Google Flow.'
    ],
    docLink: '/documentation/troubleshooting#tile-timeout'
  },
  {
    id: 'error-tile',
    title: 'Flowmator pauses with "Sequence Paused: Generation Failed"',
    category: 'Sequence Protector',
    cause: 'Google Flow rendered a <flow-error-tile> due to a rate limit, content policy flag, or unusual activity notice.',
    steps: [
      'Observe the specific error text reported by Flowmator in the top alert banner.',
      'If caused by rate limiting: allow the 12-second cool-off timer to clear before retrying.',
      'If caused by a safety filter: click the ✏️ Edit button on the failed queue item to soften prompt keywords, then click 🔄 Retry.',
      'If you wish to bypass the scene and proceed with the remaining queue, click ⏭️ Skip & Continue.'
    ],
    docLink: '/documentation/safe-sequence-mode#error-tiles'
  },
  {
    id: 'downloads-inactive',
    title: 'Images are generated but not saving to disk',
    category: 'Auto-Downloads',
    cause: 'The "Auto-Download Images" toggle is disabled, or Chrome download shelf permissions require user confirmation.',
    steps: [
      'In the Flowmator side panel settings, ensure the "Auto-Download Images" switch is toggled ON (green slider).',
      'Check your browser download settings (chrome://settings/downloads): ensure "Ask where to save each file before downloading" is OFF if you want silent automatic saving.',
      'Check that Chrome has disk permissions to write to your default Downloads directory.'
    ],
    docLink: '/documentation/troubleshooting#downloads'
  }
];

export default function TroubleshootingAssistant() {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(ISSUES[0].id);
  const currentIssue = ISSUES.find((i) => i.id === selectedIssueId) || ISSUES[0];

  return (
    <div className="w-full max-w-4xl mx-auto glass-tier2 rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl">
      <div className="mb-6">
        <span className="text-xs font-mono font-semibold text-aqua-liquid uppercase tracking-wider">
          Diagnostic Workflow
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Interactive Troubleshooting Assistant
        </h3>
        <p className="text-sm text-brandText-secondary mt-1">
          Select the symptom you are experiencing in Google Flow to receive verified, code-level resolution steps:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Issue Selection List */}
        <div className="md:col-span-5 space-y-2">
          {ISSUES.map((issue) => {
            const isSelected = issue.id === selectedIssueId;
            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'glass-tier3 border-violet-electric/60 text-white shadow-lg shadow-violet-electric/20 ring-1 ring-violet-electric/30'
                    : 'bg-graphite-900/60 border-white/5 text-brandText-secondary hover:text-white hover:border-white/15'
                }`}
              >
                <div>
                  <span className="text-[10px] block font-mono text-brandText-tertiary mb-0.5">{issue.category}</span>
                  <span className="line-clamp-2">{issue.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-aqua-liquid translate-x-0.5' : 'text-brandText-tertiary'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Diagnosis & Resolution Plan */}
        <div className="md:col-span-7 glass-tier3 rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 text-aqua-liquid shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-brandText-tertiary">{currentIssue.category}</span>
              <h4 className="text-base font-bold text-white mt-0.5">{currentIssue.title}</h4>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-graphite-900/70 border border-white/5 text-xs text-brandText-secondary">
            <strong className="text-brandText-primary">Root Cause: </strong>
            {currentIssue.cause}
          </div>

          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-2.5">
              Recommended Resolution Steps:
            </h5>
            <ol className="space-y-2">
              {currentIssue.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-brandText-secondary">
                  <span className="w-4 h-4 rounded-full bg-violet-500/20 text-violet-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-violet-400/30">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <a
              href={currentIssue.docLink}
              className="text-xs text-aqua-liquid hover:text-white flex items-center gap-1 font-medium transition-colors"
            >
              Read full documentation article <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-[11px] text-brandText-tertiary">Verified against v1.0.0</span>
          </div>

        </div>

      </div>
    </div>
  );
}
