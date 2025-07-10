import type { IBook } from "@/types";
import { useState } from "react";
import { useGetBooksQuery } from "./../../redux/api/baseApi";

const Books = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetBooksQuery({ limit, page });

  const totalBooks = data?.data?.length || 0;
  const totalPages = Math.ceil(totalBooks / limit);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="container mx-auto my-20">
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
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((book: IBook) => (
                <tr key={book._id} className="text-sm text-center">
                  <td className="px-4  border-b py-3 border-gray-200">
                    {page * limit + (data?.data?.indexOf(book) ?? 0) + 1}
                    {console.log(data.data.indexOf(book))}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {totalPages + 1}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;
