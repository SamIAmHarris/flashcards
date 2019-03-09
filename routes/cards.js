const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('card',
        { prompt: "Who is buried in Grant's tomb?", hint: "Think of whose tomb it is" }
    );
});

module.exports = router;