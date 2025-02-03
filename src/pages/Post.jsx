import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
      if (slug) {
          service.getPost(slug).then((post) => {
              if (post) {
                setPost(post)
            }
              else {
                navigate("/");
              }
          });
      } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
      service.deletePost(post.$id).then((status) => {
          if (status) {
              if (post.featuredImage) {
                service.deleteFile(post.featuredImage);
              }
              navigate("/");
          } else {
            alert("Failed to delete post");
          }
      });
  };

  return post ? (
      <div className="py-12 min-h-screen">
          <Container>
              <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                  <img
                      src={service.getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="rounded-xl"
                  />

                  {isAuthor && (
                      <div className="absolute right-6 top-6">
                          <Link to={`/edit-post/${post.$id}`}>
                              <Button  className="mr-3 text-black bg-green-500">
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
              {post.content && typeof post.content === "string"
                ? parse(post.content)
                : <p>No content available</p>}
               </div>
          </Container>
      </div>
  ) : null;
}