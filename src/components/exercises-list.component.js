import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const Exercise = (props) => {
    const { exercise, deleteExercise } = props
    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={`/edit/${exercise._id}`}>edit </Link>
                |<a href="#" onClick={() => { deleteExercise(exercise._id) }}> delete</a>
            </td>
        </tr >
    )
}

const ExercisesList = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:5000/exercises');
                setExercises(response)
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [])


    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))

        let newList = exercises.filter(el => el._id !== id)
        setExercises(newList)
    }

    const exercisesList = () => {
        return exercises.map(item => {
            return <Exercise exercise={item} deleteExercise={deleteExercise} key={item._id} />
        })
    }
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {exercisesList()}
                </tbody>
            </table>
        </div>
    )
}
export default ExercisesList