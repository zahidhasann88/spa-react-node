const sectorListRepository = require("../repositories/sectorList-repository")
const express = require("express");
const router = express.Router();

router.get("/get-all-sector", (req, res) =>
sectorListRepository.getAll(req, res)
);

module.exports = router;