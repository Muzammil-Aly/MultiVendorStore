import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo & About */}
        <div>
          <div className="mb-4">
            <Logo width="100px" />
          </div>
          <p className="text-gray-600">
            Your one-stop multivendor marketplace. Shop from thousands of
            sellers.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Press
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Order Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Cookies
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline text-gray-700">
                Licensing
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} Multivendor Store by Devstorms. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
