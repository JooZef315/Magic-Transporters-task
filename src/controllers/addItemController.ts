import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../config/customErrors";
import { prisma } from "../config/initPrisma";

// @desc    add  a magic Item
// @route   POST /Items
export const addItemController = async (req: Request, res: Response) => {
  const name: string = req.body.name?.trim();
  const weight = req.body.weight;

  if (!weight || isNaN(weight) || weight <= 0 || !name) {
    throw new CustomError("invalid input", 400);
  }

  const newItem = await prisma.items.create({
    data: {
      name: name.toLocaleLowerCase(),
      weight: parseInt(weight),
    },
  });

  res.status(200).json(newItem);
};
