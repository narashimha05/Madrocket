"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { SyncLoader } from "react-spinners";

function EditStudentPage() {
  const [loading, setLoading] = useState(false); 
  const [initialLoading, setInitialLoading] = useState(true); 
  const [student, setStudent] = useState(null);
  const router = useRouter();
  const { id } = useParams();

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
          setInitialLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setStudent((prev) => ({
        ...prev,
        subjects: checked
          ? [...prev.subjects, value]
          : prev.subjects.filter((subject) => subject !== value),
      }));
    } else if (type === "radio") {
      setStudent((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, "students", id);
      await updateDoc(docRef, student); 
      router.push("/students"); 
    } catch (error) {
      console.error("Error updating student data: ", error);
      alert("Failed to update student.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        Student not found.
      </div>
    );
  }

  return (
    <div>
      <div
        className="fixed top-0 left-0 border border-red-700 w-full h-screen bg-black bg-opacity-50 flex"
      >
        <div className="w-[200px]"></div>
        <div
          style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
          className="max-h-screen bg-[#fff] flex-1 overflow-y-auto"
        >
          <h2 className="text-center font-bold text-xl">EDIT STUDENT</h2>
          {student && (
            <form onSubmit={handleSubmit}>
              <div className="flex w-full gap-4">
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Roll Number
                  </label>
                  <input
                    type="number"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={student.rollNumber}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={student.password || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 p-2 rounded-lg w-full"
                />
              </div>

              <select
                name="class"
                value={student.class}
                onChange={handleInputChange}
                required
                className="border border-gray-300 p-2 rounded-lg w-full"
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
              </select>
              <br />

              <div className="mt-4 font-medium text-sm mb-1">Select Gender</div>
              <div className="flex items-center mb-2">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={student.gender === "Male"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={student.gender === "Female"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  Female
                </label>
              </div>

              <div className="mt-2 font-medium text-sm mb-1">Select Subjects</div>
              <div className="flex items-center mb-4 gap-4">
                {["Math", "Science", "English"].map((subject) => (
                  <label key={subject}>
                    <input
                      type="checkbox"
                      name="subjects"
                      value={subject}
                      checked={student.subjects?.includes(subject)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                    />
                    {subject}
                  </label>
                ))}
              </div>

              <textarea
                name="address"
                placeholder="Address"
                value={student.address}
                onChange={handleInputChange}
                required
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
              <br />
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                value={student.phone}
                onChange={handleInputChange}
                required
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
              <br />
              <input
                type="url"
                name="website"
                placeholder="Social Links"
                value={student.website || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  {loading ? (
                    <SyncLoader size={5} color="#ffffff" />
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={() => router.push("/student")}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditStudentPage;
