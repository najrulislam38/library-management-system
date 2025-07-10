import { NavLink } from "react-router";
import logo from "./../../assets/images/logo1.png";

const navLinks = [
  {
    name: "Home",
    pathName: "/",
  },
  {
    name: "All Books",
    pathName: "books",
  },
  {
    name: "Add Book",
    pathName: "add-book",
  },
  {
    name: "Borrow Summary",
    pathName: "borrow-summary",
  },
];

const Navbar = () => {
  return (
    <div className="w-full border-b border-gray-300 sticky top-0 z-10 bg-white text-black">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className=" flex flex-col bg-white gap-1 dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navLinks?.map((navLink) => (
                  <NavLink to={navLink?.pathName}>{navLink?.name}</NavLink>
                ))}
              </ul>
            </div>
            <img className="max-w-[200px]" src={logo} alt="logo" />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-4 uppercase">
              {navLinks?.map((navLink) => (
                <NavLink to={navLink?.pathName}>{navLink?.name}</NavLink>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn bg-[#E59B25] border-[#E59B25] text-black">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
