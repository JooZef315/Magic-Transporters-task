import { Request, Response } from "express";

// @desc    end Mission
// @route   PATCH /mission/end
export const endMissionController = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json("fg");
};
