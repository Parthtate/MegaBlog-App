import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container } from "../components/index.js";
import { PostCard as PostCardComponent } from "../components/index.js";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([])
            .then((posts) => {
                console.log("Fetched Posts:", posts); // Debugging
                if (posts && posts.documents) {
                    setPosts(posts.documents);
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-16">
            <Container>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.length === 0 ? (
                        <div className="w-full text-center text-white">
                            No posts yet!
                        </div>
                    ) : (
                        posts.map((postItem) => (
                            <div key={postItem.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <PostCardComponent
                                    title={postItem.title}
                                    featuredImage={postItem.featuredImage} // Should be a valid Appwrite File ID
                                    $id={postItem.$id}
                                />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
