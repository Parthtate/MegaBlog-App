import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { PostForm as PostFormComponent } from '../components/index'
import {Container} from '../components/index'

function EditPost() {
    // isPostEdited 
    // for getting slug from url 
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


  return post ? (
    <div className='py-4'>
        <Container>
            <PostFormComponent post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost

// TODO