import connection from '../dbStrategy/postgres.js';
import joi from 'joi';
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken';

export async function shorten(req, res) {
    const urlBody = req.body;
    const token = req.headers.authorization.split(' ')[1]
    const secretKey = process.env.JWT_SECRET;
    const {id} = jwt.verify(token,secretKey)
   
    const urlSchema = joi.object({
    url: joi.string().uri().required()
   });

    const validation = urlSchema.validate(urlBody);
     if (validation.error) {
      const message =  validation.error.details.map(e => e.message);
      console.log(message)
      return res.status(422).send(message);
    }
    const short = nanoid(6)
    const url = urlBody.url
 
    try {
       const { rowCount } = await connection.query('SELECT * FROM urls WHERE url = $1',[url]);

    if (rowCount > 0) {return res.sendStatus(409);}

      await connection.query('INSERT INTO urls ("shortURL", "url", "userId") VALUES ($1, $2, $3)', [short, url, id])

      res.status(201).send({
 shortUrl: short
} )
        } catch (error) {
        console.log(error);
        res.sendStatus(500); 
    }
}
  
export async function getShortenbyId(req, res) {
    const { id } = req.params;
    try {
      const { rows: customer, rowCount } = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
   
      if (rowCount === 0) {
        return res.sendStatus(404)
      }  

      res.status(200).send({"id": customer[0].id, "shortUrl": customer[0].shortURL,"url": customer[0].url});
    } catch (error) {
    
      res.status(500).send(error); 
    }
}
export async function redirect(req, res) {
    const { shortUrl } = req.params;
    
    try {
      const { rows: customer, rowCount } = await connection.query(`SELECT * FROM urls WHERE "shortURL" = $1`, [shortUrl]);
     
      if (rowCount === 0) {
        res.sendStatus(404); // not found
      } 
      await connection.query(
        `
        UPDATE urls 
        SET "visitCount" = "visitCount" + 1
        WHERE urls.shortURL = $1    
      `,
        [shortUrl]
      );

      const url = customer[0].url
      console.log(url)
      res.redirect(url)
    } catch (error) {
        res.status(500).send(error);
    }
}
  
export async function deleteUrl(req, res) {
    
    const  idUrls  = req.params.id;
    
    const token = req.headers.authorization.split(' ')[1]
    const secretKey = process.env.JWT_SECRET;
    const {id} = jwt.verify(token,secretKey)
   
    try {
      const { rows: customer, rowCount } = await connection.query(`SELECT * FROM urls WHERE id = $1`, [idUrls]);
   
     
      if (rowCount === 0) {
        return res.sendStatus(404); // not found
      }
      const idOwner = customer[0].userId
    
      if (idOwner != id){
        return res.status(401).send("unauthorized, ULR not belong to the user");
      }else{
        await connection.query(`DELETE FROM urls WHERE id = $1`, [idUrls]);
        res.sendStatus(204)
      }

    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  }
  