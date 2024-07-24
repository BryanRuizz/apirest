const ServiceRecord = require("../services/recordService");

const getRecordForWorkout = (req, res) => {
    const { params: { workoutId }, } = req;

    if (!workoutId) {
        res.status(400).send({ status: "FAILED", data: { errror: `Parameter: id: '${id}' can't not be empty` } });
        return;
    }


    try {
        const record = ServiceRecord.getRecordForWorkout(workoutId);
        res.send({status:"OK",data:record});
    } catch (error) {
        res.status(error?.status||500)
        .send({status:"FAILED",data:{error:error?.message|| error}})
    }
}

module.exports = {getRecordForWorkout};