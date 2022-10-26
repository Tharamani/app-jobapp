import './h.css';
import React, {useState, useEffect} from 'react';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Icon from '@material-ui/core/Icon';
import { Button } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import {Grid} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { AvatarGroup } from '@mui/material';
import axios from 'axios';
import NoImg from "../slick/noimage.jpg";
import baseUrl from "../../../utils/appconfig.js";

function Dotmenu() {

  const [open, setOpen] = useState(true);
  let history = useHistory();
  let [token, setToken] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const regToken = localStorage.getItem("regtoken");

  useEffect(() => {
  //removed and replaced fetch user details without Authorization
  //axios.get(baseUrl+"/users")

  // added authorization header for non-blocked users and companyusers
    
    axios.create({
        headers: {
          Authorization:
            `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
        },
      }).get(baseUrl+"/users")
    .then((res) => {
      const loginUser = JSON.parse(localStorage.getItem("user"));
      const userObj = res.data.filter((val) => {
        return val.id === loginUser.id
      })[0];
      const avatar = !userObj.photo ? NoImg : baseUrl+`${userObj.photo.url}`;
      setAvatarUrl(avatar);
    })
  })

  const count = () => {
    setOpen(false)
  }

  const count1 = () => {
    setOpen(true)
  }

  const logoutUser = () => {
     
     localStorage.removeItem('user');
     localStorage.removeItem('regtoken');
     localStorage.removeItem("Id");
     history.push("/") 
     // localStorage.clear();
  }

  return (
    <div className="p">
      
      { open == true ? 
      <>
      <div className="menu" onClick={count} >
        <IconButton edge="start"  color="inherit" aria-label="menu">
        <Avatar src={avatarUrl}></Avatar>
        </IconButton></div>
      </> : 
      <>
      <div className="menu" onClick={count1} >
        <IconButton edge="start"  color="inherit" aria-label="menu">
        {/* <AccountCircleIcon style={{color:"black",fontSize:"80px"}}/> */}
          {/* Added the folllowing avatarurl below */}
          <Avatar src={avatarUrl} ></Avatar>
        </IconButton>
      </div>
      <div className='collpse' >
        <Grid container 
        justify="center"
        spacing={1}
        > 
          <Grid item lg={12}>
  {/* <AccountCircleIcon style={{fontSize:"80px",color:"black"}}/> */}
 <Avatar src={avatarUrl} style={{margin:"10px auto",height:"6rem",width:"6rem",borderRadius:"50%"}}></Avatar>
          </Grid>
          { localStorage.getItem("regtoken") == null ?
            <>
            <Grid item lg={5}><Link to="/signin" style={{textDecoration: "none"}}><Button>Sign In</Button></Link></Grid>
            <Grid item lg={5}><Link to="/signup" style={{textDecoration: "none"}}><Button>Sign Up</Button></Link></Grid>
            </>
            :
            <>
            <Grid item lg={12}>
              <Button onClick={logoutUser}>Log Out</Button></Grid>
            </>
        }
        </Grid>
      </div>
      </>
    }
      
    </div>
  );
}

export default Dotmenu;
