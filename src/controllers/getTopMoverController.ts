import { Request, Response } from "express";

// @desc    get who completed the most missions.
// @route   GET /movers/top
export const getTopMoverController = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json("getTopMoverController");
};
