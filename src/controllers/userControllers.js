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
                             'shortUrl', urls."shortUrl",
                             'url', urls.url,
                             'visitCount', urls."visitCount"
                             ) 
                  FROM users
                  join urls on urls."userId" = users."id"
                  WHERE users."id" = $1;`, [id]
           )
       res.send(rental);
       console.log(rental)


           console.log(result);
   
           res.status(200).send(result);
     } catch (error) {
         res.status(500).send(error)
     }
}