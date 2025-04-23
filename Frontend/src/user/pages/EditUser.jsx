import React, { useState, useEffect } from "react";
import instance from "../../../axiosConfig";
// import { useParams } from "react-router-dom";
import axios from "axios";
import UserAvailable from "./UserAvailable";
import { useNavigate } from "react-router-dom";
// import AdminHome from "./AdminHome";
import { MdAdd } from "react-icons/md";

function EditUser() {
    const [formData, setFormData] = useState({
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        image: null,
        mode: "",
        projects: [],
        skills: [],
        pastAttendedHackathons: []

    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    useEffect(() => {
        async function fetchCoordinates() {
            if (formData.address.trim() !== "") {
                try {
                    const apiKey = "a3ff0ea5e54fa5a846957f72620b0699";
                    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${formData.address}&limit=1&appid=${apiKey}`;

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
    }, [formData.address]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);

        try {
            const data = new FormData();

            data.append("email", formData.email);
            data.append("mode", formData.mode)
            data.append("skills", formData.skills)
            data.append("address", formData.address);
            data.append("latitude", formData.latitude);
            data.append("longitude", formData.longitude);
            data.append("projects", formData.projects)
            data.append("pastAttendedHackathons", formData.pastAttendedHackathons)
            if (formData.image) {
                data.append("image", formData.image);
            }

            await instance.put(`/user/userPanelUpdate`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Profile updated successfully!");
            navigate("/")
        } catch (error) {
            console.log("Error updating profile:", error.message);
        }
    };




    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 bg-gray-100 shadow-lg rounded-md"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Edit User Profile</h2>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                </label>
                <input type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter email Name"
                />
            </div>

            {/* Location Field */}
            <div>
                <label htmlFor="address" className="block mb-2 font-medium">
                    Location Name
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter Location Name"
                    required
                />
            </div>

            {/* {skills field} */}

            <div>
                <label htmlFor="skills" className="block mb-2 font-medium">
                    skills Name
                </label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter Location Name"
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

            {/* Latitude and Longitude Display */}
            <div className="flex flex-col gap-2 p-4 bg-white rounded shadow-md border border-gray-300">
                <p className="text-lg font-medium text-gray-800">
                    Latitude: {formData.latitude || "Not fetched yet"}
                </p>
                <p className="text-lg font-medium text-gray-800">
                    Longitude: {formData.longitude || "Not fetched yet"}
                </p>
            </div>

            {/* Projects Link Field */}
            <div>
                <label htmlFor="projects" className="block mb-2 font-medium">
                    Projects Link
                </label>
                <input
                    type="url"
                    id="projects"
                    name="projects"
                    value={formData.projects}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter registration link"
                    required
                />
            </div>

            {/* PastAttended Hackathon Link Field */}
            <div>
                <label htmlFor="pastAttendedHackathons" className="block mb-2 font-medium">
                    Past Attended Hackathons Link
                </label>
                <input
                    type="url"
                    id="pastAttendedHackathons"
                    name="pastAttendedHackathons"
                    value={formData.pastAttendedHackathons}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter registration link"
                    required
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

export default EditUser;