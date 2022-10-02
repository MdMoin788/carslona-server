const express = require("express");
const router = express.Router();
const Random = require("../models/randomsModel");
router.post("", async (req, res) => {
    try {
        let random = await Random.create(req.body);
        return res.status(200).send(random)
    } catch (e) {
        return res.status(500).send(e.message)
    }
})
router.get("/pagination", async (req, res) => {
    try {
        ``
        let page = req.query.page
        let size = req.query.size
        if (page && size) {
            let random = await Random.find().skip((page - 1) * size).limit(size).lean().exec();
            const totalPages = Math.ceil((await Random.find().countDocuments()) / size)
            return res.status(200).send(random)
        }
        else {
            let random = await Random.find().lean().exec();
            return res.status(200).send(random)
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
})
router.get("/search", async (req, res) => {
    let lowerTitle = req.query.title.toLowerCase()
    try {
        const searched = await Random.find().lean().exec();
        let searchs = searched.filter((searchs) => searchs.title.toLowerCase().includes(lowerTitle))
         return res.send(searchs)
       
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})
router.get("/filter", async (req, res) => {
    try {
        const filter = await Random.find().sort({ title: req.query.sort }).lean().exec();
        return res.send(filter)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})


module.exports = router;