'use client';
import React from 'react'
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import Sidebar from '@/components/Sidebar'
import { useRouter } from "next/navigation";
import { useAuth } from "../../auth/auth";
import { useEffect } from 'react';
function page() {
    const router = useRouter();
    const user = useAuth();
    useEffect(() => {
      if (!user) router.push("/"); 
    }, [user, router]);
    
    
      if (!user) return null; 
  return (
    <div className="flex h-screen">
          <div className="h-full">
          <Sidebar />
          </div>
          <div className='flex justify-center items-center w-full'>
            <div>
              Welcome To Student Dashboard
            </div>
          </div>
    </div>
  )
}

export default page