const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "name": "John Doe",
        "website": "johndoe.com"
    };
    res.json(data);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('received');
});

module.exports = router;