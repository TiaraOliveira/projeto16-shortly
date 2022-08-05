import bcrypt from 'bcrypt';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import userSchema from '../schemas/userSchema.js';
import connection from '../dbStrategy/postgres.js';

export async function createUser(req, res) {
  const signin = req.body;
  const signinSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(15).required(),
    password_confirmation: joi.any().valid(joi.ref('password')).required()
    });

    const validation = signinSchema.validate(signin);

    if (validation.error) {
      const message =  validation.error.details.map(e => e.message);
      console.log(message)
      return res.status(422).send(message);
    }

    
    try {
      const emailsRegisteredRows = await connection.query(`SELECT email FROM users`)
      const emailsRegistered = emailsRegisteredRows.rows.map(e => e.email);
      const repeatEmail = emailsRegistered.find(e => e == signin.email)
      if(repeatEmail){
          return res.status(409).send('Email já cadastrado.')
      }
  
      const senhaCriptografada = bcrypt.hashSync(signin.password, 10);
    
    await connection.query('INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)', [signin.name, signin.email,senhaCriptografada])
    
      res.sendStatus(201)
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
}

export async function loginUser(req, res) {
  const userLogin = req.body;
  const validation = userSchema.validate(userLogin, {abortEarly: false});

  if (validation.error) {
    const message =  validation.error.details.map(e => e.message);
    return res.status(422).send(message);
  }

  const verifiedEmail = await connection.query('SELECT * FROM user WHERE email = $1', [userLogin.email])




  const secretKey = process.env.JWT_SECRET


  if (user && bcrypt.compareSync(userbody.password, user.password)) {
    const token = jwt.sing({id: id.userbody, secretKey});
   
    return res.status(201).send({ token, id: id.userbody});
  } else {
    return res.status(401).send('Senha ou email incorretos!');
  }
}
