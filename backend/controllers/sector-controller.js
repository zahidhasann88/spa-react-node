const sectorRepository = require("../repositories/sector-repository")
const express = require("express");
const router = express.Router();

router.post("/create", (req, res) =>
    sectorRepository.create(req, res)
);

router.get("/get-all", (req, res) =>
    sectorRepository.getAll(req, res)
);

router.post("/get-by-id", (req, res) =>
    sectorRepository.getById(req, res)
);

router.delete("/delete-data", (req, res) =>
    sectorRepository.deleteById(req, res)
);

router.patch("/update", (req, res) =>
    sectorRepository.updateById(req, res)
);

module.exports = router;