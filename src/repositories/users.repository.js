import { db } from "../database/database.connection.js";

function getUrlsByUser(id){
    return db.query(`
        SELECT
            users.id,
            users.name,
            SUM(urls."visitCount") AS "visitCount",
        ARRAY_AGG(json_build_object(
            'id', urls.id,
            'shortUrl', urls."shortUrl",
            'url', urls.url,
            'visitCount', urls."visitCount"
        )) AS "shortenedUrls"
        FROM users
        LEFT JOIN urls
            ON users.id = urls."userId"
        WHERE users.id = $1
        GROUP BY users.id
    `, [id])
}

function getUrlsRankingByUser() {
    return db.query(`
        SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitCount") as "visitCount"
            FROM urls
            JOIN users ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
    `);
}

const usersRepository = {
    getUrlsByUser,
    getUrlsRankingByUser,
}

export default usersRepository;