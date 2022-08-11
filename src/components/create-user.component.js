import React, { useState } from "react";
import axios from "axios";


const CreateUser = () => {
    const [username, setUsername] = useState('')

    const handleOnChange = (event) => {
        setUsername(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let submitData = { username: username }
        axios.post('http://localhost:5000/users/add', submitData)
            .then(res => console.log(res.data))
        setUsername('')
    }
    return (
        <div>
            <h3>Add New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value={"Create"} className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser