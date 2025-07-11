import Loader from "./../../components/Loader/Loader";
import { useGetBorrowBooksQuery } from "./../../redux/api/baseApi";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowBooksQuery(undefined);

  interface IBorrowSummary {
    book: {
      title: string;
      isbn: string;
    };
    totalQuantity: number;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto my-10  lg:my-20 min-h-[500px]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-10">
        Borrow Summary
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-300 border border-gray-200">
            <thead>
              <tr>
                <th className="px-4  border-b  py-3 border-gray-200">S. No</th>
                <th className="px-4  border-b  py-3 border-gray-200">
                  Book Title
                </th>
                <th className="px-4  border-b  py-3 border-gray-200">ISB</th>
                <th className="px-4  border-b  py-3 border-gray-200">
                  Total Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.data?.map((borrow: IBorrowSummary, index: number) => (
                  <tr key={index} className="text-sm text-center">
                    <td className="px-4  border-b py-3 border-gray-200">
                      {(data?.data?.indexOf(borrow) ?? 0) + 1}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {borrow?.book?.title}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {borrow?.book?.isbn}
                    </td>
                    <td className="px-4  border-b py-3 border-gray-200">
                      {borrow.totalQuantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
