import { db } from "../database/database.connection.js";

async function verifyEmail(email){
    return db.query(`
        SELECT * 
            FROM users 
            WHERE email = $1 ;
    `,[email]);
}

function createUser(name, email, password){
    return db.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3) ;
    `,[name, email, password]);
}

function createSession(token, userId){
    return db.query(`
        INSERT INTO sessions (token, "userId") 
        VALUES ($1, $2) ;
    `,[token, userId]);
}

const authRepository = {
    verifyEmail,
    createUser,
    createSession,
}

export default authRepository;