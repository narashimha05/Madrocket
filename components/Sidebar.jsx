import React from "react";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
export default function Sidebar() {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      await signOut(auth); 
      await router.push("/"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  });
  return (
    <div className="w-[200px] h-[100%]  border-r-[1px] border-[#ddd] bg-[#f9f9f9]">
      <div className="w-full flex justify-center items-center">
        <p className="text-lg sm:text-xl md:text-3xl mt-4">Dashboard</p>
      </div>
      <div onClick={() => (window.location.href = "/home")} className="flex items-center text-left text-md sm:text-lg hover:bg-[#ddd] w-full p-[10px] mt-6">
      <IoHomeSharp />
      <button className="pl-4">Home</button>
      </div>
      <div onClick={() => (window.location.href = "/students")} className=" flex items-center text-left text-md sm:text-lg hover:bg-[#ddd] w-full p-[10px]">
      <MdDashboard /> 
        <button className="pl-4">Students Page</button>
      </div>
      <div onClick={logout} className="flex items-center text-left text-md sm:text-lg hover:bg-[#ddd] w-full p-[10px]">
      <CiLogout />
      <button className="pl-4">Logout</button>
      </div>
    </div>
  );
}
