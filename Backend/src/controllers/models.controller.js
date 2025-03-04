import { model } from "mongoose";
import { Ikarus } from "../modules/ikarus.models.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addModels = asyncHandler(async (req, res) => {

    const {title,description}= req.body;
    const image3d= req.file?.path;

    const uploadurl= await uploadOnCloudinary(image3d);
    if (!uploadurl){
        throw new ApiError(404,"Error in uploading file on cloudinary")
    }
    const newmodel = await Ikarus.create({
        image3d:uploadurl.secure_url,
        title,
        description
    });
    if (!newmodel) {
        throw new ApiError(404, "Model data not found");
    }
    return res.status(200).json(
        new ApiResponse(200, newmodel, "Model added successfully")
    )
})

export const getModels = asyncHandler(async (req, res) => {

    const modeldata = await Ikarus.find({});
    return res.status(200).json(
        new ApiResponse(200, modeldata, "Data of model fetched successfully")
    )
})