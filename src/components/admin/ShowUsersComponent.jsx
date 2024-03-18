import { useState, useEffect } from 'react';
import API from '../../API';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'


export default function ShowUsersComponent() {
  const token = localStorage.getItem("token") ?? "";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    API.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {

        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
      });
  };

  const deleteUser = (id) => {

    API.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status) {
          Swal.fire({

            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          });

        }
        getData();
      })
      .catch(error => {

      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <h1>Show users components</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>S.n</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.role}</td>
                  <td><img src={user.image} alt={user.name} width="120" height="120" /></td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
