import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CreateExercise = () => {
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:5000/users');
                setExercise(prevState => ({
                    ...prevState,
                    users: response.map(user => user.username),
                    username: response[0].username,
                }));
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [])

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setExercise(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const dateOnChange = (date) => {
        setExercise(prevState => ({
            ...prevState,
            ['date']: date
        }));
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const submitData = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
        }
        axios.post('http://localhost:5000/exercises/add', submitData)
            .then(res => (
                console.log(res.data),
                window.location = '/'
            ))
    }
    return (
        <div>
            <h3>Create New Exercise log</h3>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <select
                        name="username"
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={handleOnChange}>
                        {
                            exercise.users.map((user) => {
                                return <option key={user} value={user}>{user}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        name="description"
                        className="form-control"
                        placeholder="Description..."
                        value={exercise.description}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration: </label>
                    <input type="number"
                        name="duration"
                        className="form-control"
                        placeholder="0"
                        value={exercise.duration}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={dateOnChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value={"Create"} className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default CreateExercise