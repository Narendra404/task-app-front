import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      console.log(id);
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error(`Error loading user with ID ${id}:`, error);
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
          <h2 className="text-center m-4">User Details</h2>

          {user.id ? (
            <div className="card">
              <div className="card-header">
                <b>User id</b>: {user.id}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Name:</b> {user.name}
                  </li>
                  <li className="list-group-item">
                    <b>Email:</b> {user.email}
                  </li>
                  <li className="list-group-item">
                    <b>Admin:</b> {user.admin}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
            // or display an error message if the data couldn't be loaded
          )}

          <Link className="btn btn-primary my-2" to="#" onClick={goBack}>
            Back  
          </Link>
        </div>
      </div>
    </div>
  );
}
