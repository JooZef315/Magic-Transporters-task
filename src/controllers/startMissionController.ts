import { Request, Response } from "express";
import { prisma } from "../config/initPrisma";
import { CustomError } from "../config/customErrors";
import { QuestStateEnum } from "../enums";
import { logger } from "../config/logger";

// @desc    start Mission
// @route   PATCH /mission/start
export const startMissionController = async (req: Request, res: Response) => {
  const moverId: string = req.body.moverId;

  if (!moverId) {
    throw new CustomError("invalid input", 400);
  }

  const mover = await prisma.movers.findUnique({
    where: { id: moverId, questState: QuestStateEnum.Loading },
  });

  if (!mover) {
    throw new CustomError("invalid moverId", 400);
  }

  const updatedMover = await prisma.movers.update({
    data: { questState: QuestStateEnum.OnAMission },
    where: { id: moverId },
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

  const items = updatedMover.Items.map((item) => item.name);

  //add the logging
  logger.info(
    `magic mover ${mover.id} has started his mission with items [${items.join(
      ", "
    )}]`
  );

  res.status(200).json(updatedMover);
};
