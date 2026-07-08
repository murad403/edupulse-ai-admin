'use client'

import React, { useState, useRef } from 'react'
import { User, Camera, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const EditProfileTab = () => {
  const [fullName, setFullName] = useState('Alex Mercer')
  const [email] = useState('alex.mercer@edupulse.ai')
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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

      {/* Profile Photo Upload Section */}
      <div className="flex items-center gap-6 p-4 rounded-xl border border-gray-50 bg-slate-50/20">
        <div className="relative group">
          <img 
            src={avatarUrl} 
            alt="Profile Avatar"
            className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-gray-100"
          />
          <button 
            type="button"
            onClick={triggerFileInput}
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <Camera className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-title">Profile Picture</span>
          <p className="text-[10px] font-semibold text-gray-400">
            JPG, GIF or PNG. Max size of 800K
          </p>
          <div className="flex items-center gap-2">
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={triggerFileInput}
              className="h-8 px-3 text-[10px] font-bold border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="h-3 w-3" />
              Upload Image
            </Button>
          </div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold text-title">Name</Label>
          <Input 
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold text-title">Email Address</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            disabled
            className="text-xs text-gray-400 bg-gray-100 font-semibold cursor-not-allowed border-gray-200"
          />
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