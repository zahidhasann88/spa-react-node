const { Op } = require('sequelize');
const SectorList = require('../models/tables/sectorList');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const sectorListRepository = (module.exports = {});

async function getAll() {
    const output = new ResponseDto();
    try {
        const sectorList = await SectorList.findAll({
            order: [
                ['id', 'ASC'],
            ],
        });

        if (!sectorList) {
            output.message = 'No Data found.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'List of Data';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: sectorList,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

sectorListRepository.getAll = async function (req, res) {
    const output = await getAll();
    res.status(output.statusCode);
    res.send(output);
};