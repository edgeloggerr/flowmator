import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'bug',
    mode: 'safe',
    chromeVersion: '',
    extensionVersion: '1.0.0',
    description: '',
    consentDiagnostic: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; description?: string }>({});

  const validate = () => {
    const errs: { email?: string; description?: string } = {};
    if (!formData.email || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address for follow-up.';
    }
    if (!formData.description || formData.description.length < 15) {
      errs.description = 'Please describe the behavior in at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const generateDiagnosticReport = () => {
    return `[FLOWMATOR DIAGNOSTIC REPORT]
Date: ${new Date().toISOString()}
Extension Version: ${formData.extensionVersion}
Target Platform: Google Flow AI (labs.google / flow.google)
Active Mode: ${formData.mode}
Chrome Version: ${formData.chromeVersion || 'Chromium Standard'}
Issue Category: ${formData.category}
Issue Description: ${formData.description}`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateDiagnosticReport());
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-tier2 rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Direct Support Channel</h3>
        <p className="text-xs text-brandText-secondary mt-1">
          Need assistance or encountered a DOM shift in Google Flow? Prepare a diagnostic report below.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl glass-tier3 border border-aqua-liquid/30 space-y-4">
          <div className="flex items-center gap-3 text-aqua-liquid">
            <CheckCircle2 className="w-6 h-6" />
            <h4 className="text-base font-bold text-white">Diagnostic Report Prepared</h4>
          </div>
          <p className="text-xs text-brandText-secondary leading-relaxed">
            <strong>Notice:</strong> This portfolio build runs as a client-side static site without an unauthenticated backend database. To ensure your ticket reaches the maintainers directly, copy your structured diagnostic report below and submit it to the Flowmator GitHub Issue tracker or support inbox.
          </p>

          <div className="rounded-xl p-3 bg-graphite-900/90 border border-white/10 font-mono text-[11px] text-emerald-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
            {generateDiagnosticReport()}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleCopyReport}
              className="px-4 py-2 rounded-full glass-btn-primary text-xs flex items-center gap-2"
            >
              {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTemplate ? 'Copied to Clipboard!' : 'Copy Diagnostic Report'}</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-full glass-btn-secondary text-xs"
            >
              Edit Form
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brandText-primary mb-1">Your Name (Optional)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brandText-primary mb-1">
                Your Email <span className="text-violet-electric">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@creator.studio"
                className={`w-full px-3.5 py-2.5 rounded-xl glass-input text-xs ${errors.email ? 'border-red-500/60 ring-1 ring-red-500/40' : ''}`}
              />
              {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-brandText-primary mb-1">Issue Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-graphite-900 text-white"
              >
                <option value="tab-detect">Tab Validation / Lock Screen</option>
                <option value="input">Prompt Input / CDP Dispatch</option>
                <option value="verification">Canvas Tile Verification</option>
                <option value="rate-limit">Rate-Limit & Error Tiles</option>
                <option value="downloads">Auto-Download Feature</option>
                <option value="feature-request">Feature Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-brandText-primary mb-1">Active Execution Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-graphite-900 text-white"
              >
                <option value="safe">Safe Sequence Mode (Verified)</option>
                <option value="turbo">Turbo Interval Mode (Timed)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-brandText-primary mb-1">
              Issue Description & Steps to Reproduce <span className="text-violet-electric">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what occurred, any error text shown on the canvas, and your prompt settings..."
              className={`w-full px-3.5 py-2.5 rounded-xl glass-input text-xs ${errors.description ? 'border-red-500/60 ring-1 ring-red-500/40' : ''}`}
            />
            {errors.description && <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="diagnosticConsent"
              checked={formData.consentDiagnostic}
              onChange={(e) => setFormData({ ...formData, consentDiagnostic: e.target.checked })}
              className="rounded border-white/20 text-violet-electric focus:ring-0 bg-graphite-900"
            />
            <label htmlFor="diagnosticConsent" className="text-[11px] text-brandText-secondary">
              Include extension version (v1.0.0) and execution configuration in the report.
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl glass-btn-primary text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Format & Validate Diagnostic Ticket</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
