const { Router } = require('express');
const router = Router();

const { getNotes, createNote, getNote, updateNote, deleteNote } = 
    require('../controllers/notes.controllers');

router.route('/')
    .get(getNotes)              // Responde objeto.
    .post(createNote);           // Guardan un nuevo objeto.

router.route('/:id')
    .get(getNote)
    .put(updateNote)          // Actualizan un objeto.
    .delete(deleteNote);      // Borra un objeto.

module.exports =  router;