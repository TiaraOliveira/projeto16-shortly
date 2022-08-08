import connection from '../dbStrategy/postgres.js';


export async function ranking(req, res){
 
   try {
      const {rows: ranking} = await connection.query(`
      SELECT users.id, users.name AS name, 
count(urls.id) as linksCount, SUM(urls."visitCount") as "visitCount", 
COALESCE (urls."visitCount", 0) FROM users LEFT JOIN urls ON users.id = urls."userId" 
GROUP BY users.id, urls."visitCount" ORDER BY urls."visitCount" LIMIT 10;`)
      res.status(200).send(ranking);
   } catch (error) {
    res.status(500).send(error); 
   }
   
}