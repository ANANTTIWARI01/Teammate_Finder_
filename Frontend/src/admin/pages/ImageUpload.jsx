import React, { useState } from 'react';
import instance from '../../../axiosConfig'; // Ensure this is configured correctly

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image to upload!");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await instance.post(
                `/admin/addHackathon/680221067eca4a04d5749b35`, // Fixed admin ID
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert("Image uploaded successfully!");
            console.log('Upload successful:', response.data);
        } catch (error) {
            alert("Error uploading image. Please try again.");
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h1>Upload an Image</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image">Choose an image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ImageUpload;