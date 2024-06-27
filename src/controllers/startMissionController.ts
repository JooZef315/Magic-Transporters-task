import { Request, Response } from "express";

// @desc    start Mission
// @route   PATCH /mission/end
export const startMissionController = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json("fg");
};
