import { NavLink } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h3 className="text-lg md:text-2xl lg:text-3xl font-medium py-6">
          Some think is Wrong!
        </h3>
        <NavLink to={"/"} className="btn btn-success">
          Back To Home
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
