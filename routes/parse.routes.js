const {Router} = require('express');
const kworkParser = require('../models/kwork');
const freelanceParser = require('../models/freelanceru');
const router = Router();



router .get('/kwork', 
    async (req, res) => {
        try {
            let parseData = {};

            const resultKwork = await kworkParser(`c=${req.query.c}`);
            // console.log(req.query.c);
            res.json(JSON.stringify(resultKwork));
            
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
)
router .get('/freelance_ru',
    async (req, res) => {
        try {
            let parseData = {};
            const resultFreelanceRu = await freelanceParser(`spec=${req.query}`);
           
            res.json(resultFreelanceRu);
            
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
)

module.exports = router;