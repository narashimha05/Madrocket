"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function StudentDetailsPage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
    const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const docRef = doc(db, "students", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setStudent(docSnap.data());
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching student data: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><SyncLoader/></div>;
  }

  if (!student) {
    return <div className="flex justify-center items-center h-screen">Student not found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      <div className="border p-4 rounded-md shadow-md">
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Website:</strong> {student.website}</p>
        <p><strong>Subjects:</strong> {student.subjects?.join(", ")}</p>
      </div>
      <button className="px-4 py-2 rounded-lg bg-black text-white mt-4 float-right" onClick={()=>{router.push("/students")}}>Back</button>
    </div>
  );
}
