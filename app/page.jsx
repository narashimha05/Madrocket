"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      alert("Login Failed: " + "Invalid username or password");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
          <img src="https://img.freepik.com/free-vector/dashboard-analytics-computer-performance-evaluation-chart-screen-statistics-analysis-infographic-assessment-business-report-display-isolated-concept-metaphor-illustration_335657-1149.jpg?ga=GA1.1.1210093342.1735416617&semt=ais_hybrid" className="h-full" />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 ">Login</h1>
        <form onSubmit={handleLogin} className="w-[300px] text-center">
          <input
            type="username"
            placeholder="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mr-[10px] mb-[10px] p-[8px] rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mr-[10px] mb-[10px] p-[8px] rounded-lg"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" onKeyDown={e => e.key === 'Enter' ? handleSend: 
''}>Login</button>
        </form>

      </div>
    </div>
  );
}
