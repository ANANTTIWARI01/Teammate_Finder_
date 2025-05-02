import React, { useEffect, useState } from "react";
import instance from "../../../axiosConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md"

function EditHackathon() {
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const { state } = useLocation()
  const hackathons = state?.hackathons

  const hackathonData = hackathons.find((obj) => (id === obj._id))

  useEffect(() => {
    if (hackathonData) {
      setFormData(hackathonData)
    }
  }, [])

  const [formData, setFormData] = useState(hackathonData || {
    name: "",
    mode: "",
    description: "",
    date: "",
    registrationLink: "",
    hackathonLink: "",
    image: null,
  });


  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("mode", formData.mode);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("registrationLink", formData.registrationLink);
      data.append("hackathonLink", formData.hackathonLink);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await instance.put(`/admin/${id}/updateHackathon`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/home")
    } catch (error) {
      console.log(error, error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-gray-100 shadow-lg rounded-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Update Hackathon Form</h2>
      <MdEdit onClick={() => { setIsEdit(true) }} className="text-3xl" />

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
         Hackathon Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter hackathon name"
        // required
        />
      </div>

      {/* Mode Field */}
      <div>
        <label htmlFor="mode" className="block mb-2 font-medium">
          Mode
        </label>
        <select
          id="mode"
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
        // required
        >
          <option value="" disabled>
            Select mode
          </option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter description"
        />
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block mb-2 font-medium">
        Organizing Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          disabled={!isEdit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        // required
        />
      </div>

      {/* Registration Link Field */}
      <div>
        <label htmlFor="registrationLink" className="block mb-2 font-medium">
          Registration Link
        </label>
        <input
          type="url"
          id="registrationLink"
          name="registrationLink"
          value={formData.registrationLink}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter registration link"
        // required
        />
      </div>

      {/* Hackathon Link Field */}
      <div>
        <label htmlFor="hackathonLink" className="block mb-2 font-medium">
          Hackathon Link
        </label>
        <input
          type="url"
          id="hackathonLink"
          name="hackathonLink"
          value={formData.hackathonLink}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter hackathon link (optional)"
        />
      </div>

      {/* Image Field */}
      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Image Upload
        </label>
        <input
          type="file"
          id="image"
          name="image"
          disabled={!isEdit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          accept="image/*"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isEdit}
        className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default EditHackathon;



// name, date, mode, description, registrationLink, hackathonLink 