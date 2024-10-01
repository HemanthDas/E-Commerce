import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useSearch } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import PopupModel from "./PopupModel";

const Navbar = () => {
  const location = useLocation();
  const popSearch: { pop?: string } = useSearch({ strict: false });
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const { userLocation } = useAuth();
  const toggleDropdownVisible = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const toggleMenuVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuVisible]);

  const { token, handleLogout, currentUser } = useAuth();

  return (
    <>
      <div className="flex justify-between items-center h-16 bg-white px-4 relative shadow">
        <Link to={"/"} className="h-full w-16">
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </Link>

        <form
          className="flex-1 flex justify-center items-center max-w-md max-sm:max-w-sm w-full"
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
        <button className="p-2 sm:hidden" onClick={toggleMenuVisible}>
          Menu
        </button>
        <div
          className={`${
            isMenuVisible ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
          } transition-transform duration-500 flex space-x-4 items-center max-sm:absolute max-sm:right-0 max-sm:top-16 max-sm:bg-white max-sm:w-full max-sm:shadow-lg sm:static sm:w-auto`}
        >
          <Link
            className="p-2 max-lg:max-w-48"
            to={location.pathname}
            search={(prev) => ({ ...prev, pop: "location" })}
            
          >
            {userLocation?.location || "Location"}
          </Link>
          {token ? (
            <>
              <span
                className="relative flex items-center cursor-pointer"
                onClick={toggleDropdownVisible}
              >
                <div className="p-2 hover:underline max-md:break-words max-w-64 flex flex-wrap">
                  <span>Welcome, </span>
                  {currentUser?.fullname || "User"}
                </div>
                {isDropdownVisible && (
                  <ul
                    className="absolute bg-white top-full mt-2 right-0 p-5 shadow-md rounded-md"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to="/user/profile"
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleMouseLeave}
                    >
                      profile
                    </Link>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleMouseLeave}
                    >
                      Your Orders
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={handleMouseLeave}
                    >
                      Your Favourites
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        handleMouseLeave();
                      }}
                    >
                      Sign Out
                    </li>
                  </ul>
                )}
              </span>

              <Link className="p-2" to="/user/cart">
                Cart
              </Link>
            </>
          ) : (
            <Link className="p-2" to="/authentication/login">
              Login
            </Link>
          )}
        </div>
      </div>
      {popSearch.pop && <PopupModel popType={popSearch.pop} />}
    </>
  );
};

export default Navbar;
