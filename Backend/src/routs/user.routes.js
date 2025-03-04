// Import necessary modules from express and custom controllers and middlewares
import { Router } from "express"
import { loginUser, logoutUser, regesterUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/Auth.middleware.js"

// Initialize a new router instance
const router =  Router()

// Define a POST route for user registration
// The route uses multer middleware to handle file uploads for 'avtar' and 'coverImage' fields
router.route("/regester").post(
    upload.fields([
        {
            name:"avtar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    regesterUser
)

// Define a POST route for user login
router.route("/login").post(loginUser);

// Define a POST route for user logout
// The route is secured using the verifyJWT middleware to ensure only authenticated users can access it
router.route("/logout").post(verifyJWT ,logoutUser);

// Export the router instance to be used in the main application
export default router