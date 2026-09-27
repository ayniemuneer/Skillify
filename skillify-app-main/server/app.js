import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./lib/dbConnect.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebHooks } from "./controllers/webHooks.js";
import courseRouter from "./routes/courseRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

// --- 1. CONNECT TO DATABASE ONCE ---
// We call this at the top level so it connects when the server starts
await dbConnection();

// --- 2. GLOBAL MIDDLEWARE ---
app.use(cors()); // Enable CORS for frontend access
app.use(clerkMiddleware()); // Initialize Clerk authentication

// --- 3. WEBHOOK ROUTE ---
// This must be placed BEFORE express.json() because Clerk needs the raw body
app.post('/Clerk', express.raw({ type: 'application/json' }), clerkWebHooks);

// --- 4. PARSE JSON ---
// Now we can parse JSON for all standard API routes
app.use(express.json());

// --- 5. API ROUTES ---
app.use('/course', courseRouter);
app.use('/user', userRouter);

// Health Check Route
app.get('/', (req, res) => res.send("API Working"));

// --- 6. START SERVER ---
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    });
}

export default app;