import connection from '../dbStrategy/postgres.js';


export async function ranking(req, res){
    console.log("o")
   try {
      await connection.query(' SELECT users.id, users.name AS name, count(urls.id) as linksCount, SUM(urls."visitCount") as "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId"  GROUP BY users.id LIMIT 10;')
      res.status(200);
   } catch (error) {
    res.status(500).send(error); 
   }
   
}