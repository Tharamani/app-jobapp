import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImage from "./noimage.jpg";

const useStyles = makeStyles({
	root: {
		maxWidth: 200,
		height: 200,
		backgroundColor: "#fff5f8",
		marginTop: "20px",
		textAlign: "center",
	},

	media: {
		height: 90,
		width: 100,
		borderRadius: "50%",
		margin: "20px auto 0px auto",
		border: "2px lightgray",
	},
});

function InfiniteCarouselTwo() {
	const classes = useStyles();
	let [empData, setEmpData] = useState([]);

	useEffect(() => {
		axios
			.get("https://jobapp.3utilities.com/users")
			.then((res) => {
				//console.log(res.data);
				setEmpData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log(empData);

	//Here this setting will charecterize our slick slider, for example slidespeed slidesToShow slidesToScroll & responsiveness etc,.
	let noOfItems = empData.length;
	var infiniteScroll = true;
	if (noOfItems < 6) {
		infiniteScroll = false;
	}

	var settings = {
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					// infinite: true,
					// dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		],

		//pauseOnHover: true,
		autoplay: true,
		//lazyLoad: true,
		cssEase: "linear",
		autoplaySpeed: 2000,
		infinite: infiniteScroll,
		//centerMode: true,
		speed: 800,
		slidesToShow: 6,
		//arrows:true,
		slidesToScroll: 1,
	};

	let na = "N/A";

	//dow here the data is populated which makes our carousel dynamic
	//which means as a new user get's added, a new card in the slider gets added which displays user data
	return (
		<Slider {...settings}>
			{empData.map((data) => {
				return (
					<Card className={classes.root}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={
									data.photo === undefined
										? NoImage
										: data.photo.url
								}
								title="Empolyee Info"
							/>
							<CardContent title="Empolyee Info">
								<Typography
									style={{ padding: "1px" }}
									gutterBottom
									variant="body"
									component="h6"
								>
									{data.username}
								</Typography>
								<Typography
									style={{ padding: "1px" }}
									variant="body"
									color="textSecondary"
									component="h6"
								>
									Skills:{" "}
									{data.technologies.length === 0
										? na
										: data.technologies
												.map((j) => j.technology)
												.join(", ")}
								</Typography>
								<Typography
									style={{ padding: "2px" }}
									variant="body"
									color="textSecondary"
									component="h6"
								>
									Exp:{" "}
									{data.experience === undefined
										? na
										: data.experience}{" "}
									years
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				);
			})}
		</Slider>
	);
}

export default InfiniteCarouselTwo;
