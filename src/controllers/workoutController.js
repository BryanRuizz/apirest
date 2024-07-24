const workoutService = require("../services/workoutService");

// const getAllWorkouts = (req, res) => {
//     const allWorkouts = workoutService.getAllWorkouts();
//     // console.log("miraa",workoutService.getAllWorkouts);
//     res.send({ status: "OK", data: allWorkouts });
// };

const getAllWorkouts = (req, res) => {
    const {mode}= req.query;
    // ruta/record? -> question mark crea la propiedad query
    // console.log("mira mode",mode);

    try {
        const allWorkouts = workoutService.getAllWorkouts({mode});
        res.send({ status: "OK", data: allWorkouts });
    } catch (error) {
        res
        .status(error?.status||500)
        .send({status: "FAILED", data:{error:"Failed data"}})
    }

};

const getOneWorkout = (req, res) => {
    const id = req.params.workoutId;
    if (!id) {
        res.status(400).send({ status: "FAILED", data: { error: `One of the following keys is missing or is empty in request body: 'workoutId ':${id}` } });
    }
    // console.log("mira esto es lo que estas solicitando ",id);
    const Workout = workoutService.getOneWorkout(id);
    res.status(201).send({ status: "OK", data: Workout })
};

const createNewWorkout = (req, res) => {
    const { body } = req;

    if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
        res.status(400).send({ status: "FAILED", data: { error: `One of the following keys is missing or is empty in request body: 'name ':${body.name}, 'mode': ${body.mode}, 'equipment':${body.equipment},'exercise':${body.exercises}, 'trainerTip':${body.trainerTips}` } });
    }

    const newWorkout = { name: body.name, mode: body.mode, equipment: body.equipment, exercises: body.exercises, trainerTips: body.trainerTips }

    try {
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }

};

const updateWorkout = (req, res) => {
    const { body } = req;
    if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips || !body.id) {
        res.status(400).send({ status: "FAILED", data: { error: "Parameter :'id' can not be empty" } });
    }

    const updateWorkout = { name: body.name, mode: body.mode, equipment: body.equipment, exercises: body.exercises, trainerTips: body.trainerTips, id: body.id, createdAt: body.createdAt, updateddAt: body.updateddAt }
    try {
        const updatedWorkout = workoutService.updateWorkout(updateWorkout);
        res.status(201).send({ status: "OK", data: updatedWorkout });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
    }

};

const deleteOneWorkout = (req, res) => {

    const id = req.params.workoutId;
    // console.log("id tiene ->",id);
    // if(!body.id){
    //     return;
    // }
    // // const info = {id: body.id};
    const delleted = workoutService.deleteOneWorkout(id);
    res.status(201).send({ status: "OK", data: delleted });
};

module.exports = { getAllWorkouts, getOneWorkout, createNewWorkout, updateWorkout, deleteOneWorkout };