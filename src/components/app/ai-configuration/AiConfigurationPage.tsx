'use client'

import React, { useState } from 'react'
import { Sliders } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useUpdateAiConfigMutation } from '@/redux/features/dashboard/dashboard.api'
import { toast } from 'sonner'

const AiConfigurationPage = () => {
  const [updateAiConfig, { isLoading: isUpdating }] = useUpdateAiConfigMutation()

  const [temperature, setTemperature] = useState(0.8)
  const [maxTokens, setMaxTokens] = useState(1500)
  const selectedModel = 'gpt-4o-mini'

  const handleUpdate = async () => {
    const toastId = toast.loading('Updating AI Configuration...')
    try {
      const response = await updateAiConfig({
        ai_model: selectedModel,
        temperature: temperature,
        max_tokens: maxTokens
      }).unwrap()
      toast.success(response.message || 'AI Configuration updated.', { id: toastId })
    } catch (err: any) {
      // console.error(err)
      const errMsg = err?.data?.message || 'Failed to update AI Configuration.'
      toast.error(errMsg, { id: toastId })
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      
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

        {/* Update Button Row */}
        <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
          <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-main hover:bg-main-dark text-white text-xs font-bold shadow-md shadow-orange-500/10 rounded-xl px-6 h-10 cursor-pointer"
          >
            {isUpdating ? 'Updating...' : 'Update Configuration'}
          </Button>
        </div>

      </div>

      {/* Model Selection Row */}
      <div className="space-y-3 text-left">
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block leading-none">
          MODEL SELECTION
        </span>

        <div className="grid grid-cols-1 gap-4">
          
          {/* GPT-4o mini */}
          <div
            className="rounded-xl border p-4 bg-white shadow-xs select-none flex flex-col justify-between h-[120px] border-main ring-2 ring-main/10"
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

        </div>
      </div>

    </div>
  )
}

export default AiConfigurationPage