const DB = require("./db.json");

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         
 *         workout:
 *           type: string
 *           example: 4a3d9aaa-608c-49a7-a004-66305ad4ab50
 *         record:
 *           type: string
 *           example: 160 reps

 */



const getRecordForWorkout = (id) => {
    try {
        if (!id) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${id}'`
            };
        }
        const record = DB.records.filter((record) => {
            return record.workout === id
        });

        return record;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
};

module.exports = { getRecordForWorkout };