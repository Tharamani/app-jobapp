import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImg from "./noimage.jpg"

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    height: 200,
    backgroundColor: "whitesmoke",
    marginTop: "20px",
    textAlign: "center",
  },
  media: {
    height: 90,
    width: 100,
    borderRadius: "50%",
    margin: "25px auto",
    border: "2px lightgray",
  }
});

export default function Cards({ name, skills, exp, img }) {
  // useStyle is used to style the material ui components, we have to define it when before applying the css to the material components.
  // we should import the makeStyles() from the material-ui to before using useStyle to style the components.
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image= {img == "" ? NoImg : img}
          title="Empolyee Info"
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="h6">
            {name}
          </Typography>
          <Typography variant="body" color="textSecondary" component="h6">
            Skills: {skills == "" ? "N/A" : skills}
          </Typography>
          <Typography variant="body" color="textSecondary" component="h6">
            Exp: {!exp ? "N/A" : `${exp} years`} 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}