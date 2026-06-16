import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "movamo8239@preparmy.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {email} = jwt.verify(token, JWT_SECRET);
    console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdmFtbzgyMzlAcHJlcGFybXkuY29tIiwiaWF0IjoxNzgxNjMzNzM3LCJleHAiOjE3ODE3MjAxMzd9.JgvH46ABmxi8RSBeAutqoRad_sI-wQJGEJ8CjrWgM0i";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error);
}
