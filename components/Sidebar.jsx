import React from "react";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth); // Sign out first
      await router.push("/"); // Then navigate to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-[200px] h-[100%] border-r-[1px] border-[#ddd] bg-[#f9f9f9]">
      <div className="w-full flex justify-center items-center">
        <p className="text-lg sm:text-xl md:text-3xl mt-4">Dashboard</p>
      </div>
      <div
        onClick={() => router.push("/home")} // Use Next.js router for navigation
        className="flex items-center text-left text-md sm:text-lg hover:bg-[#ddd] w-full p-[10px] mt-6 cursor-pointer"
      >
        <IoHomeSharp />
        <span className="pl-4">Home</span>
      </div>
      <div
        onClick={() => router.push("/students")} // Use Next.js router for navigation
        className="flex items-center text-left text-md sm:text-lg hover:bg-[#ddd] w-full p-[10px] cursor-pointer"
      >
        <MdDashboard />
        <span className="pl-4">Students Page</span>
      </div>
      <div
        onClick={logout} // Call the logout function
        className="flex items-center text-left text-md sm:text-lg hover:bg-[#ddd] w-full p-[10px] cursor-pointer"
      >
        <CiLogout />
        <span className="pl-4">Logout</span>
      </div>
    </div>
  );
}
