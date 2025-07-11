import type { IBook } from "@/types";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "./../../../redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "./../../../components/Loader/Loader";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singleBookData, isLoading } = useGetSingleBookQuery(id ?? "");

  const book: IBook = singleBookData?.data || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isLoading && book) {
      reset(book);
    }
  }, [isLoading, book, reset]);

  const [updateBook] = useUpdateBookMutation();

  const onSubmitForUpdateBook: SubmitHandler<FieldValues> = async (
    formData
  ) => {
    if (parseInt(formData?.copies) === 0) {
      const updatedBook = {
        ...formData,
        available: false,
      };

      console.log(" Copies Zero hoyese");

      const res = await updateBook({
        id: formData?._id,
        ...updatedBook,
      }).unwrap();

      if (res.success === true) {
        Swal.fire({
          title: "Book Update Successful",
          icon: "success",
          draggable: true,
        });

        navigate("/books");
      }
    } else {
      const res = await updateBook({ id: formData?._id, formData });
      console.log(res);
      if (res?.data?.success === true) {
        Swal.fire({
          title: "Book Update Successful",
          icon: "success",
          draggable: true,
        });

        navigate("/books");
      }
    }
    // console.log(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto my-10 lg:my-20">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6">
        Edit Book
      </h1>

      <div className="bg-gray-300 max-w-xl mx-auto p-4 md:p-8 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmitForUpdateBook)}
          className="space-y-1.5"
        >
          <div className="flex flex-col">
            {/* title */}
            <label htmlFor="title" className="font-medium ">
              Book Title <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Book title"
              defaultValue={book?.title}
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
          {/* author */}
          <div className="flex flex-col">
            <label htmlFor="author" className="font-medium ">
              Author <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Author"
              id="author"
              defaultValue={book?.author}
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
              defaultValue={book?.genre}
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
          {/* isbn */}
          <div className="flex flex-col">
            <label htmlFor="isbn" className="font-medium ">
              ISBN <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="ISBN"
              id="isbn"
              defaultValue={book?.isbn}
              {...register("isbn", { required: true })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.isbn && (
              <span className="text-sm text-red-500">
                ISBN field is required
              </span>
            )}
          </div>
          {/* copies */}
          <div className="flex flex-col">
            <label htmlFor="copies" className="font-medium ">
              Copies <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="Copies"
              id="copies"
              defaultValue={book?.copies}
              {...register("copies", { required: true, min: 0 })}
              className="bg-white p-2 rounded-sm text-sm"
            />
            {errors.copies && (
              <span className="text-sm text-red-500">
                Books copy field is required and never have nagetive value
              </span>
            )}
          </div>

          {/* description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium ">
              Description <span className="text-sm text-red-600">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Write here..."
              id="description"
              defaultValue={book?.description}
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
              value="Update Book"
              className=" w-full btn bg-[#E59B25] border-[#E59B25] text-white font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
