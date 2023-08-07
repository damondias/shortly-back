import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"

function verifyEmail(email){
    return db.query(`
        SELECT * 
            FROM users 
            WHERE email = $1 ;
    `[email]);
}

function createUser(name, email, password){
    const passwordHash = bcrypt.hashSync(password,10);

    return db.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3) ;
    `[name, email, passwordHash]);
}

const authRepository = {
    verifyEmail,
    createUser,
}

export default authRepository;