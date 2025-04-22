import jwt from "jsonwebtoken";
  export const checkUser = (req, res, next)=> {

    const token = req.cookies.userToken;

// console.log(req.cookies.userToken);

    if (!token) return res.status(401).send({ message: "No Token Found" });
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.id;

        next();
    }
    catch (error) {
        return res.status(402).json({ message: "Invalid or expired token" });
    }
}

export default checkUser