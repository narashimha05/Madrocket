"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AddStudent from "../../components/AddStudent";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../auth/auth";
import { FaPlus } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { SyncLoader } from "react-spinners";

export default function StudentsPage() {
  const user = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState(false);
  const [loading, setLoading] = useState(false);  

  const handleDelete = async (studentId) => {
    setLoadingId(studentId); 
    try {
      await deleteDoc(doc(db, "students", studentId)); 

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setLoadingId(null); 
    }
  };

  useEffect(() => {
    if (!user) router.push("/"); 
  }, [user, router]);

  if (!user) return null; 

  const fetchStudents = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLoading(false);
    setStudents(studentsList);
  };


  useEffect(() => {
    fetchStudents();
  }, []);


  return (
    <div className="flex h-screen">
      <div className="h-full">
      <Sidebar />

      </div>
      {loading ? <div className="flex w-full justify-center items-center"><SyncLoader/></div> : 
      <div className="flex-1 w-full overflow-auto">
        <div className="text-center text-lg sm:text-xl md:text-3xl font-semibold p-4 bg-[#f9f9f9]">
          STUDENT DASHBOARD
        </div>
        <button onClick={() => setModalOpen(true)} className="border-2 rounded-md px-4 py-2 my-4 ml-2 bg-black text-white flex items-center gap-2"><FaPlus />Add Student</button>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {/* <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Action</th>
            </tr> */}
            <tr>
                <th scope="col" className="px-6 py-3">
                    Roll Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Class
                </th>
                <th scope="col" className="px-6 py-3">
                    Gender
                </th>
                <th scope="col" className="px-6 py-3">
                    Contact
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-gray-700">
                <td className="px-6 py-4">{student.rollNumber}</td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.class}</td>
                <td className="px-6 py-4">{student.gender}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4 gap-2 flex">
                  <button><AiFillEye size={24}/></button>
                  <button><MdEdit size={24}/></button>
                  <button
            onClick={() => handleDelete(student.id)}
            disabled={loadingId === student.id} 
          >
            {loadingId === student.id ? (
              <SyncLoader size={8} color="#555" /> 
            ) : (
              <MdDelete size={24} />
            )}
          </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalOpen && (
          <AddStudent
            closeModal={() => setModalOpen(false)}
            refreshStudents={fetchStudents}
          />
        )}
      </div>
    </div>
}
  </div>
  );
}
