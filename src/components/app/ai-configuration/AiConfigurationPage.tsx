'use client'
import React, { useState } from 'react'
import { Sliders, Shield, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'


const AiConfigurationPage = () => {
  const [temperature, setTemperature] = useState(0.47)
  const [maxTokens, setMaxTokens] = useState(2560)
  const [selectedModel, setSelectedModel] = useState<'gpt-4o-mini' | 'gpt-4o'>('gpt-4o-mini')
  const [guardrailsEnabled, setGuardrailsEnabled] = useState(true)
  const [promptOverlay, setPromptOverlay] = useState(
    'Always behave as an empathetic expert pedagogue. Align your outputs to mapped K-12 standards. Inject Socratic questions to foster analytical thinking when students prompt answers.'
  )

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in duration-300">

      {/* Left Hyperparameters & Models Section */}
      <div className="flex-1 space-y-6">

        {/* AI Engine Hyperparameters Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-6 text-left">

          {/* Header */}
          <div className="flex items-start gap-3.5 border-b border-gray-50 pb-4">
            <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
              <Sliders className="h-4.5 w-4.5 text-main" />
            </div>
            <div>
              <h3 className="text-base font-bold text-title">AI Engine Hyperparameters</h3>
              <p className="text-xs font-semibold text-gray-400 mt-1">
                Adjust generative rules affecting response accuracy, creativity depth, and socratic mapping.
              </p>
            </div>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-title">
                Temperature (Entropy Control)
              </label>
              <span className="bg-orange-50 text-main text-xs font-extrabold px-2 py-0.5 rounded-md">
                {temperature.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-gray-400 leading-normal">
              Lower temperatures focus output on specific state curriculum standards, while higher levels provoke broad interdisciplinary insights.
            </p>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.01"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="accent-main w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
            />
          </div>

          {/* Max Tokens Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-title">
                Max Content Tokens (Output limit)
              </label>
              <span className="bg-orange-50 text-main text-xs font-extrabold px-2 py-0.5 rounded-md">
                {maxTokens} / hour limit
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="8000"
              step="10"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="accent-main w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
            />
          </div>

        </div>

        {/* Model Selection Row */}
        <div className="space-y-3 text-left">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block leading-none">
            MODEL SELECTION
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* GPT-4o mini */}
            <div
              onClick={() => setSelectedModel('gpt-4o-mini')}
              className={cn(
                "rounded-xl border p-4 bg-white shadow-xs cursor-pointer transition-all duration-200 select-none flex flex-col justify-between h-[120px]",
                selectedModel === 'gpt-4o-mini'
                  ? "border-main ring-2 ring-main/10"
                  : "border-gray-100 hover:border-gray-300"
              )}
            >
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-title">GPT-4o mini</h4>
                <p className="text-[10px] font-semibold text-gray-400 mt-1 leading-normal">
                  Best for immediate interactive queries & quiz tasks.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 leading-none">
                Latency: Rapid (&lt;1.0s)
              </span>
            </div>

            {/* GPT-4o */}
            <div
              onClick={() => setSelectedModel('gpt-4o')}
              className={cn(
                "rounded-xl border p-4 bg-white shadow-xs cursor-pointer transition-all duration-200 select-none flex flex-col justify-between h-[120px]",
                selectedModel === 'gpt-4o'
                  ? "border-main ring-2 ring-main/10"
                  : "border-gray-100 hover:border-gray-300"
              )}
            >
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-title">GPT-4o</h4>
                <p className="text-[10px] font-semibold text-gray-400 mt-1 leading-normal">
                  Deep multi-tier curriculum generation & mapping.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 leading-none">
                Latency: Standard (&lt;2.0s)
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Right Controls Panel */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-6">

        {/* Socratic Safeguards Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 text-left">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Shield className="h-4.5 w-4.5 text-main" />
            <span>Socratic Safeguards</span>
          </div>
          <p className="text-[11px] font-semibold text-gray-400 leading-relaxed">
            Forces the AI to outline answers through scaffolded steps rather than outright solving homework for students.
          </p>

          <div
            onClick={() => setGuardrailsEnabled(!guardrailsEnabled)}
            className="flex items-center justify-between pt-2 border-t border-gray-50 cursor-pointer select-none"
          >
            <span className="text-xs font-bold text-slate-700">Socratic Guard-rails</span>

            {/* Toggle Switch */}
            <div className={cn(
              "w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0",
              guardrailsEnabled ? "bg-emerald-500" : "bg-gray-200"
            )}>
              <div className={cn(
                "w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out",
                guardrailsEnabled ? "translate-x-4" : "translate-x-0"
              )} />
            </div>
          </div>
        </div>

        {/* Cognitive Prompt Overlay Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 text-left">
          <div className="flex items-center gap-2">
            <Brain className="h-4.5 w-4.5 text-main" />
            <span className="text-[10px] font-extrabold text-main uppercase tracking-wider">
              COGNITIVE PROMPT OVERLAY
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-title">Universal Appended Instructions</h4>
            <textarea
              value={promptOverlay}
              onChange={(e) => setPromptOverlay(e.target.value)}
              className="w-full border border-gray-100 bg-slate-50/40 p-3.5 rounded-xl text-[11px] font-semibold text-slate-600 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main h-40 resize-none transition-all duration-200"
              placeholder="Enter global prompt guidelines..."
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default AiConfigurationPage