import React, { useState } from "react";
import instance from "../../../axiosConfig";
import { useParams } from "react-router-dom";

function HackathonForm() {
  const [formData, setFormData] = useState({
    name: "",
    mode: "",
    description: "",
    date: "",
    registrationLink: "",
    hackathonLink: "",
    image: null, // Store the file object here
  });

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value, // Store the file if it's an upload
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    try {
      // Create FormData object
      const data = new FormData();
      data.append("name", formData.name);
      data.append("mode", formData.mode);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("registrationLink", formData.registrationLink);
      data.append("hackathonLink", formData.hackathonLink);
      if (formData.image) {
        data.append("image", formData.image); // Append the image file
      }

      // Send the form data to the server
      await instance.post(`/admin/addHackathon/${id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
    } catch (error) {
      console.log(error, error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-gray-100 shadow-lg rounded-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Hackathon Form</h2>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter hackathon name"
          required
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
          className="w-full p-2 border border-gray-300 rounded"
          required
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
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter description"
        />
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block mb-2 font-medium">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
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
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter registration link"
          required
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
          onChange={handleChange} // No value for file inputs
          className="w-full p-2 border border-gray-300 rounded"
          accept="image/*"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default HackathonForm;