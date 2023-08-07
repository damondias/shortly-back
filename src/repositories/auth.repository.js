import { db } from "../database/database.connection.js";

function verifyEmail(email){
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

function verifyToken(token){
    return db.query(`
        SELECT * 
            FROM sessions 
            WHERE token=$1 ;
    `, [token]);
}

function verifySession(userId) {
    return db.query(`
        SELECT * 
            FROM users 
            WHERE id=$1 ;
    `, [userId]);
}
const authRepository = {
    verifyEmail,
    createUser,
    createSession,
    verifyToken,
    verifySession,
}

export default authRepository;