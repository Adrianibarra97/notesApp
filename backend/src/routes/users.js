const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser } = 
    require('../controllers/users.controllers');

router.route('/')
    .get(getUsers)              // Responde objeto.
    .post(createUser);           // Guardan un nuevo objeto.

router.route('/:id')
    .delete(deleteUser);      // Borra un objeto.
    
module.exports =  router;