import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (featuredImage) {
            const img = service.getFilePreview(featuredImage)
            setImagePreview(img)
        } else {
            setImagePreview(null)
            
        }
    }, [])

    return (
        <Link to={`/post/${$id}`}>
          <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
              <img
                src={imagePreview}
                alt={title}
                className="object-cover w-full h-full rounded-t-xl"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            </div>
          </div>
        </Link>
      );
}

export default PostCard;






  
