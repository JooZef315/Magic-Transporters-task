import express from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { addMoverController } from "./controllers/addMoverController";
import { getTopMoverController } from "./controllers/getTopMoverController";
import { addItemController } from "./controllers/addItemController";
import { loadMissionController } from "./controllers/loadMissionController";
import { startMissionController } from "./controllers/startMissionController";
import { endMissionController } from "./controllers/endMissionController";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rootRouter = express.Router();

rootRouter.post("/movers", asyncHandler(addMoverController));
rootRouter.get("/movers/top", asyncHandler(getTopMoverController));

rootRouter.post("/items", asyncHandler(addItemController));

rootRouter.patch("/mission/load", asyncHandler(loadMissionController));
rootRouter.patch("/mission/start", asyncHandler(startMissionController));
rootRouter.patch("/mission/end", asyncHandler(endMissionController));

app.use("/", rootRouter);

app.all(
  "*",
  asyncHandler(async (_, res) => {
    res.status(404).json({ message: "404 not found" });
  })
);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
