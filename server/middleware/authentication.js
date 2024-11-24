import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            res.status(403).send({
                message: "Access denied. Admins only.",
                success: false,
            });
        }
    } catch (error) {
        next(error);
    }
};


export const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token
        if (!token) {
            return res.status(401).send({ message: "Access denied. No token provided.", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token.", success: false });
    }
};
