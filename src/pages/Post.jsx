import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";

// TODO:
export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const { slug } = useParams();
  const user_data = useSelector((state) => state.auth.userData);

  const isAuthor = post && user_data ? post.userId === user_data.$id : false;

  useEffect(() => {
    let isMounted = true; // Prevent state update if unmounted

    if (slug) {
      service.getPost(slug).then((post) => {
        if (isMounted) {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        }
      });
    } else {
      navigate("/");
    }

    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  useEffect(() => {
    if (post?.featuredImage) {
      const getImageUrl = async () => {
        try {
          const urlImage = await service.getFilePreview(post.featuredImage);
          setImageUrl(urlImage);
        } catch (error) {
          console.error("Error loading image:", error.message);
          setImageUrl(null);
        }
      };
      getImageUrl();
    }
  }, [post]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full justify-center mt-10 relative text-white bg-opacity-5 backdrop-blur-md rounded-xl p-2">
          {imageUrl && (
            <img src={imageUrl} alt={post.title} className="rounded-xl" />
          )}

          <div className="w-full mb-6 z-50">
            <h1 className="text-2xl text-center font-bold text-white">
              {post.title}
            </h1>
          </div>

          <div className="text-xl z-50">{parse(post.content)}</div>

          {isAuthor && (
            <div className="absolute right-6 top-6 text-white flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-500">Edit</Button>
              </Link>
              <Button className="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
