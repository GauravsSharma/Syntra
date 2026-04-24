"use client"
import React, { useState } from 'react'
import DangerZone from './Dangerzone'
import TeamMembers from './TeamMembers'
import WorkspaceSettings from './WorkspaceSettings'
import AddMemberDialog from './AddMemberDialog'

const MainSettings = ({workspaceData}) => {
    const [open,setOpen] = useState(false);
  return (
     <main className="w-full overflow-y-auto">
      {/* Page Header */}
      <div className="px-10 pt-5 pb-8 border-b border-white/[0.06]">
        <h1 className="text-white text-xl font-semibold">Settings</h1>
        <p className="text-white/40 text-sm mt-1">
          Manage workspace preferences, security, and billing.
        </p>
      </div>

      {/* Content */}
      <div className="px-10 py-8 flex flex-col gap-10 max-w-full">
        {/* Divider Card */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#111111] px-8 py-7 flex flex-col gap-10">
          <WorkspaceSettings workspace={workspaceData} />

          <hr className="border-white/[0.06]" />

          <TeamMembers setOpen={setOpen}/>

          <hr className="border-white/[0.06]" />

          <DangerZone />
        </div>
        <AddMemberDialog open={open} setOpen={setOpen}/>
      </div>
    </main>
  )
}

export default MainSettings
