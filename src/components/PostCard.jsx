import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const img = service.getFilePreview(featuredImage);
                if (!img) throw new Error("Invalid image URL");
                console.log("Fetched Image URL:", img);
            } catch (error) {
                console.error("Fetching Image Error:", error);
            }
        };
        fetchImageUrl();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}` } >
            <div className="w-full border-[1px] border-[#ccc] text-white bg-[#001219] bg-opacity-10 backdrop-blur-md rounded-xl p-4 mt-10 z-10">
                <div className="w-full justify-center mb-4">
                    <img
                        src={service.getFilePreview(featuredImage)} 
                        alt={title}
                        className="rounded-xl object-cover w-full" 
                        
                    />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;






  
