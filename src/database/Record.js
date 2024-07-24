const DB = require("./db.json");

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