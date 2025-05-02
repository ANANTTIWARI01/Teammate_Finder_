import React, { useState, useEffect } from "react";
import instance from "../../../axiosConfig";
import axios from "axios";
import { MdEdit } from "react-icons/md"
import AdminHome from "./AdminHome";
import { useLocation, useNavigate } from "react-router-dom";


function EditAdminProfile() {
  const { state } = useLocation()
  const adminData = state?.adminData
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (adminData) {
      setFormData(adminData)
    }
  }, [])


  const [formData, setFormData] = useState(adminData || {
    organizationName: "",
    locationName: "",
    latitude: "",
    longitude: "",
    image: null,
  });



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    async function fetchCoordinates() {
      if (formData.locationName.trim() !== "") {
        try {
          const apiKey = "a3ff0ea5e54fa5a846957f72620b0699";
          const url = `https://api.openweathermap.org/geo/1.0/direct?q=${formData.locationName}&limit=1&appid=${apiKey}`;

          const response = await axios.get(url);
          if (response.data.length > 0) {
            const latitude = response.data[0].lat;
            const longitude = response.data[0].lon;

            setFormData((prevState) => ({
              ...prevState,
              latitude: latitude,
              longitude: longitude,
            }));
          } else {
            console.log("Location not found.");
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      }
    }

    fetchCoordinates();
  }, [formData.locationName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    try {
      const data = new FormData();

      data.append("organizationName", formData.organizationName);
      data.append("locationName", formData.locationName);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await instance.put(`/admin/updateAdminPanel`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

navigate("/admin/home")
      console.log("Profile updated successfully!");
    } catch (error) {
      console.log("Error updating profile:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-gray-100 shadow-lg rounded-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Edit Admin Profile</h2>
      <MdEdit onClick={() => { setIsEdit(true)}} className="text-3xl" />

      {/* Location Field */}
      <div>
        <label htmlFor="locationName" className="block mb-2 font-medium">
          City Name
        </label>
        <input
          type="text"
          id="locationName"
          name="locationName"
          value={formData.locationName}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Location Name"
          required
        />
      </div>

      {/* Organization Field */}
      <div>
        <label htmlFor="organizationName" className="block mb-2 font-medium">
          Organization Name
        </label>
        <textarea
          id="organizationName"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          disabled={!isEdit}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Organization Name"
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
          onChange={handleChange}
          disabled={!isEdit}
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

export default EditAdminProfile;

/*line -105
 * Mistake: I was using local state to pass admin data between pages, which fails
 * because state is lost when the component unmounts during navigation.
 *
 * Correct: Data should be passed via React Router's Link "state" prop and then
 * accessed in the target component using useLocation. This ensures the data persists
 * across page transitions.
 */