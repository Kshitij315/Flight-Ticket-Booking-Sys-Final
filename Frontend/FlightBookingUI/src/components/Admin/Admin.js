import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import admin from "./admin.module.css";
import { RxPadding } from "react-icons/rx";
import travel from "../../assets/travel.png"
import schedule from "../../assets/plane.gif"
import userlist from "../../assets/plane.png"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Admin() {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.isadmin === 0) {
      history("/");
    } else {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className={admin.admin_main}>
      {isLoading ? (
        <div className={admin.loader_main}>
          <div className={admin.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        
          <div className={admin.container}>
          {/* admincard card */}
          <div className = "row">
          <div className="col-md-4 justify-content:center">
            <div className="card">
            <img 
            src={travel}
              alt="Flight attendant with small airplane icon"
            />
            <h5 className={admin.cardtitle}>Welcome Admin</h5>
            <p className="card-subtitle">
              "Unlock the skies and soar to new heights with our website's
              exhilarating flight simulation feature!"
            </p>
            <div>
            <Link to={"/addFlight"}>
            <button
              className={admin.buttonblue}
              
            >
              ADD FLIGHTS
            </button>
            </Link>
            </div>
          </div>
          </div>

          {/* captain card */}
          <div className="col-md-4">
          <div className="card" >
            <img
              src={schedule}
              alt="Pilot with sunglasses in uniform"
            />
            <h5 className={admin.cardtitle}>Welcome Captain Admin</h5>
            <p className="card-subtitle">
              "Embark on thrilling airborne adventures with our website's
              all-inclusive flight simulations in just one line!"
            </p>
            <p className="card-description">
              You can View All flights Shedules and Modify and Delete Schedules.
            </p>
            <div>

            <Link to={"/allFlights"}>
            <button
              className={admin.buttongreen}
           
            >
              ALL FLIGHTS
            </button>
            </Link>
            </div>
            
            
          </div>
          </div>

          {/* User list card */}
          <div className="col-md-4">
          <div className="card">
            <img src={userlist} alt="Blue airplane icon"/>
            <h5 className={admin.cardtitle}>Welcome</h5>
            <p className="card-subtitle">
              "Access your User List effortlessly with a single click on our
              website."
            </p>
            <p className="card-description">
              You Can View All User List register on your website from Here
              easily.
            </p>
            <div>

            <Link to={"/userList"}>
            <button
              className={admin.buttoncyan}>
              
              USER LIST
            </button></Link>
            </div>
          
          </div>
          </div>
          </div>
          </div>
          
          
        
      )}
    </div>
  );
}
