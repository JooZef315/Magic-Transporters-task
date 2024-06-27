import { Request, Response } from "express";

// @desc    add  a magic Mover
// @route   POST /movers
export const addMoverController = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json("fg");
};
