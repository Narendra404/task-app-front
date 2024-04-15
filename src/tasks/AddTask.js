import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddTask() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [task, setTask] = useState({
    userId: id,
    taskContent: "", // Corrected from taskContent to task
    status: "not done",
  });

  const { taskContent } = task; // Corrected from taskContent to task

  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value }); // Corrected from taskContent to task
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add form validation here if needed
      // console.log(id);
      const response = await axios.post("http://localhost:8080/task", task);

      if (response.data && response.data.userId) {
        // Navigate to a different component with the obtained ID
        navigate(`/dashboard/${response.data.userId}`);
      }
    } catch (error) {
      console.error("Error submitting user:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const goBack = () => {
    // Using the useHistory hook to get access to the history object
    // and go back to the previous page
    window.history.length > 1 && window.history.back();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Task</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Task" className="form-label">
                Task Content
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the task"
                name="taskContent"
                value={taskContent} // Corrected from taskContent to task
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Add task
            </button>
            <Link className="btn btn-outline-danger mx-2" to="#" onClick={goBack}>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
