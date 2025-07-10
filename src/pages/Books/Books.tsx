import type { IBook } from "@/types";
import { useState } from "react";
import { useGetBooksQuery } from "./../../redux/api/baseApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router";

const Books = () => {
  const [page, setPage] = useState(0);
  const limit = 10;

  //Book Query
  const { data, isLoading } = useGetBooksQuery({ limit, page });

  const totalBooks = data?.totalBooks || 0;
  const totalPages = Math.ceil(totalBooks / limit);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10  lg:my-20">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-10">
        All books
      </h1>
      <div>
        <h4 className="text-lg font-medium mb-4">
          Total Books : <span className="text-red-500">{data?.totalBooks}</span>{" "}
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-300 border border-gray-200">
            <thead>
              <tr>
                <th className="px-4  border-b  py-3 border-gray-200">S. No</th>
                <th className="px-4  border-b  py-3 border-gray-200">
                  Book Title
                </th>
                <th className="px-4  border-b  py-3 border-gray-200">Author</th>
                <th className="px-4  border-b  py-3 border-gray-200">Genre</th>
                <th className="px-4  border-b py-3 border-gray-200">ISBN</th>
                <th className="px-4  border-b py-3 border-gray-200">
                  Available Copies
                </th>
                <th className="px-4  border-b  py-3 border-gray-200">
                  Description
                </th>
                <th className="px-4  border-b  py-3 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.data?.map((book: IBook) => (
                  <tr key={book._id} className="text-sm text-center">
                    <td className="px-4  border-b py-3 border-gray-200">
                      {page * limit + (data?.data?.indexOf(book) ?? 0) + 1}

                      {/* {(count += 1)} */}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {book.title}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {book.author}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {book.genre}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {book.isbn}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {book.copies}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {book.description}
                    </td>
                    <td className="px-4  border-b py-4 border-gray-200 flex gap-5 items-center justify-around">
                      <NavLink
                        to={`/books/${book?._id}`}
                        className="text-black btn btn-accent btn-sm "
                      >
                        View
                      </NavLink>
                      <NavLink to={`/edit-book/${book?._id}`}>
                        <FaEdit className="text-green-900 hover:text-green-800 cursor-pointer" />
                      </NavLink>
                      <span>
                        <FaTrash className="text-red-500 hover:text-red-400 cursor-pointer" />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Control */}
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;
