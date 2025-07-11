import { FaCartPlus } from "react-icons/fa6";
import { useGetSingleBookQuery } from "./../../../redux/api/baseApi";
import { NavLink, useParams } from "react-router";
import Loader from "./../../../components/Loader/Loader";

const SingleBook = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSingleBookQuery(id ?? "");

  const book = data?.data || {};

  if (isError) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto my-10 lg:my-20 min-h-[500px] ">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6">
        Book Details
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-300 p-10 rounded-lg space-y-1">
        <h3 className="text-lg lg:text-2xl">
          <span className="font-medium">Book Title: </span>
          {book?.title}
        </h3>
        <p className=" lg:text-lg">
          <span className="font-medium">Author Name: </span>
          {book?.author}
        </p>
        <p className=" lg:text-lg">
          <span className="font-medium">Genre: </span>
          {book?.genre}
        </p>
        <p className=" lg:text-lg">
          <span className="font-medium">ISBN: </span>
          {book?.isbn}
        </p>
        <p className=" lg:text-lg">
          <span className="font-medium">Available Copies: </span>
          {book?.copies > 0 ? book?.copies : <span>Out Of Stock</span>}
        </p>
        <p className=" lg:text-lg text-gray-700 text-justify">
          <span className="font-medium text-black">Description: </span>
          {book?.description}
        </p>
        <div className="flex gap-5  lg:gap-12 flex-wrap justify-center items-center mt-10">
          <NavLink
            to={`/borrow/${book?._id}`}
            className="btn bg-[#347433] border-[#347433] "
          >
            Borrow Book
          </NavLink>
          <button className="btn bg-[#E59B25] border-[#E59B25]">
            <FaCartPlus className="text-lg mr-2" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
