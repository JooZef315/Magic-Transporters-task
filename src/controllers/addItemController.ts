import { Request, Response } from "express";

// @desc    add  a magic Item
// @route   POST /Items
export const addItemController = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json("fg");
};
