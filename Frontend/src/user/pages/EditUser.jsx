import React, { useState, useEffect } from "react";
import instance from "../../../axiosConfig";
import axios from "axios";
import UserAvailable from "./UserAvailable";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md"
import { useUserData } from "../context/UserData";
// import ShowFormPercentage from "../component/ShowFormPercentage";
                                                          
function EditUser() {
    const { userData, showUserData } = useUserData()
    const [value, setValue] = useState(0)
    useEffect(() => {
        if (userData) {
            setFormData(userData);
            ShowFormPercentage()
        }
    }, [userData]);

    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        image: null,                                      
        mode: "",
        video: null,
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
            if (formData.address !== "") {
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
        fetchCoordinates()

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
            data.append("video", formData.video)
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
            await showUserData();
            //so why i call this function here because , when ever i update the userProfile , i directed to home page , 
            // then when i come again to this page the data do not get update , so for updating the data whenever i update the user Profile instantly 
            // i call this function here/\/\. 
            navigate("/")
        } catch (error) {
            console.log("Error updating profile:", error.message);
        }
    };
    
    function ShowFormPercentage() {
        if (userData && JSON.stringify(userData.email)) {
            setValue(prev => prev + 20)
        }
        if (userData && JSON.stringify(userData.address)) {
            setValue(prev => prev + 20)
        }
        if (userData && JSON.stringify(userData.skills)) {
            setValue(prev => prev + 20)
        }
        if (userData && JSON.stringify(userData.mode)) {
            setValue(prev => prev + 20)
        }
        
    }


    
    return (
        <>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 p-6 bg-gray-100 shadow-lg rounded-md"
                >
                    <div className="flex items-center justify-around">
                        <h2 className="text-2xl font-bold text-center mb-4">Edit User Profile</h2>
                        <MdEdit onClick={() => { setIsEdit(true); }} className="text-3xl" />
                    </div>
                    {/* <div>{<ShowFormPercentage userData={userData} />}</div> */}
                    <div className="font-bold text-2xl bg-orange-500 w-[5%] p-4 rounded-full">{value}%</div>
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
                            disabled={!isEdit}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter email "
                        />
                    </div>

                    {/* Location Field */}
                    <div>
                        <label htmlFor="address" className="block mb-2 font-medium">
                            City Name
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter City Name"
                            required
                        />
                    </div>

                    {/* {skills field} */}

                    <div>
                        <label htmlFor="skills" className="block mb-2 font-medium">
                            Skills
                        </label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={formData.skills}
                            disabled={!isEdit}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Skills (separate each by comma)"
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Projects link  (separate each by comma)"
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
                            disabled={!isEdit}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Past Attended Hackathons link  (separate each by comma)"
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
                            disabled={!isEdit}
                            className="w-full p-2 border border-gray-300 rounded"
                            accept="image/*"
                        />

                    </div>

                    <div>
                        <label htmlFor="video" className="block mb-2 font-medium">
                            Video Upload
                        </label>
                        <input
                            type="url"
                            id="video"
                            name="video"
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full p-2 border border-gray-300 rounded"
                            accept="video/*"
                        />

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                        disabled={!isEdit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditUser;