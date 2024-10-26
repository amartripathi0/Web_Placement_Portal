import React from "react";
import { constants, navBarLink } from "../../constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../buttons/Button";
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <nav
        className="flex-btwn-center h-20 w-screen px-10 backdrop-blur-sm backdrop-filter
            max-sm:px-5 fixed top-0 left-0 max-sm:h-16   z-40   border-b-1 border-black bg-gray-900 
            "
      >
        <Link to="/" className="h-1/2 border-none">
          <img
            src={constants.logo}
            alt="logo"
            className="h-full rounded-md 
                hover:shadow-md hover:shadow-pink-500  cursor-pointer transition-all duration-400  hover:scale-105 
                "
          />
        </Link>

        <div className="flex gap-2 text-sm text-white font-medium max-sm:hidden">
          {navBarLink.map((navLink) => {
            return (
              <NavLink
                key={navLink.label}
                to={navLink.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-decoration-line: underline text-pink-500"
                    : ""
                }
              >
                <div className="px-3 hover:text-cyan-500 transition-color duration-300">
                  {navLink.label}
                </div>
              </NavLink>
            );
          })}
        </div>

        <div className="flex gap-3 font-semibold  relative ">
          {!mobileMenuOpen && (
            <div className="flex-center ">
                {/* if pathname is signin show signup button */}
              {pathname === "/signin"
               ? 
                <NavLink to="/signup">
                  <Button
                    label={"Signup"}
                    color={"pink"}
                    additionalStyles={"max-sm:text-sm max-sm:py-2"}
                  />
                </NavLink>
              : 
            
              (
              (pathname === "/signup") 
              ?
               ( <NavLink to="/signin">
                  <Button
                    label="Login"
                    color={"blue"}
                    additionalStyles={"px-4 max-sm:text-sm max-sm:px-2 "}
                  />
                </NavLink>)
              :
               
               ( pathname.startsWith('/signin') ||  pathname.startsWith('/signup') || pathname.startsWith('/')  ) && 
                <div className="flex-center gap-3">
                  <NavLink to="/signin">
                    <Button
                      label="Login"
                      color={"blue"}
                      additionalStyles={"px-4 max-sm:text-sm max-sm:px-2 "}
                    />
                  </NavLink>

                  <NavLink to="/signup">
                    <Button
                      label={"Signup"}
                      color={"pink"}
                      additionalStyles={"max-sm:text-sm max-sm:py-2"}
                    />
                  </NavLink>
                </div>
              )
              
              }
            </div>
          )}

          <div
            className="sm:hidden  "
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <LuMenu size={38} className=" text-white" />

            {mobileMenuOpen && (
              <div className="fixed h-screen  w-screen top-0 right-0 flex-center flex-col gap-10 pb-10  bg-black opacity-75 text-white">
                <IoMdClose size={30} className="text-white mb-10" />

                {navBarLink.map((navLink) => {
                  return (
                    <NavLink
                      key={navLink.label}
                      to={navLink.link}
                      className={({ isActive }) =>
                        isActive
                          ? " text-decoration-line: underline text-pink-500"
                          : ""
                      }
                    >
                      <div className=" px-3 text-xl hover:text-cyan-500 w-full ">
                        {navLink.label}
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
