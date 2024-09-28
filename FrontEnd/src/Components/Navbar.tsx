import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  const router = useRouter();
  const { token, handleLogout, currentUser } = useAuth();

  return (
    <div className="flex flex-wrap justify-between items-center h-16 bg-white px-4">
      <Link to={"/"} className="h-full w-16">
        <img
          src="/Logo.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </Link>
      <form
        className="flex-1 flex justify-center items-center max-w-md w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full bg-gray-100 p-2 rounded-md md:rounded-l-md"
          onChange={(e) => console.log(e.target.value)}
        />
      </form>
      <div className="flex space-x-4 h-full items-center">
        <Link
          className="hidden md:block p-2"
          to={router.state.location.pathname}
          search={(prev) => ({ ...prev, pop: "location" })}
        >
          Location
        </Link>
        {token ? (
          <>
            <span
              className="relative h-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link className="p-2 hover:underline" to="/user/profile">
                Welcome, {currentUser?.fullname || "User"}
              </Link>
              {isDropdownVisible && (
                <ul
                  className="absolute bg-white top-16 right-4 p-5 shadow-md rounded-md"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    Your orders
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    Your Favourates
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </li>
                </ul>
              )}
            </span>
            <Link className="p-2" to="/user/cart">
              cart
            </Link>
          </>
        ) : (
          <Link className="p-2" to="/authentication/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
