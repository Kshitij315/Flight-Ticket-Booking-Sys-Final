import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import admin from "./admin.module.css";
import { RxPadding } from "react-icons/rx";
import travel from "../../assets/travel.png"
import schedule from "../../assets/plane.gif"
import userlist from "../../assets/plane.png"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import {Button,Grid2} from '@mui/material';



import { Typography } from "@mui/material";



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
        
        <Grid2 container spacing={3} sx={{ padding: 2, justifyContent: 'center',marginTop:2 }}>

          <Grid2 item xs={12} sm={4} md={4}>
          <Card sx={{ maxWidth: 345,
                      display: 'flex',
                      flexDirection: 'column',
                     justifyContent: 'space-between',
                    height:'100%',
                    boxShadow:5}} >
              <CardMedia
             sx={{ height: 290 ,border: '2px solid #e0e0e0'}}
            image={travel}
            title="pilot-image"/>
            <CardContent>
            <Typography variant="h5"  align="center">
                    <h5>Welcome Admin</h5>
                    <p> "Unlock the skies and soar to new heights with our website's exhilarating flight simulation feature!"</p>
                    <p>You can Add schedules for Flights, Modify and Delete Schedules.</p>
                </Typography>
            </CardContent>
                <CardActions sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px'
                }}>
               
                       
                        <Link to='/addFlight'>
                        
                        <Button size="large" variant="contained" align='center'>
                            Add Flight
                        </Button> 

                        
                        
                        
                       
                        </Link>
                    
                </CardActions>
            </Card>
            </Grid2>

            <Grid2 item xs={12} sm={4} md={4}>
            <Card sx={{ maxWidth: 345,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            boxShadow:5}}>
                <CardMedia
                sx={{height:290 ,border: '2px solid #e0e0e0'}}
                image={schedule}
                title="plane-gif"/>
                
                <CardContent>
                  <Typography variant="h5"  align="center">

                   <h5>Welcome Captain Admin</h5>
                    <p>"Embark on thrilling airborne adventures with our website's all-inclusive flight simulations in just one line!",You can View All flights Shedules and Modify and Delete Schedules</p>
                    

                  </Typography>
                    
                </CardContent>
                <CardActions
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px'
                }}
                >

                <Link to="/allFlights">
                <Button color="secondary" size="large" variant="contained" align='center'>
                  All Flights</Button></Link>

                </CardActions>
                

                        
                   
            </Card>
            
            </Grid2>

            <Grid2 item xs={12} sm={4} md={4}>
            <Card sx={{maxWidth: 345,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            boxShadow:5}}>
                <CardMedia  sx={{height:290,border: '2px solid #e0e0e0'
                }}
                image={userlist}
                title="plane"
                />
                <CardContent>
                  <Typography variant="h5"  align="center">
                    <h5>Welcome</h5>
                    <p>"Access your User List effortlessly with a single click on our website."</p>
                    <p>You Can View All User List register on your website from Here easily.</p>
                </Typography>
                </CardContent>
                <CardActions
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px'
                }}
                >
                    <Link to="/userlist"><Button color="success" size="large" variant="contained" align='center'>User List</Button></Link>
                    

                </CardActions>
               
                      
            </Card>
            </Grid2>
            </Grid2>
          
        
      )}
    </div>
  );
}
