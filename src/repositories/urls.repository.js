import { db } from "../database/database.connection.js";

function createShorten(url, shortUrl, id) {
    return db.query(`
        INSERT INTO urls(url, "shortUrl", "userId")
        VALUES ($1, $2, $3)
    `, [url, shortUrl, id])
}

function findUrlById(id) {
    return db.query(`
        SELECT id, "shortUrl", url 
            FROM urls 
            WHERE id = $1
    `, [id]);
}

const urlsRepository ={
    createShorten,
    findUrlById,
}

export default urlsRepository