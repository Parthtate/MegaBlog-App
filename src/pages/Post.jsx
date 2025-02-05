import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    console.log("Slug:", slug); // Debugging

    service
      .getPost(slug)
      .then((retrievedPost) => {
        console.log("Retrieved Post:", retrievedPost); // Debugging
        if (retrievedPost) {
          setPost(retrievedPost);
          const featuredImg = retrievedPost.featuredImage; // Fixed typo
          const previewUrl = featuredImg
            ? service.getFilePreview(featuredImg) // Ensure this function exists
            : null;
          console.log("Image URL:", previewUrl); // Debugging
          setImageUrl(previewUrl);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error); // Debugging
        navigate("/");
      });
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      service
        .deletePost(post.$id)
        .then((status) => {
          if (status) {
            if (post.featuredImage) {
              service.deleteFile(post.featuredImage);
            }
            navigate("/");
          }
        })
        .catch(() => {
          console.log("Error deleting post");
          alert("Failed to delete the post. Please try again.");
        });
    }
  };

  return post ? (
    <div className="py-12 min-h-screen">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
              <p>Loading image...</p>
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3 text-black bg-green-500">
                  Edit Post
                </Button>
              </Link>
              <Button className="bg-red-500" onClick={deletePost}>
                Delete Post
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {post.content && typeof post.content === "string" ? (
            parse(post.content)
          ) : (
            <p>No content available</p>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}