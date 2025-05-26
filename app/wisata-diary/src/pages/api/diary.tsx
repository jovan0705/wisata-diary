import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/pages/lib/data.json";
import { Diary } from "../lib/type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Diary[]>
) {
  res.status(200).json(data || []);
}
