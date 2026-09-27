import { getAuth } from '@clerk/express';
import User from '../models/User.js';

export const requireUser = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === "development") {
      const user = await User.findOne(); // first user in DB
      req.user = user;
      req.sessionId = "dev-session";
      return next();
    }

    const { userId, sessionId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    req.sessionId = sessionId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

