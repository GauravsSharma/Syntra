'use client';

import { useState } from 'react';
import { Building2, Check, ChevronsUpDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useGetMyOrganizations, useSwitchOrganization, useSwitchOrganizations } from '@/hooks/useOrganization';
import { toast } from 'sonner';


export default function OrgSwitcher({ activeOrg, setActiveOrg ,open, setOpen,getInitials}) {
const {data} = useGetMyOrganizations()
const [pendingOrgId, setPendingOrgId] = useState(null);
const {mutate,isPending} = useSwitchOrganization()
  const handleSwitchOrg = (org) => {
    setPendingOrgId(org.id);
    mutate(org.id,{
      onSuccess:(data)=>{
        setActiveOrg(data)
         setOpen(false);
        toast.success(`Switched to ${data.business_name}`)
      },
      onError:()=>{
        toast.error("Failed to switch organization. Please try again.")
      }
    })
   
  };

  return (
    <>
      {/* Dialog */}
     <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-sm bg-[#111] border border-white/10 text-white p-0 overflow-hidden">
    <DialogHeader className="px-5 pt-5 pb-3 border-b border-white/10">
      <DialogTitle className="flex items-center gap-2 text-base font-semibold">
        <Building2 className="size-4 text-white/60" />
        Switch Organization
      </DialogTitle>
    </DialogHeader>

    <ul className="flex flex-col gap-1 p-3">
      {data?.map((org) => {
        const isActive = org.id === activeOrg.id;
        const isSwitching = isPending && pendingOrgId === org.id;

        return (
          <li key={org.id}>
            <button
              onClick={() => handleSwitchOrg(org)}
              disabled={isPending || isActive}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-200',
                isActive ? 'bg-white/10' : 'hover:bg-white/5',
                isPending && !isSwitching && 'opacity-40',
                isPending && 'cursor-not-allowed'
              )}
            >
              <div className="relative shrink-0">
                <Avatar className={cn('size-9', isSwitching && 'opacity-0')}>
                  <AvatarImage src={org.logo} />
                  <AvatarFallback className="bg-emerald-600 text-sm font-semibold text-white">
                    {getInitials(org.business_name)}
                  </AvatarFallback>
                </Avatar>

                {isSwitching && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="size-5 animate-spin text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className={cn(
                  'truncate text-sm font-medium transition-colors',
                  isSwitching && 'text-emerald-400'
                )}>
                  {org.business_name}
                </p>
                <p className={cn(
                  'truncate text-xs transition-colors',
                  isSwitching ? 'text-emerald-400/60' : 'text-white/50'
                )}>
                  {isSwitching ? 'Switching...' : org.owner_email}
                </p>
              </div>

              {isActive && !isSwitching && (
                <Check className="size-4 shrink-0 text-emerald-400" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  </DialogContent>
</Dialog>
    </>
  );
}