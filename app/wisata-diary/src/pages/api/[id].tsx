import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/pages/lib/data.json";
import { Diary } from "../lib/type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Diary>
) {
    const { id } = req.query
  const detailData = data.find((diary) => diary.id === Number(id))
  if (detailData) {
      res.status(200).json(detailData);
  } else {
    res.status(400)
  }
}
