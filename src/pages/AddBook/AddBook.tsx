import { useCreateBookMutation } from "./../../redux/api/baseApi";
import type { IBook } from "@/types";
// import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddBook = () => {
  const navigate = useNavigate();

  const [createBook] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = { ...data, available: true };

    const res = await createBook(newData).unwrap();

    if (res?.success === true) {
      Swal.fire({
        title: "Book created successful",
        icon: "success",
        draggable: true,
      });
      navigate("/books", { replace: true });
    }
  };

  return (
    <div className="container mx-auto my-10 lg:my-20">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6">
        Add Book
      </h1>

      <div className="bg-gray-300 max-w-xl mx-auto p-4 md:p-8 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-medium ">
              Book Title <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Book title"
              id="title"
              {...register("title", { required: true })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                Title field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="author" className="font-medium ">
              Author <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Author"
              id="author"
              {...register("author", { required: true })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.author && (
              <span className="text-sm text-red-500">
                Author field is required
              </span>
            )}
          </div>
          {/* genre */}
          <div className="flex flex-col">
            <label htmlFor="author" className="font-medium ">
              Genre <span className="text-sm text-red-600">*</span>
            </label>

            <select
              {...register("genre", { required: true })}
              className="bg-white p-2 text-sm"
            >
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
              <option value="FANTASY">FANTASY</option>
            </select>
            {errors.genre && (
              <span className="text-sm text-red-500">
                Genre field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="isbn" className="font-medium ">
              ISBN <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="ISBN"
              id="isbn"
              {...register("isbn", { required: true })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.isbn && (
              <span className="text-sm text-red-500">
                ISBN field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="copies" className="font-medium ">
              Copies <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="Copies"
              id="copies"
              {...register("copies", { required: true, min: 1 })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.copies && (
              <span className="text-sm text-red-500">
                Books copy should be more than 0
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium ">
              Description <span className="text-sm text-red-600">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Write here..."
              id="description"
              {...register("description", { required: true })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                Description field is required
              </span>
            )}
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              value="Add Book"
              className=" w-full btn bg-[#E59B25] border-[#E59B25] text-black font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
