import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// TODO

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ];



  return (
    <header className='bg-gray-500 py-3 shadow-lg rounded-2xl'>
    <Container>
      <nav className='flex items-center'>
        <div className='mr-4'>
          <Link to='/' aria-label='Home'>
            <Logo className='w-16 md:w-20' /> {/* Using Tailwind width classes */}
          </Link>
        </div>
        <ul className='ml-auto flex gap-2'>
          {navItems.map((item) => 
            item.active && (
              <li key={item.name}>
                <Link
                  to={item.slug}
                  className='inline-block rounded-full px-4 py-2 text-gray-900 duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  aria-current={item.isCurrent ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
          {authStatus && (
            <li>
              <LogoutBtn className='rounded-full px-4 py-2 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2' />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
  )
}

export default Header