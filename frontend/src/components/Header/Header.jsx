import React from "react";
import { LogoutBtn, Container, Logo } from "../index";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import "./Header.css";
import { useAuth } from "../ContextProvider/Contextprovider";

function Header() {
  const location = useLocation();
  const { status, userRole, cartQuantity, sellerOrderQuantity } = useAuth();
  console.log("Status", status);
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/SignIn", active: !status },
    { name: "Signup", slug: "/signup", active: !status },
    { name: "All Posts", slug: "/all-posts", active: true },
    {
      name: "Add Post",
      slug: "/add-product",
      active: status && userRole === "seller",
    },
    { name: "debug", slug: "/debug", active: status },
    {
      name: (
        <>
          Orders (
          <span style={{ color: "orange", fontWeight: "bold" }}>
            {sellerOrderQuantity || 0}
          </span>
          )
        </>
      ),
      slug: "/seller",
      active: status && userRole === "seller",
      style: { color: "red" }, // Add this to make the text red
    },
    { name: "Vendors", slug: "/all-users", active: status },
    { name: "Profile", slug: "/account-info", active: status },

    {
      name: `Cart (${cartQuantity || 0})`,
      // name: "Cart",
      slug: "/cart-details",
      active: status,
      icon: <FaShoppingCart className="inline mr-1" />,
    },
  ];
  console.log("Cart Quantity in Header", cartQuantity);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <Container>
        <nav className="flex flex-wrap items-center justify-between  py-3">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-2">
            <Logo width="50px" />
            <span className="text-xl font-bold text-gray-800">
              {/* Multivendor Store */}
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                      location.pathname === item.slug
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                    }`}
                  >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            <li className="mb-4">
              <LogoutBtn />
            </li>
          </ul>
        </nav>

        {/* Trending Bar */}
        <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-md mt-1 shadow-sm">
          <div className="overflow-hidden whitespace-nowrap">
            <span className="animate-marquee font-medium tracking-wide">
              🔥 Trending: AI-generated product titles | 🎉 70% off on first
              purchase | 📢 Join our vendor community today!
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
