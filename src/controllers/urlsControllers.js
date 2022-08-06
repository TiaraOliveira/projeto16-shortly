import connection from '../dbStrategy/postgres.js';
import joi from 'joi';
import { nanoid } from 'nanoid'


export async function shorten(req, res) {
    const url = req.body;
    
    const urlSchema = joi.object({
    url: joi.string().uri().required()
   });

    const validation = urlSchema.validate(url);
   
    if (validation.error) {
      const message =  validation.error.details.map(e => e.message);
      console.log(message)
      return res.status(422).send(message);
    }
    const short = nanoid(6)

    try {
        const result = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if (result.rowCount === 0) {
            res.sendStatus(404); // not found
        } else {
            const rental = result.rows[0];
            if (!rental.returnDate) res.sendStatus(400); 
            else {
            await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
            }
        }
        } catch (error) {
        console.log(error);
        res.sendStatus(500); 
    }
}
    
  export async function getShortenbyId(req, res) {
    console.log("entrei getshorten" )
    const { id } = req.params;
    try {
      const result = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
      if (result.rowCount === 0) {
        res.sendStatus(404); // not found
      } else {
        const rental = result.rows[0];
        if (!rental.returnDate) res.sendStatus(400); 
        else {
          await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  }
  
  export async function redirect(req, res) {
    console.log("entrei red" )
    const { id } = req.params;
    try {
      const result = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
      if (result.rowCount === 0) {
        res.sendStatus(404); // not found
      } else {
        const rental = result.rows[0];
        if (!rental.returnDate) res.sendStatus(400); 
        else {
          await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  }
  
export async function deleteUrl(req, res) {
    console.log("entrei delete" )
    const { id } = req.params;
    try {
      const result = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
      if (result.rowCount === 0) {
        res.sendStatus(404); // not found
      } else {
        const rental = result.rows[0];
        if (!rental.returnDate) res.sendStatus(400); 
        else {
          await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); 
    }
  }
  