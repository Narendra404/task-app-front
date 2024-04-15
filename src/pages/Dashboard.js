import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [user, setUser] = useState({
      id: "",
      name: "",
      username: "",
      email: "",
    });

  const { id } = useParams();
  
  const [ taskCount, setTaskCount ] = useState([]);

  useEffect(() => {
    loadTasks();
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error(`Error loading user with ID ${id}:`, error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const loadTasks = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/tasks/${id}`);
      setTasks(result.data);
      setTaskCount(Object.keys(result.data).length);
    } catch (error) {
      console.error("Error loading tasks:", error);
      // Handle the error (e.g., show an error message to the task)
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/task/${id}`);
      loadTasks();
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      // Handle the error (e.g., show an error message to the task)
    }
  };

   const updateTaskStatus = async (taskId, newStatus) => {
    try {

      const response = await axios.put(`http://localhost:8080/taskstatus/${taskId}`, {
          status: newStatus,
      });
      loadTasks();
    } catch (error) {
      console.error(`Error updating task status for ID ${taskId}:`, error);
    }
  };

  return (

    <div>
    
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Profile</h2>

          {user.id ? (
            <div className="card">
              <div className="card-header">
                {/* <b>User id</b>: {user.id} */}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Name :</b> {user.name}
                  </li>
                  <li className="list-group-item">
                    <b>Email :</b> {user.email}
                  </li>
                  <li className="list-group-item">
                    <b>No. of Tasks :</b> {taskCount}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
            // or display an error message if the data couldn't be loaded
          )}
          <br/>
        <Link className="btn btn-primary mx-2" to={`/addtask/${id}`}>
          Add Task
        </Link>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Task</th>
              <th scope="col"></th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <th scope="row">#</th>
                <td style={{ textDecoration: task.status === "done" ?
                 "line-through" : "none" }}>
                    {task.taskContent}
                  </td>
                <td>
                   <button
                      className="btn btn-success mx-2"
                      onClick={() => updateTaskStatus(task.id, "done")}
                      disabled={task.status === "done"}
                    >
                      Done
                    </button>
                </td>
                <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => updateTaskStatus(task.id, "not done")}
                      disabled={task.status === "not done"}
                    >
                      Not Done
                    </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</div>
  );
}
