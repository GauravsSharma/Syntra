"use client"
import React from 'react'
import InitialForm from '../../components/dashboard/InitialForm'
import { useGetMetaData, useGetUser } from '@/hooks/useUser'
const page = () => {
  const {data,isLoading} = useGetMetaData()
  useGetUser()
  if(isLoading){
    return <div className='flex items-center justify-center h-screen'>
        <p className='text-lg font-medium'>Loading...</p>
    </div>
  }
  return (
    <div className='flex flex-1 w-full'>
     {!data && <InitialForm/>}
    </div>
  )
}

export default page
