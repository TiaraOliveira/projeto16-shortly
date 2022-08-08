import connection from '../dbStrategy/postgres.js';
import jwt from 'jsonwebtoken';

export async function getUserUrls(req, res){
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const secretKey = process.env.JWT_SECRET;
    const {id} = jwt.verify(token,secretKey)
    try {
        const {rows:urls} = await connection.query(
            `
            SELECT id, "shortURL", url, "visitCount" FROM "urls" WHERE "userId"=$1
            `, [id]
           )
        let sum = 0;
        urls.map(url => sum += url.visitCount)
        const{rows:users} = await connection.query(`SELECT * FROM users WHERE id = $1`, [id])


        const result = {
            "id": users[0].id,
            "name":users[0].name,
            "visitCount": sum,
            "shortenetCount": urls
        }
           res.status(200).send(result);
     } catch (error) {
         res.status(500).send(error)
     }
}