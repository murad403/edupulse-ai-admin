'use client'

import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import UserCard from './UserCard'
import UserDetailsModal from '@/components/modal/UserDetailsModal'
import UserEditModal from '@/components/modal/UserEditModal'
import UserDeleteModal from '@/components/modal/UserDeleteModal'
import UserApproveModal from '@/components/modal/UserApproveModal'
import { useGetUsersQuery } from '@/redux/features/dashboard/dashboard.api'
import { TeacherItem } from '@/redux/features/dashboard/dashboard.type'
import { Skeleton } from '@/components/ui/skeleton'

const UserManagementPage = () => {
  const { data, isLoading } = useGetUsersQuery()

  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const [deleteTeacherId, setDeleteTeacherId] = useState<number | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const [approveTeacherId, setApproveTeacherId] = useState<number | null>(null)
  const [isApproveOpen, setIsApproveOpen] = useState(false)

  const [editingUser, setEditingUser] = useState<TeacherItem | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  // Filter states
  const [statusFilter, setStatusFilter] = useState('ALL')

  const handleDeleteClick = (id: number) => {
    setDeleteTeacherId(id)
    setIsDeleteOpen(true)
  }

  const handleApproveClick = (id: number) => {
    setApproveTeacherId(id)
    setIsApproveOpen(true)
  }

  const handleSelectUser = (user: TeacherItem) => {
    setSelectedTeacherId(user.teacher_id)
    setIsDetailsOpen(true)
  }

  const handleEditClick = (user: TeacherItem) => {
    setEditingUser(user)
    setIsEditOpen(true)
  }

  const teachers = data?.data?.results || []

  // Apply filters
  const filteredUsers = teachers.filter(user => {
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'ACTIVE' && user.approval_status === 'approved') ||
      (statusFilter === 'INACTIVE' && user.approval_status === 'pending')

    return matchesStatus
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
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center] bg-size-[16px] bg-no-repeat cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Approved Only</option>
            <option value="INACTIVE">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col justify-between min-h-[230px] h-auto animate-pulse">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-12 rounded-md shrink-0" />
              </div>
              <div className="space-y-2 my-4">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
              <div className="border-t border-gray-50 pt-3 flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard 
              key={user.teacher_id}
              user={user}
              onSelect={handleSelectUser}
              onDelete={handleDeleteClick}
              onApprove={handleApproveClick}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 bg-white rounded-xl shadow-xs">
          <span className="text-sm font-semibold text-gray-400">No teachers found matching selected filters.</span>
        </div>
      )}

      {/* Details Modal */}
      <UserDetailsModal 
        teacherId={selectedTeacherId}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedTeacherId(null)
        }}
        onEditClick={handleEditClick}
      />

      {/* Edit Modal */}
      <UserEditModal 
        user={editingUser}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false)
          setEditingUser(null)
        }}
      />

      {/* Delete Confirmation Modal */}
      <UserDeleteModal 
        teacherId={deleteTeacherId}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setDeleteTeacherId(null)
        }}
      />

      {/* Approve Confirmation Modal */}
      <UserApproveModal 
        teacherId={approveTeacherId}
        isOpen={isApproveOpen}
        onClose={() => {
          setIsApproveOpen(false)
          setApproveTeacherId(null)
        }}
      />

    </div>
  )
}

export default UserManagementPage