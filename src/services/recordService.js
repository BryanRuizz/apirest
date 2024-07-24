const Record = require("../database/Record");

const getRecordForWorkout = (id) => {
    try {
        const record = Record.getRecordForWorkout(id);
        return record;
    } catch (error) {
        throw error;
    }
}

module.exports = {getRecordForWorkout};
