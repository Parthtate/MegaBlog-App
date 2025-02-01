import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="rounded-2xl relative overflow-hidden py-10 bg-gradient-to-r from-gray-900  to-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; {new Date().getFullYear()}. All Rights Reserved by Parth tate.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Developed by{' '}
                  <a href="https://github.com/Parthtate" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    Parth tate
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Company</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Support</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Legals</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Footer