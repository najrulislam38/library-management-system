import { useState } from "react";
import {
  useCreateBorrowBookMutation,
  useGetSingleBookQuery,
} from "./../../redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loader from "./../../components/Loader/Loader";

const Borrow = () => {
  const { bookId } = useParams();
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useGetSingleBookQuery(bookId ?? "");

  const [createBorrowBook] = useCreateBorrowBookMutation();

  // increment/decrement
  const incrementQuantity = () => {
    const current = Number(getValues("quantity") || 0);
    setValue("quantity", current + 1);
  };

  const decrementQuantity = () => {
    const current = Number(getValues("quantity") || 0);
    if (current > 0) {
      setValue("quantity", current - 1);
    }
  };

  const handleSubmitBorrowBook: SubmitHandler<FieldValues> = async (
    field_data
  ) => {
    if ((bookData?.data.copies ?? 0) < field_data?.quantity) {
      setQuantityError(
        "Borrow Quantity cannot exceed available copies. Make sure available copies more than quantity."
      );
      return;
    } else {
      setQuantityError(null);
      const borrowBookData = { book: bookData?.data?._id, ...field_data };
      const res = await createBorrowBook(borrowBookData);
      console.log(res);

      if (res?.data?.success === true) {
        Swal.fire({
          title: "Book Borrowed successful.",
          icon: "success",
          draggable: true,
        });
        navigate("/borrow-summary");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto my-10 lg:my-20 min-h-[500px]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6">
        Borrow Book
      </h1>

      <div className="bg-gray-300 max-w-xl mx-auto p-4 md:p-8 rounded-md">
        <span className="text-red-600">{quantityError}</span>
        <form
          onSubmit={handleSubmit(handleSubmitBorrowBook)}
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
              defaultValue={bookData?.data?.title}
              id="title"
              readOnly
              className="bg-gray-200 p-2 rounded-sm text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-medium ">
              Quantity <span className="text-sm text-red-600">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="px-2 decrease py-1 rounded-xs text-white font-medium bg-gray-500 active:scale-95"
                onClick={decrementQuantity}
              >
                -
              </button>

              <input
                type="number"
                placeholder="Quantity"
                id="quantity"
                min={1}
                defaultValue={1}
                {...register("quantity", {
                  required: true,
                  min: 1,
                  valueAsNumber: true,
                })}
                className="bg-white p-2 rounded-sm text-sm w-20 text-center"
              />
              <button
                type="button"
                className="px-2 increase py-1 rounded-xs text-white font-medium bg-gray-500 active:scale-95"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            {errors.quantity && (
              <span className="text-sm text-red-500">
                Quantity field is required and must be 0 or more
              </span>
            )}
          </div>
          {/* due date */}
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="font-medium ">
              Due Date <span className="text-sm text-red-600">*</span>
            </label>
            <input
              type="date"
              placeholder="Select Due date"
              id="dueDate"
              {...register("dueDate", { required: true })}
              className="bg-gray-200 p-2 rounded-sm text-sm"
            />
            {errors.dueDate && (
              <span className="text-sm text-red-500">
                Due Date field is required
              </span>
            )}
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              value="Borrow Book"
              className=" w-full btn bg-[#E59B25] border-[#E59B25] text-white font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Borrow;
