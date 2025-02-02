import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status);
    
    useEffect(() => {
        if (authStatus) {
            service.getPosts().then((post) => {
                if (post) {
                    setPosts(post.documents)
                }
            })
        }
    }, [])

    if (!posts || posts.length === 0 || authStatus) {
        return (
            <div className='w-full py-12 mt-6 text-center  min-h-[50vh] flex items-center justify-center'>
                <Container>
                    <div className='flex flex-col items-center space-y-6'>
                        {authStatus ? (
                            <div className='p-16 w-full max-w-lg bg-gray-300  shadow-md rounded-lg'>
                                <h3 className='text-4xl font-semibold text-gray-900'>
                                    No posts yet!
                                </h3>
                                <p className='mt-4 text-lg text-gray-600'>
                                    Be the first to share your thoughts. Click below to add a post.
                                </p>
                                <button className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-600 transition-all'
                                onClick={() => navigate("/add-post")}    
                                >
                                    Add a Post
                                </button>
                            </div>
                        ) : (
                            <div className='p-16 w-full max-w-lg bg-white shadow-md rounded-lg'>
                                <h2 className='text-4xl font-semibold text-gray-900'>
                                    Welcome to Blog Post
                                </h2>
                                <p className='mt-4 text-lg text-gray-600'>
                                    Sign in to explore amazing posts and share your thoughts with the community.
                                </p>
                                <button 
                                    onClick={() => navigate("/signup")} 
                                    className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-600 transition-all'>
                                    Sign in
                                </button>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        );
    }
    // If user is logged in, show all posts
    return (
        <div className='w-full py-12 bg-gray-50'>
            <Container>
                <div className='flex flex-wrap justify-center gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );

}

export default Home
// posts