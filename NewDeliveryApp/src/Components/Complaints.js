import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "./Header.js";

function Complaints() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    async function fetchInfo() {
      if (!userInfo) {
        history("/");
      }
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/admin/viewComplaints`, config);
      setComplaints(data.complaints);
    }
    fetchInfo();
  }, []);
  return (
    <div className="main">
      <Header toggleClass={toggleClass} />
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        <div className="righty  page-content page-container" id="page-content">
          <div
            className="row container d-flex justify-content-center"
            style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
          >
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title"
                  style={{
                    fontWeight: "900",
                    width: "20rem",
                    padding: "1rem",
                  }}
                >
                  Complaints
                </h4>
              </div>
            </div>
          </div>
          <div
            className="row container d-flex justify-content-around"
            style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
          >
            {complaints.map((ele, index) => {
              return (
                <div
                  className="card"
                  key={index + 1}
                  style={{ width: "30rem", marginBottom: "1rem" }}
                >
                  <div className="card-body">
                    <h4 className="card-title">User Id:- {ele.storeId}</h4>
                    <h4 className="card-title"> Phone:- {ele.phoneNo}</h4>
                    <p className="card-description">Issue:- {ele.message}</p>
                    <button type="button" className="btn btn-danger">
                      Reply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
