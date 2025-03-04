import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../modules/user.models.js"
import { ApiError } from "../utils/apiErrors.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const regesterUser = asyncHandler(async (req, res) => {

    // res.status(200).json({
    //     message: "ok"
    // })

    // get user details from frontend
    // validation - not empty
    // check user if already exist , user and email
    // check for images,avtar ,
    // upload on cloudinary ,avtart
    // create user object , user entry in db
    // refresh password and refresh token field from response
    // check for  user creation
    // return res



    /*
    const user = req.body;
    console.log("FullName :", user.fullName);
    console.log("Email :", user.email);
    console.log("UserName :", user.userName);
    console.log("Password:", user.password);
    res.send(user);
    */

    // console.log(req.body);
    const { fullName, email, userName, password } = req.body;

    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    // console.log(existedUser);

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    // console.log(req.files)
    const avatarLocalPath = req.files?.avtar[0].path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path;
    // }

    // console.log(avatarLocalPath);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required8542")
    }

    const avtar = await uploadOnCloudinary(avatarLocalPath);
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath);


    const user = await User.create({
        fullName,
        avtar: avtar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while regestring the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    // req -> data form body
    // username or email
    // find the user
    // check password
    // access or refresh token
    // send cookies

    const { userName, email, password } = req.body;

    if (!userName || !email) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({ $or: [{ userName }, { email }] });
    // console.log(user);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const loggenInUser = await User.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", accessToken, option).json(
        new ApiResponse(
            200, {
            user: loggenInUser, accessToken, refreshToken
        },
            "User logged In Successfully"
        )
    );
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findOneAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logout successfully"));
})

export {
    regesterUser,
    loginUser,
    logoutUser
}


