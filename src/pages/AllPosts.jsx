import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index.js";

 export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })   
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-16">
            <Container>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.length > 0 ? (
                        <div className="w-full text-center text-white">
                            No posts available
                        </div>
                    ) : 
                            <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-16">
                              <Container>
                                <div className="flex flex-wrap justify-center gap-6">
                                  {posts.map((post) => (
                                    <div key={post.$id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                      <PostCard {...post} />
                                    </div>
                                  ))}
                                </div>
                              </Container>
                            </div>
                          }
                </div>
            </Container>
        </div>
    );
}
