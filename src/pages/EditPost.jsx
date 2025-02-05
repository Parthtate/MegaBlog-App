import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { PostForm, Container } from '../components/index'

export default function EditPost() {
    const [isPostEdited, setIsPostEdited] = useState(false)
    const {slug} = useParams();
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((retrievedPost) => {
                if (retrievedPost) {
                    setPost(retrievedPost)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    const handlePostUpdate = (updatedPostData) => {
        if (!updatedPostData.title || !updatedPostData.content) {
            alert("Please update both the title and content of the post.");
            return;
        }

        service.updatePost(updatedPostData).then((updatedPost) => {
                if (updatedPost) {
                    setIsPostEdited(true);
                    alert("Post updated successfully!");
                    navigate(`/post/${updatedPost.slug}`);
                } else {
                    alert("Error updating the post. Please try again.");
                }
            }).catch(() => {
                alert("Failed to update the post.");
            });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Edit Post</h2>
                    {!isPostEdited && (
                        <p className="text-red-600">
                            Please update both the title and content before saving.
                        </p>
                    )}
                </div>
                <PostForm post={post} onSubmit={handlePostUpdate} />
            </Container>
        </div>
    ) : null;
}

