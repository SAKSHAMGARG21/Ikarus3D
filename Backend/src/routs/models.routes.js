import { Router } from "express";
import { addModels, getModels } from "../controllers/models.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(upload.single("image3d"),addModels).get(getModels);

export default router;