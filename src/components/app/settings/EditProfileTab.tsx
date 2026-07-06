'use client'

import React, { useState } from 'react'
import { User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PresetProfile {
  id: string
  label: string
  name: string
  email: string
  role: string
  avatar: string
}

const presets: PresetProfile[] = [
  {
    id: 'mercer',
    label: 'Default Blue',
    name: 'Alex Mercer',
    email: 'alex.mercer@edupulse.ai',
    role: 'Super Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'amina',
    label: 'Amina - Educator',
    name: 'Amina Al-Jamil',
    email: 'a.jamil@heights.edu',
    role: 'Instructional Coach',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'elena',
    label: 'Elena - Tech Lead',
    name: 'Elena Rostova',
    email: 'e.rostova@riverdale.org',
    role: 'Math Educator',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'marcus',
    label: 'Marcus - Coordinator',
    name: 'Marcus Chen',
    email: 'm.chen@lincoln.edu',
    role: 'Physics Chair',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'robert',
    label: 'Robert - Director',
    name: 'Robert Ramirez',
    email: 'robert.r@oakwood.edu',
    role: 'English Literature',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

const EditProfileTab = () => {
  const [selectedPreset, setSelectedPreset] = useState('mercer')
  const [fullName, setFullName] = useState('Alex Mercer')
  const [email, setEmail] = useState('alex.mercer@edupulse.ai')
  const [role, setRole] = useState('Super Administrator')
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  )

  const handleSelectPreset = (preset: PresetProfile) => {
    setSelectedPreset(preset.id)
    setFullName(preset.name)
    setEmail(preset.email)
    setRole(preset.role)
    setAvatarUrl(preset.avatar)
  }

  const handleSave = () => {
    alert('Admin profile changes saved successfully!')
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Info */}
      <div className="flex items-start gap-3.5 border-b border-gray-50 pb-4">
        <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
          <User className="h-4.5 w-4.5 text-main" />
        </div>
        <div>
          <h3 className="text-base font-bold text-title">Edit Admin Profile</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">
            Modify your administrative visual representation and credential details across the system.
          </p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-title">Full Name</Label>
          <Input 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-title">Email Address</Label>
          <Input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
          />
        </div>

        {/* System Role */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-title">System Role / Title</Label>
          <Input 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
          />
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-title">Custom Avatar URL</Label>
          <Input 
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white truncate"
          />
        </div>

      </div>

      {/* Quick Presets */}
      <div className="space-y-3 pt-2">
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block leading-none">
          QUICK PRESETS
        </span>
        
        <div className="flex flex-wrap gap-3">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[11px] font-bold select-none cursor-pointer transition-all duration-200",
                selectedPreset === preset.id
                  ? "border-main bg-orange-50/10 text-main"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
            >
              <img 
                src={preset.avatar} 
                alt={preset.label}
                className="h-4.5 w-4.5 rounded-full object-cover border border-gray-100"
              />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button Row */}
      <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
        <Button 
          onClick={handleSave}
          className="bg-main hover:bg-main-dark text-white text-xs font-bold shadow-md shadow-orange-500/10 rounded-xl px-5 h-10 cursor-pointer"
        >
          Save Profile Changes
        </Button>
      </div>

    </div>
  )
}

export default EditProfileTab