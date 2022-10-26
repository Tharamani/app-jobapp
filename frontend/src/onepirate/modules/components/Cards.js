import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "../components/Typography";
import David from "./../../../man.png";
// import Paper from "@material-ui/core/Paper";

// maxWidth: "200px",
// height: "180px",

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
    height: "90%",
    backgroundColor: "whitesmoke",
    marginTop: "10px",
    marginBottom: "10px",
  },

  media: {
    height: "60%",
    width: "60%",
    paddingTop: "56.25%",
    padding: "5px",
    position: "relative",
    borderRadius: "30%",
    left: "20%",
    // paddingTop: "56.25%", // 16:9
    // height: "100px",
    // width: "100px",
    // // borderRadius: "50%",
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 25,
    border: "2px lightgray",
  },
});

export default function Cards(props) {
  // useStyle is used to style the material ui components, we have to define it when before applying the css to the material components.
  // we should import the makeStyles() from the material-ui to before using useStyle to style the components.
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/*console.log("Props Passed---->", props.data.photo.url)*/}
      {/* <Paper className={classes.root} elevation={3}> */}
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            // props.data.photo.url == undefined ? David : props.data.photo.url
            David
          }
          title="Empolyee Info"
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="h3">
            {props.data.username}
          </Typography>
          <Typography variant="body" color="textSecondary" component="h5">
            Skills :{" "}
            {props.data.technologies.map((val, index) => {
              return (
                val.technology +
                (index == props.data.technologies.length - 1 ? "" : ", ")
              );
            })}
            {/* Skills: React, Nodejs, Javascript. */}
            {/* {mystr} */}
          </Typography>
          <Typography variant="body" color="textSecondary" component="h5">
            Exp: {props.data.experience}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* </Paper> */}
    </Card>
  );
}
