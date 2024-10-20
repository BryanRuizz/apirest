const workout = require("../database/Workout");
const { v4: uuid } = require("uuid");


const getAllWorkouts = (filterParams) => {

    try {
        const getAllWorkouts = workout.getAllWorkouts(filterParams);
        return getAllWorkouts;

    } catch (error) {
        throw error;
    }

}
const getOneWorkout = (id) => {
    const getone = workout.getOneWorkout(id);

    return getone;
}
const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updateddAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    const createdWorkout = workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
}

const updateWorkout = (updateWorkout) => {
    // console.log("estoy llegando al service",updateWorkout);
    // const workoutUpdate = {
    //     ...updateWorkout
    // }
    // console.log("que tengo?  ->",updateWorkout);
    const updatedworkout = workout.updateAworkout(updateWorkout);

    return updatedworkout;
}

const updateCity = async (cityId, { cityName, cityLocation }) => {
   
    console.log("Actualizando ciudad con ID:", cityId);
    console.log("Datos de la ciudad:", { cityName, cityLocation });

   
    const updatedCity = await workout.updateAtcity(cityId, { cityName, cityLocation });

   
    if (!updatedCity) {
        throw new Error("Error updating the city");
    }

    return updatedCity;
};


const deleteOneWorkout = (info) => {
    const deleteworkout = workout.deleteOneworkout(info);
    return deleteworkout;
}

const getAllcities = async () => {

    try {
        const getAllWorkouts = await workout.getAllcities();
        // console.log("res services", getAllWorkouts);
        return getAllWorkouts;

    } catch (error) {
        throw error;
    }

}

module.exports = { getAllWorkouts, getOneWorkout, createNewWorkout, updateWorkout, deleteOneWorkout, updateCity, getAllcities };