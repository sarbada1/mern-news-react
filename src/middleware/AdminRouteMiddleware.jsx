import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../scss/Admin.scss";
import API from "../API";

export default function AdminRouteMiddleware() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  let token = localStorage.getItem("token") ?? "";
  const checkToken = () => {
    API.get("/login/token-verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status) {
          setIsLogin(true);
          setIsLoading(false);
        } else {
          setIsLogin(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {});
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getProfile = () => {
    API.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {});
  };
  useEffect(() => {
    checkToken();
    getProfile();

  }, []);
  return (
    <>
      {isLoading ? (
        <div class="spinner-border m-5" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div>
          {isLogin ? (
            <div className="admin-panel">
              <div className="top-header">
                <div className="container-box">
                  <div className="header-container">
                    <div className="companyname">
                      <h1>BCA News</h1>
                    </div>
                    <div className="logout-section">
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aside-bar">
                <div className="admin-profile">
                  <div className="admin-image">
                    <img src={user.image} alt="" />
                  </div>
                  <div className="admin-info">
                    <h1>{user.role}</h1>
                  </div>
                </div>
                <ul>
                  <li>
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  {user.role=='admin'?
                  
               
                  <li>
                    <Link to="/admin/add-users">Add Users</Link>
                  </li> : ''
                   }
                  <li>
                    <Link to="/admin/show-users">Show Users</Link>
                  </li>
                </ul>
              </div>
              <div className="main">
                <div className="container-box">
                  <Outlet />
                </div>
              </div>
            </div>
          ) : (
            (window.location.href = "/login")
          )}
        </div>
      )}
    </>
  );
}
