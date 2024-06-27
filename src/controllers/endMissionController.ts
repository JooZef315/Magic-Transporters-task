import { Request, Response } from "express";
import { CustomError } from "../config/customErrors";
import { prisma } from "../config/initPrisma";
import { QuestStateEnum } from "../enums";
import { logger } from "../config/logger";

// @desc    end Mission
// @route   PATCH /mission/end
export const endMissionController = async (req: Request, res: Response) => {
  const moverId: string = req.body.moverId;

  if (!moverId) {
    throw new CustomError("invalid input/inputs", 400);
  }

  const mover = await prisma.movers.findUnique({
    where: { id: moverId, questState: QuestStateEnum.OnAMission },
  });

  if (!mover) {
    throw new CustomError("invalid moverId or itemId", 400);
  }

  await prisma.items.updateMany({
    data: {
      isCompleted: true,
    },
    where: {
      moverId,
    },
  });

  //reset his weightLimit to its original value
  const doneMover = await prisma.movers.update({
    data: {
      questState: QuestStateEnum.Done,
      weightLimit: mover.energy,
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

  const items = doneMover.Items.map((item) => item.name);

  //add the logging
  logger.info(
    `magic mover ${
      mover.id
    } has completed his missions, and now items [${items.join(
      ", "
    )}] are Transported successfully`
  );

  res.status(200).json(doneMover);
};
