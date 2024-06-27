import { Request, Response } from "express";
import { prisma } from "../config/initPrisma";

// @desc    get who completed the most missions.
// @route   GET /movers/top
export const getTopMoverController = async (req: Request, res: Response) => {
  const topMovers = await prisma.items.groupBy({
    by: ["moverId"],
    where: {
      isCompleted: true,
    },
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        moverId: "desc",
      },
    },
  });

  const topMoversToReturn = topMovers.map((mover) => {
    return {
      moverId: mover.moverId,
      missionsCompleted: mover._count._all,
    };
  });

  res.status(200).json(topMoversToReturn);
};
