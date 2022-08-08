import connection from '../dbStrategy/postgres.js';
import jwt from 'jsonwebtoken';

export async function getUserUrls(req, res){
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const secretKey = process.env.JWT_SECRET;
    const {id} = jwt.verify(token,secretKey)
    try {
        const {rows:rental} = await connection.query(
            `
            SELECT  json_build_object(
                'id', users.id,
                'name', users.name
                ),
                'shortenedUrls',    jsonb_build_object(
                             'id', urls.id,
                             'short', urls."shortURL",
                             'url', urls.url,
                             'visitCount', urls."visitCount"
                             ) 
                  FROM users
                  join urls on urls."userId" = users."id"
                  WHERE users."id" = $1;`, [id]
           )
           const urlsArray = rental.map(e => e = e.json_build_object);
           const shortenedUrls = urlsArray.map(e => e.shortenedUrls);
           
           const result = {
               id: urlsArray[0].id,
               name: urlsArray[0].name,
               visitCount: urlsArray[0].visitCount,
               shortenedUrls: shortenedUrls
           }
           console.log(result);
   
           res.status(200).send(result);
     } catch (error) {
         res.status(500).send(error)
     }
}