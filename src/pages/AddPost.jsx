import React from 'react'
import { PostForm  as PostFormComponent} from '../components/index'
import { Container } from '../components/index'

function AddPost() {
  return (
    <div className='w-full min-h-screen shadow-2xl bg-gray-500 to-black py-8'>
        <Container>
            <PostFormComponent />
        </Container>
    </div>
  )
}

export default AddPost;