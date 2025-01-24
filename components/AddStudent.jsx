import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig"
import { SyncLoader } from "react-spinners";

export default function AddStudent({ closeModal, refreshStudents }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
    dateOfBirth: "",
    class: "",
    gender: "",
    subjects: [],
    address: "",
    website: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        subjects: checked
          ? [...prev.subjects, value]
          : prev.subjects.filter((subject) => subject !== value),
      }));
    }  else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await addDoc(collection(db, "students"), {
      ...formData,
      profilePicture: formData.profilePicture ? formData.profilePicture.name : null, 
    });

    refreshStudents(); 
    setLoading(false); 
    closeModal(); 
  };

  return (
    <div className="fixed top-0 left-0 border border-red-700 w-full h-screen bg-black bg-opacity-50 flex"
    >
      <div className="w-[200px]"></div>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }} className="max-h-screen bg-[#fff] flex-1 overflow-y-auto">
        <h2 className="text-center font-bold text-xl">ADD STUDENT</h2>
        <form onSubmit={handleSubmit}>
        <div className="flex w-full gap-4">
          <div class="mb-4 w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>

          <div class="mb-4 w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Roll Number</label>
          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
            required
          />
          </div>
          </div>

          <div className="flex w-full gap-4">
          <div class="mb-4 w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>
          <div class="mb-4 w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>
          </div>
          <div class="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
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
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              Female
            </label>
          </div>
          <div className="mt-2 font-medium text-sm mb-1">Select Subjects</div>
          <div className="flex items-center mb-4 gap-4">
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="Math"
                checked={formData.subjects.includes("Math")}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              Math
            </label>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="Science"
                checked={formData.subjects.includes("Science")}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              Science
            </label>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="English"
                checked={formData.subjects.includes("English")}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              English
            </label>
          </div>
        <div className="flex w-full gap-4">
          <div className="w-1/2">
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>
          <div className="w-1/2">
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          </div>
          </div>
          <input
            type="url"
            name="website"
            placeholder="Social Links"
            value={formData.website}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          <div className="flex justify-end gap-4">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2">{loading ? <SyncLoader size={5} color="#ffffff"/>: <div>Submit</div>}</button>
          <button type="button" onClick={closeModal} className="px-4 py-2 bg-red-600 text-white rounded-lg mt-2">
            Cancel
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
