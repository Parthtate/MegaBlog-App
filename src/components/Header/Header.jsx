import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// TODO

export default function Header() {
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
    <header className="bg-gray-500 p-0.5 shadow-lg rounded-2xl">
      <Container>
        <nav className="flex items-center justify-center py-3">
          <div className="mr-4 hover:bg-black">
            <Link to="/">
              <Logo className="w-16 md:w-20" />
            </Link>
          </div>
          <ul className="ml-auto flex gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white px-6 py-2 rounded-lg font-semibold hover:bg-black   "
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="rounded-full px-4 py-2 hover:bg-red-500   " />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
