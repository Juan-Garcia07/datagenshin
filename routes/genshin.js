const express = require('express');
const router = express.Router();
const {listGenshin, listGenshinByID, addCharacters, deleteGenshin, updateGenshin, signInUser}= require('../controllers/genshin');

router.get('/', listGenshin); // http://localhost:3000/api/v1/genshin
router.get('/:id', listGenshinByID); // http://localhost:3000/api/v1/genshin/?
router.post('/', signInUser); // http://localhost:3000/api/v1/genshin
router.put('/', addCharacters); // http://localhost:3000/api/v1/genshin
router.patch('/:id', updateGenshin); // http://localhost:3000/api/v1/genshin/?
router.delete('/:id', deleteGenshin);

module.exports = router;

