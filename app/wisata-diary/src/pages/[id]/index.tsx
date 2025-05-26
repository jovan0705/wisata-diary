import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Diary } from "../../types/type";
import dayjs from "dayjs";
import { BsDot } from "react-icons/bs";
import { MdChevronLeft } from "react-icons/md";
import { PuffLoader } from "react-spinners";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  const [data, setData] = useState<Diary>({
    id: 0,
    title: "",
    date: "",
    description: "",
    article: "",
    image: "",
    tag: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const formatter = (date: string) => {
    const formatDate = new Date(date);
    return dayjs(formatDate).format("MMM DD, YYYY");
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
         setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        });
    }
  }, [id]);
  return (
    <div className="mx-[30dvw] min-h-100dvh">
      {isLoading ? (
        <div className="w-full h-[100dvh] flex items-center justify-center">
          <PuffLoader />
        </div>
      ) : (
        <div className="w-full overflow-hidden bg-[#fef9f1] border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700  my-[24px] p-[24px]">
          <div
            className="hover:cursor-pointer flex flex-row gap-1 items-center mb-[24px]"
            onClick={() => router.push("/")}
          >
            <MdChevronLeft />
            <p>Back</p>
          </div>
          {data && data.id && (
            <div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.title}
              </h1>
              <div className="flex flex-row gap-3 items-center">
                <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
                  <img src='/images/logo.png' alt="logo"></img>
                </div>
                <div>
                  <h5 className="text-gray-900 font-semibold">Wisata Diary</h5>
                  <p className="font-normal text-gray-600">
                    {formatter(data.date)}
                  </p>
                </div>
              </div>
              <div className="h-[1px] w-full border-gray-200 border-b my-2" />
              <div dangerouslySetInnerHTML={{ __html: data.article }} />
              <div className="flex flex-row items-center mt-4">
                <p className="font-normal text-gray-600">
                  {dayjs(new Date(data.date)).format("HH:mm A")}
                </p>

                <BsDot />
                <p className="font-normal text-gray-600">
                  {formatter(data.date)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
