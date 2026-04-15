'use client';

import { useGetUser } from '@/hooks/useUser';
import CallToAction from '@/sections/call-to-action';
import FaqSection from '@/sections/faq-section';
import Features from '@/sections/features';
import HeroSection from '@/sections/hero-section';
import PricingPlans from '@/sections/pricing-plans';
import Testimonials from '@/sections/testimonials';
import TrustedCompanies from '@/sections/trusted-companies';
import WorkflowSteps from '@/sections/workflow-steps';
import { useUserStore } from '@/stores/useUserStore';
import { useState } from 'react';

export default function Page() {
    const {isLoading} = useGetUser()
     
    if(isLoading){
        return <div className='flex items-center justify-center h-screen'>
            <p className='text-lg font-medium'>Loading...</p>
        </div>
    }
    return (
        <main className='px-4'>
            <HeroSection />
            <TrustedCompanies />
            <Features />
            <WorkflowSteps />
            <Testimonials />
            <FaqSection />
            <PricingPlans />
            <CallToAction />
        </main>
    );
}
