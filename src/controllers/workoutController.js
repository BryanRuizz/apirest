const workoutService = require("../services/workoutService");

// const getAllWorkouts = (req, res) => {
//     const allWorkouts = workoutService.getAllWorkouts();
//     // console.log("miraa",workoutService.getAllWorkouts);
//     res.send({ status: "OK", data: allWorkouts });
// };

const getAllWorkouts = (req, res) => {
    const { mode } = req.query;
    // ruta/record? -> question mark crea la propiedad query
    // console.log("mira mode",mode);

    try {
        const allWorkouts = workoutService.getAllWorkouts({ mode });
        res.send({ status: "OK", data: allWorkouts });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: "Failed data" } })
    }

};

const getOneWorkout = (req, res) => {
    const id = req.params.workoutId;
    if (!id) {
        res.status(400).send({ status: "FAILED", data: { error: `One of the following keys is missing or is empty in request body: 'workoutId ':${id}` } });
    }
    // console.log("mira esto es lo que estas solicitando ",id);
    const Workout = workoutService.getOneWorkout(id);
    res.status(201).send({ status: "OKkkk", data: Workout })
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

const updatecity = async (req, res) => {

    const cityId = req.params.city;

    const {
        name,
        latitude,
        longitude,
        accuracy
    } = req.body;

    if (
        !name ||
        latitude == null ||
        longitude == null ||
        accuracy == null
    ) {
        return res.status(400).json({
            status: "FAILED",
            data: {
                error: "name, latitude, longitude and accuracy are required"
            }
        });
    }

    try {

        const updatedCity = await workoutService.updateCity(
            cityId,
            {
                name,
                latitude,
                longitude,
                accuracy
            }
        );

        if (!updatedCity) {
            return res.status(404).json({
                status: "FAILED",
                data: {
                    error: "City not found"
                }
            });
        }

        return res.status(200).json({
            status: "OK",
            data: updatedCity
        });

    } catch (error) {

        return res.status(500).json({
            status: "FAILED",
            data: {
                error: error.message
            }
        });
    }
};


const deleteOneWorkout = (req, res) => {

    const id = req.params.workoutId;
  
    const delleted = workoutService.deleteOneWorkout(id);
    res.status(201).send({ status: "OK", data: delleted });
};

const getAllcities = async(req, res) => {

    try {
        // console.log("llegando2");
        const allWorkouts =await workoutService.getAllcities();
        res.send({ status: "OKk", data: allWorkouts });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: "Failed data" } })
    }

};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateWorkout,
    deleteOneWorkout,
    updatecity,
    getAllcities
};