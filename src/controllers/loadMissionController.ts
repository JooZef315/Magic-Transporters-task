import { Request, Response } from "express";

// @desc    load Mission
// @route   PATCH /mission/end
export const loadMissionController = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json("fg");
};
