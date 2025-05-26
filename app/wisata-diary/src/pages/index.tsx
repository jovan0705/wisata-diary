import { useRouter } from "next/router";
import dayjs from "dayjs";
import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Diary } from "../types/type";
import { PuffLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Diary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/diary")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  const formatter = (date: string) => {
    const formatDate = new Date(date);
    return dayjs(formatDate).format("MMM DD, YYYY");
  };

  return (
    <div className="mx-[30dvw] min-h-[100dvh]">
      {isLoading ? (
        <div className="w-full h-[100dvh] flex items-center justify-center">
          <PuffLoader />
        </div>
      ) : (
        data.length > 0 &&
        data.map((diary) => {
          return (
            <div
              key={diary.id}
              className="w-full overflow-hidden bg-[#fef9f1] border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 my-[10px]"
            >
              <div className="h-[200px] overflow-hidden relative">
                <img className="rounded-t-lg w-full" src={diary.image} alt="" />
                <p className="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded z-10">
                  {diary.tag}
                </p>
              </div>
              <div className="px-5 pt-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {diary.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                  {diary.description}
                </p>
              </div>
              <div className="pb-5 px-5 flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <h5 className="font-normal text-gray-600">Wisata Diary</h5>
                  <BsDot />
                  <p className="font-normal text-gray-600">
                    {formatter(diary.date)}
                  </p>
                </div>
                <p
                  className="font-normal text-gray-600 hover:cursor-pointer hover:text-gray-800"
                  onClick={() => router.push(`/${diary.id}`)}
                >
                  Read more
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
