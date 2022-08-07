import jwt from 'jsonwebtoken';

export default async function validateUser(req, res, next) {
    
    const token = req.headers.authorization.split(' ')[1]
    const secretKey = process.env.JWT_SECRET;
    if (token) {
        return jwt.verify(token, secretKey, function(err) {
            if (err) {
                return res.status(401).send("invalid or non existing token, unauthorized");
            }
             return next();
        });
    }
    return res.status(400).send("invalid or non existing token, unauthorized")
}

