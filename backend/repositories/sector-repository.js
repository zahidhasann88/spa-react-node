const { Op } = require('sequelize');
const Sector = require('../models/tables/sector');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const sectorRepository = (module.exports = {});

async function create(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const CheckName = await Sector.findOne({
                where: {
                    name: req.body.name,
                },
            });

            if (CheckName) {
                output.message = 'The given name already exists.';
                output.statusCode = 409;
                return output;
            }

            const maxId = ((await Sector.max('id')) ?? 0) + 1;
            req.body.id = maxId;
            const sector = await Sector.create(req.body, { transaction: t });
            output.message = 'Creation Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: sector,
            };
        });

        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getById(req) {
    const output = new ResponseDto();
    try {
        const sector = await Sector.findOne({
            where: {
                id: req.body.id,
            },
        });

        if (!sector) {
            output.message = 'No Data found with the given id.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'Data found with the given id.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: sector,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}
async function getAll() {
    const output = new ResponseDto();
    try {
        const sector = await Sector.findAll({
            order: [
                // ['name', 'ASC'],
                ['id', 'ASC'],
            ],
        });

        if (!sector) {
            output.message = 'No Data found.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'List of Data';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: sector,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function update(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const sector = await Sector.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!sector) {
                output.message = 'No data found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await Sector.update(req.body, {
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'Update Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: sector,
            };
        });

        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function deleteData(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const sector = await Sector.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!sector) {
                output.message = 'No Data found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await Sector.destroy({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'Deletion Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: sector,
            };
        });

        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

sectorRepository.create = async function (req, res) {
    const output = await create(req);
    res.status(output.statusCode);
    res.send(output);
};

sectorRepository.getById = async function (req, res) {
    const output = await getById(req);
    res.status(output.statusCode);
    res.send(output);
};

sectorRepository.getAll = async function (req, res) {
    const output = await getAll();
    res.status(output.statusCode);
    res.send(output);
};

sectorRepository.deleteById = async function (req, res) {
    const output = await deleteData(req);
    res.status(output.statusCode);
    res.send(output);
};

sectorRepository.updateById = async function (req, res) {
    const output = await update(req);
    res.status(output.statusCode);
    res.send(output);
};