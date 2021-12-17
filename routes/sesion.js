const express = require('express');
const router = express.Router();

router.get('/iniciar/sesion', (req, res) => {
    res.render('sesion', {
    });
});


module.exports = router;