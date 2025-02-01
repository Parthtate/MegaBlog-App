import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                console.log("Fetching image for ID:", featuredImage); // Debugging
                const img = await service.getFilePreview(featuredImage);
                console.log("Fetched Image URL:", img);
                setImgSrc(img);
            } catch (error) {
                console.error("Fetching Image Error:", error.message);
            }
        };
        if (featuredImage) fetchImageUrl();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full border-[1px] border-[#ccc] text-white bg-[#001219] bg-opacity-10 backdrop-blur-md rounded-xl p-4 mt-10 z-10">
                <div className="w-full justify-center mb-4">
                    <img
                        src={imgSrc || "/placeholder.png"} // Fallback placeholder
                        alt={title}
                        className="rounded-xl object-cover w-full"
                        onError={(e) => { e.target.src = "/placeholder.png"; }} // Handle broken images
                    />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
