const express = require("express");
const router = express.Router();
const { data } = require("../data/flashcard_data.json");
const { cards } = data;

router.get('/', (req, res) => {
    const nextCard = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${nextCard}`);
});

router.get("/:id", (req, res) => {
    const side = req.query.side;
    const id = req.params.id;
    
    if(!side || (side !== 'question' && side !== 'answer')) {
        return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const hint = side === 'question' ? cards[id].hint : undefined;
    const sideToShow = side === 'question' ? 'answer' : 'question';
    const sideToShowDisplay = `${sideToShow.charAt(0)}${sideToShow.slice(1)}`;
    const templateData = { name, text, hint, id, side, sideToShow, sideToShowDisplay };
    res.render("card", templateData);
});

module.exports = router;
