// Import necessary modules for the Express.js application
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// Create an instance of the Express.js application
const app = express();

// Configure middleware for Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Specify the allowed origin(s)
    credentials: true // Allow credentials to be sent along with the request
}));

// Configure middleware for parsing incoming JSON payloads with a limit of 16 KB
app.use(express.json({ limit: "16kb" }));

// Configure middleware for parsing incoming URL-encoded payloads with a limit of 16 KB
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Configure middleware for serving static files from the "public" directory
app.use(express.static("public"));

// Configure middleware for parsing incoming request cookies
app.use(cookieParser());

// Import and use the user routes defined in the "user.routs.js" file
import userRouter from "./routs/user.routes.js";
import modelRouter from "./routs/models.routes.js"
app.use("/api/v1/user", userRouter); // Mount the user routes at the "/api/v1/users" endpoint
app.use("/api/v1/models", modelRouter); // Mount the user routes at the "/api/v1/users" endpoint

// https://localhost:8000/api/v1/users/

// Export the Express.js application instance for use in other parts of the application
export { app };


// The selected code snippet is setting up an Express.js application with various middleware functions and importing a router for handling user-related routes. Here's a breakdown of the code:

// 1. Importing necessary modules:
//    - `cookie-parser`: Parses cookie headers and populates `req.cookies` with an object keyed by the cookie names.
//    - `express`: A fast, unopinionated, and minimalist web framework for Node.js.
//    - `cors`: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

// 2. Creating an Express application instance:
//    - `const app = express();`: Initializes a new Express application.

// 3. Configuring middleware:
//    - `app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));`: Enables Cross-Origin Resource Sharing (CORS) with the specified origin and allows credentials.
//    - `app.use(express.json({ limit: "16kb" }));`: Parses incoming requests with JSON payloads and limits the payload size to 16 KB.
//    - `app.use(express.urlencoded({ extended: true, limit: "16kb" }));`: Parses incoming requests with URL-encoded payloads and limits the payload size to 16 KB.
//    - `app.use(express.static("public"));`: Serves static files from the "public" directory.
//    - `app.use(cookieParser());`: Parses incoming request cookies and populates `req.cookies` with an object keyed by the cookie names.

// 4. Importing and using a router:
//    - `import router from "./routs/user.routs.js";`: Imports the user routes from the specified file.
//    - `app.use("/api/v1/users", router);`: Mounts the user routes at the "/api/v1/users" endpoint.

// 5. Exporting the Express application:
//    - `export { app };`: Exports the Express application instance for use in other parts of the application.

// This code sets up a basic Express.js application with middleware for handling JSON and URL-encoded payloads, serving static files, parsing cookies, and enabling CORS. It also imports and mounts a router for handling user-related routes.


// what is cookie in backend 
// A cookie in the backend refers to a small piece of data that is stored on the server-side and sent to the client-side in response to a request. The client-side browser then stores the cookie and sends it back with subsequent requests to the same server.

// Cookies are primarily used for maintaining session state, tracking user behavior, and personalizing content. They can be set by the backend server using various methods provided by the web framework or libraries you are using.

// In the context of Express.js, you can use the `cookie-parser` middleware to parse incoming request cookies and populate `req.cookies` with an object keyed by the cookie names. You can then use this object to access and manipulate cookies in your backend routes.

// Here's an example of how you might set a cookie in an Express.js route:

// ```javascript
// import express from "express";
// import cookieParser from "cookie-parser";

// const app = express();
// app.use(cookieParser());

// app.get("/set-cookie", (req, res) => {
//   // Set a cookie with a name, value, and optional options
//   res.cookie("myCookie", "myValue", { maxAge: 60000 }); // Expires in 1 minute
//   res.send("Cookie set successfully");
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
// ```

// In this example, when a GET request is made to the "/set-cookie" route, a cookie named "myCookie" with the value "myValue" is set. The cookie will expire after 1 minute.

// Keep in mind that cookies are stored on the client-side and can be accessed by JavaScript running in the browser. Therefore, it's important to ensure that sensitive data is not stored in cookies or that appropriate security measures are taken to protect the data.

// I hope this helps! Let me know if you have any further questions.
