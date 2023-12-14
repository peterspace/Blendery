import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";

const NoTransactionFound = () => {
  const navigate = useNavigate();
  const [isRenderDelayed, setIsRenderDelayed] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsRenderDelayed(false);
    }, 1500);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <>
      {!isRenderDelayed ? (
        <div className="w-full h-screen flex justify-start items-center py-40 ">
          <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="text-[#111] font-semibold text-11xl">
              There is no info
            </div>
            <div className="text-5xl font-normal text-[#636363] text-center mt-1">
              {"There aren't any transactions right now"}
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 w-[280px] text-base bg-[#5046E5] text-white shadow-md active:bg-[#5046E5] active:shadow-none"
            >
              Go to main page
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center transform translate-y-[-16px]">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default NoTransactionFound;
