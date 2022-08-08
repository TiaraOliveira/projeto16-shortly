import connection from '../dbStrategy/postgres.js';


export async function ranking(req, res){
 
   try {
      const {rows: ranking} = await connection.query(` 
      SELECT users.id, users.name AS name,
      COUNT(urls.id) as linksCount, 
      SUM(urls."visitCount") as "visitCount" 
      FROM users LEFT JOIN urls ON users.id = urls."userId" 
      GROUP BY "visitCount" DESC
      LIMIT 10;`)
      res.status(200).send(ranking);
   } catch (error) {
    res.status(500).send(error); 
   }
   
}