import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadUsers();
    loadTasks();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const loadTasks = async () => {
    try {
      const result = await axios.get("http://localhost:8080/tasks");
      setTasks(result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      await axios.delete(`http://localhost:8080/tasksdelete/${id}`);
      loadUsers();
      loadTasks();
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center m-4 ">Users</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">User id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.admin}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-center m-4 ">Tasks</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Task id</th>
              <th scope="col">User id</th>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <th scope="row">{task.id}</th>
                <td>{task.userId}</td>
                <td>{task.taskContent}</td>
                <td>{task.status}</td>
                <td>
                  {/* <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
