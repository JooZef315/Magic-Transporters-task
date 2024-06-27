import { Request, Response } from "express";
import { prisma } from "../config/initPrisma";
import { CustomError } from "../config/customErrors";
import { QuestStateEnum } from "../enums";
import { logger } from "../config/logger";

// @desc    load a mover with an item
// @route   PATCH /mission/end
export const loadMissionController = async (req: Request, res: Response) => {
  const moverId: string = req.body.moverId;
  const itemId: string = req.body.itemId;

  if (!moverId || !itemId) {
    throw new CustomError("invalid input/inputs", 400);
  }

  const mover = await prisma.movers.findUnique({
    where: { id: moverId },
  });

  const item = await prisma.items.findUnique({
    where: { id: itemId },
  });

  if (!mover || !item) {
    throw new CustomError("invalid moverId or itemId", 400);
  }

  if (mover.questState == QuestStateEnum.OnAMission) {
    throw new CustomError("the mover is on a mission", 403);
  }

  if (item.moverId || item.weight >= mover.weightLimit) {
    throw new CustomError("item can't be assigned to this mover", 403);
  }

  await prisma.items.update({
    data: {
      moverId: mover.id,
    },
    where: { id: itemId },
  });

  const loadedMover = await prisma.movers.update({
    data: {
      questState: QuestStateEnum.Loading,
      weightLimit: {
        decrement: item.weight,
      },
    },
    where: {
      id: moverId,
    },
    select: {
      id: true,
      energy: true,
      weightLimit: true,
      questState: true,
      Items: {
        select: {
          name: true,
          isCompleted: true,
        },
      },
    },
  });

  //add the logging
  logger.info(
    `magic mover ${mover.id} is now loaded with items [${item.name}]`
  );

  res.status(200).json(loadedMover);
};
