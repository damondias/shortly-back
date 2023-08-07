import { db } from "../database/database.connection.js";

function createShorten(url, shortUrl, id) {
    return db.query(`
        INSERT INTO urls(url, "shortUrl", "userId")
        VALUES ($1, $2, $3) ;
    `, [url, shortUrl, id])
}

function findUrlById(id) {
    return db.query(`
        SELECT id, "shortUrl", url , "userId"
            FROM urls 
            WHERE id = $1 ;
    `, [id]);
}

function findUrlByShorten(shortUrl) {
    return db.query(`
        SELECT * 
            FROM urls 
            WHERE "shortUrl" = $1 ;
    `,[shortUrl]);
}

function incrementUrlVisitCount(id){
    return db.query(`
        UPDATE urls
            SET "visitCount" = "visitCount" + 1
            WHERE id = $1
    `,[id]);
}

function deleteUrl(id) {
    return db.query(`
        DELETE 
            FROM urls 
            WHERE id=$1
    `, [id])
}

const urlsRepository ={
    createShorten,
    findUrlById,
    findUrlByShorten,
    incrementUrlVisitCount,
    deleteUrl
}

export default urlsRepository