'use client'

import React, { useState } from 'react'
import { Lock, Key } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const PasswordChangeTab = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRotate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill out all password fields.')
      return
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.')
      return
    }
    alert('Security credentials rotated and saved successfully!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Info */}
      <div className="flex items-start gap-3.5 border-b border-gray-50 pb-4">
        <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
          <Lock className="h-4.5 w-4.5 text-main" />
        </div>
        <div>
          <h3 className="text-base font-bold text-title">Change Password</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">
            Revitalize system protection parameters. Security-compliant password lengths must be maintained.
          </p>
        </div>
      </div>

      {/* Form Fields Stack */}
      <div className="space-y-4">
        
        {/* Current Password */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-title">Current Password</Label>
          <div className="relative w-full">
            <Key className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input 
              type="password"
              placeholder="Enter current password token"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pl-9.5 text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
            />
          </div>
        </div>

        {/* New & Confirm Passwords Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-title">New Secret Password</Label>
            <div className="relative w-full">
              <Key className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <Input 
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-9.5 text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-title">Confirm New Password</Label>
            <div className="relative w-full">
              <Key className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <Input 
                type="password"
                placeholder="Repeat clean credentials"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9.5 text-xs text-slate-700 bg-gray-50/40 font-semibold focus:bg-white"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Action Button Row */}
      <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
        <Button 
          onClick={handleRotate}
          className="bg-main hover:bg-main-dark text-white text-xs font-bold shadow-md shadow-orange-500/10 rounded-xl px-5 h-10 cursor-pointer"
        >
          Rotate Current Password
        </Button>
      </div>

    </div>
  )
}

export default PasswordChangeTab