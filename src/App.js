import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router-dom";

import Navbar from './components/navbar.component.js'
import ExercisesList from './components/exercises-list.component.js'
import EditExercise from './components/edit-exercise.component.js'
import CreateExercise from './components/create-exercise.component.js'
import CreateUser from './components/create-user.component.js'

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<ExercisesList />} />
        <Route path="/edit/:id" element={<EditExercise />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
