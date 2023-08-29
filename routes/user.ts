import express from 'express';
import { createUser } from '../controllers/user.js';
var router = express.Router();


router.post("/register", (req, res) => {
  createUser(req.body).then((user) => {
    res.status(201).send(`user created successfully`)
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Something went wrong');
  })
})

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;