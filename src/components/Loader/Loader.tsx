import { DotLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="text-center">
        <DotLoader
          color="#028900" // Tailwind's blue-500
          loading={true}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="mt-4 text-[#347433]">Loading...</p>
      </div>
    </div>
  );
}
export default Loader;
