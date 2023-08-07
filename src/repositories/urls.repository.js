import { db } from "../database/database.connection.js";

function createShorten(url, shortUrl, id) {
    return db.query(`
        INSERT INTO urls(url, "shortUrl", "userId")
        VALUES ($1, $2, $3)
    `, [url, shortUrl, id])
}

const urlsRepository ={
    createShorten,

}

export default urlsRepository