import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../config/customErrors";
import { prisma } from "../config/initPrisma";

// @desc    add  a magic Mover
// @route   POST /movers
export const addMoverController = async (req: Request, res: Response) => {
  const energy: number = req.body.energy;
  if (!energy || isNaN(energy) || energy <= 0) {
    throw new CustomError("invalid input", 400);
  }

  //init the mover with weightLimit = energy
  const newMover = await prisma.movers.create({
    data: {
      energy,
      weightLimit: energy,
    },
  });

  res.status(200).json(newMover);
};
