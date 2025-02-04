import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';

function AllPosts() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPost(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-16">
            <Container>
                <div className="flex flex-wrap justify-center gap-6">
                    {post.length === 0 ? (
                        <div className="w-full text-center text-white">
                            No posts available
                        </div>
                    ) : (
                        post.map((postItem) => (
                            <div key={postItem.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <PostCard
                                    {...postItem}
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