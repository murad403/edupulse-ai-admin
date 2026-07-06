'use client'

import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import UserCard, { UserProfile } from './UserCard'
import UserDetailsModal from '@/components/modal/UserDetailsModal'

const initialUsers: UserProfile[] = [
  {
    id: 'TCH-2983',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Biology Teacher',
    school: 'Oakwood High School',
    email: 'sarah.j@oakwood.edu',
    lastActive: '2 mins ago',
    limit: '60 API requests/min',
    status: 'ACTIVE',
    classrooms: [
      { name: 'AP Science Advanced Study Group', pupils: 28, badge: 'High Prompt Rate' },
      { name: 'Curriculum Homeroom 10-A', pupils: 24, badge: 'Completed Standards Q2' },
      { name: 'Introductory Biology Practical Lab', pupils: 31, badge: 'Standard Setup' }
    ]
  },
  {
    id: 'TCH-4810',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Physics Chair',
    school: 'Lincoln Magnet Academy',
    email: 'm.chen@lincoln.edu',
    lastActive: '1 hour ago',
    limit: '80 API requests/min',
    status: 'ACTIVE',
    classrooms: [
      { name: 'AP Physics Mechanics C', pupils: 18, badge: 'High Prompt Rate' },
      { name: 'Lincoln Honors Physics Lab', pupils: 22, badge: 'Standard Setup' }
    ]
  },
  {
    id: 'TCH-9218',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Math Educator',
    school: 'Riverdale STEM Charter',
    email: 'e.rostova@riverdale.org',
    lastActive: '3 hours ago',
    limit: '40 API requests/min',
    status: 'INACTIVE',
    classrooms: [
      { name: 'Calculus BC Prep Group', pupils: 30, badge: 'Muted Usage' },
      { name: 'Trigonometry Homeroom', pupils: 25, badge: 'Standard Setup' }
    ]
  },
  {
    id: 'TCH-3371',
    name: 'David Kojo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Computer Science Lead',
    school: 'Metropolitan Tech High',
    email: 'd.kojo@metrotech.gov',
    lastActive: '1 day ago',
    limit: '100 API requests/min',
    status: 'ACTIVE',
    classrooms: [
      { name: 'Intro to Python Coding', pupils: 35, badge: 'High Prompt Rate' },
      { name: 'AP Computer Science Principles', pupils: 28, badge: 'Standard Setup' }
    ]
  },
  {
    id: 'TCH-1092',
    name: 'Amina Al-Jamil',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Instructional Coach',
    school: 'Heights Elementary',
    email: 'a.jamil@heights.edu',
    lastActive: '2 days ago',
    limit: '30 API requests/min',
    status: 'INACTIVE',
    classrooms: [
      { name: 'Primary Math Concepts', pupils: 20, badge: 'Standard Setup' }
    ]
  },
  {
    id: 'TCH-8524',
    name: 'Robert Ramirez',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'English Literature',
    school: 'Oakwood High School',
    email: 'robert.r@oakwood.edu',
    lastActive: '3 days ago',
    limit: '50 API requests/min',
    status: 'ACTIVE',
    classrooms: [
      { name: 'AP English Literature', pupils: 26, badge: 'Completed Standards Q2' },
      { name: 'Creative Writing Seminar', pupils: 15, badge: 'Standard Setup' }
    ]
  }
]

const UserManagementPage = () => {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  
  // Filter states
  const [trackFilter, setTrackFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this teacher account?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleChangeStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        }
      }
      return u
    }))
  }

  const handleSelectUser = (user: UserProfile) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  // Apply filters
  const filteredUsers = users.filter(user => {
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'ACTIVE' && user.status === 'ACTIVE') ||
      (statusFilter === 'INACTIVE' && user.status === 'INACTIVE')

    const matchesTrack = 
      trackFilter === 'ALL' ||
      (trackFilter === 'STANDARD' && user.school === 'Oakwood High School') // Mock standard filter: only shows Oakwood High

    return matchesStatus && matchesTrack
  })

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Filters Directory Bar */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm">
          <Filter className="h-4.5 w-4.5 text-main" />
          <span>Filter Directory</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Track Filter */}
          <select 
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center] bg-size-[16px] bg-no-repeat cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
          >
            <option value="ALL">On Track (Standard)</option>
            <option value="STANDARD">Oakwood High Only</option>
          </select>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center] bg-size-[16px] bg-no-repeat cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard 
              key={user.id}
              user={user}
              onSelect={handleSelectUser}
              onDelete={handleDelete}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 bg-white rounded-xl shadow-xs">
          <span className="text-sm font-semibold text-gray-400">No teachers found matching selected filters.</span>
        </div>
      )}

      {/* Details Modal overlay */}
      <UserDetailsModal 
        user={selectedUser}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedUser(null)
        }}
      />

    </div>
  )
}

export default UserManagementPage