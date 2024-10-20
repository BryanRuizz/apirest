const DB = require("../database/db.json");
const { saveToDatabase } = require("../database/utils");
const db = require('./db'); // Import the MySQL connection

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */


const getOneWorkout = (id) => {
    const one = DB.workouts.filter((workout) => {
        return id === workout.id
    })
    if (one.length < 1) {
        return "not found";
    }
    return one;
}

const getAllWorkouts = (filterParams) => {
    try {
        let workouts = DB.workouts;
        // console.log("mira mode",filterParams);
        if (filterParams.mode) {
            let value = filterParams.mode.toLowerCase();
            // console.log("dentro de if",filterParams.mode);
            return DB.workouts.filter((workout) =>
                workout.mode.toLowerCase().includes(value)
            );
        }

        return workouts;
    } catch (error) {
        throw { status: 500, message: error }
    }

}

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    // this is to validate if we already have an index name with the same value.

    if (isAlreadyAdded) {
        throw {
            status: 400,
            messages: `workout with the name '${newWorkout.name}' already exist`,
        }
    }
    try {
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        };
    }

}

const updateAworkout = (workoutUpdate) => {
    // console.log("que me esta llegando model->",workoutUpdate);
    DB.workouts = DB.workouts.map((workout) => {
        if (workout.id === workoutUpdate.id) {

            workoutUpdate.updateddAt = new Date().toLocaleString("en-US", { timeZone: "UTC" }); // Actualiza la fecha con el valor deseado
            //   console.log(workoutUpdate);
            return workoutUpdate; // Reemplaza el elemento completo con la actualización
        } else {
            return workout; // Devuelve el elemento original sin cambios
        }
    });
    // Guarda los cambios en el archivo JSON
    saveToDatabase(DB);

    // Retorna `workoutUpdate` actualizado
    return workoutUpdate;
}



const deleteOneworkout = (deleteworkout) => {

    const deletedvalue = [];

    DB.workouts = DB.workouts.filter((workout) => {

        if (workout.id === deleteworkout) {
            deletedvalue.push(workout);
            return false;
        }
        return workout.id !== deleteworkout;
    })
    // console.log("mira la basde de datos",DB.workouts);
    saveToDatabase(DB);
    return deletedvalue;
}


const updateAtcity = async (cityId, { cityName, cityLocation }) => {
    try {
        console.log("Llegando a la función updateAtcity");

       
        const [result] = await db.execute(
            'UPDATE cities SET cityName = ?, cityLocation = ? WHERE id = ?',
            [cityName, cityLocation, cityId] 
        );

       
        if (result.affectedRows > 0) {
            return { message: "Updated City", cityId, cityName, cityLocation }; 
        } else {
            return { message: "No fue posible actualizar la ciudad" };
        }
    } catch (error) {
        console.error("Error updating city:", error); 
        throw error; 
    }
};



const getAllcities = async () => {
    try {
    
        const [rows] = await db.execute('SELECT * FROM cities');

     
        let res = rows[0].cityName + "," + rows[0].cityLocation;
        console.log(res);
        return res;

    } catch (error) {
      
        console.error('Error fetching cities:', error);
        throw error;
    }
}

module.exports = { getOneWorkout, getAllWorkouts, createNewWorkout, updateAworkout, deleteOneworkout, updateAtcity, getAllcities };