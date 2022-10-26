/** @format */

//------------------------new file------------------------
import React, {useEffect, useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import './Search.css';
import axios from 'axios';
import SearchResults from './SearchResults';
//import {MultiSelect} from "multiselect-react-dropdown"
import {Multiselect} from 'multiselect-react-dropdown';
import {Grid} from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {alpha, styled} from '@mui/material/styles';
import {makeStyles} from '@material-ui/core';

import baseUrl from '../../../utils/appconfig';

const useStyles = makeStyles({
	search_container: {
		width: '90vw',
		color: 'white',
		margin: '1rem',
	},
});
//This is the component where the search is done and the search result will be shown, for this the data is comming from the strapi.
function Search(props) {
	const classes = useStyles();
	const [user, setUser] = React.useState([]);

	const [location, setLocation] = React.useState([]);
	const [available, setAvailable] = React.useState([]);
	const [experience, setExperience] = React.useState([]);
	const [technologies, setTechnologies] = React.useState([]);

	const [searchLocation, setSearchLocation] = React.useState([]);
	const [searchTechnologies, setSearchTechnologies] = React.useState([]);
	const [searchAvailable, setSearchAvailable] = React.useState();
	const [searchExperience, setSearchExperience] = React.useState();

	const CssTextField = styled(TextField)({
		'& label.Mui-focused': {
			color: 'green',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red',
			},
			'&:hover fieldset': {
				borderColor: 'yellow',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green',
			},
		},
	});

	useEffect(() => {
		let locationItem;
		let availableItem;
		let experienceItem;
		let technologyItem;

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + `/locations`)
			.then(function (response) {
				locationItem = response.data.map(location => {
					return location.city;
				});
				setLocation(locationItem);
			})
			.catch(error => {
				console.log('get locations: ', error);
			});

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + `/availables`)
			.then(function (response) {
				availableItem = response.data.map(available => {
					return available.available;
				});
				setAvailable(availableItem);
			})
			.catch(error => {
				console.log('get availables: ', error);
			});

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + `/experiences`)
			.then(function (response) {
				experienceItem = response.data.map(experience => {
					return experience.experience;
				});
				setExperience(experienceItem);
			})
			.catch(error => {
				console.log('get experiences: ', error);
			});

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + `/technologies`)
			.then(function (response) {
				technologyItem = response.data.map(technology => {
					return technology.technology;
				});
				setTechnologies(technologyItem);
			})
			.catch(error => {
				console.log('get technologies: ', error);
			});
	}, []);

	useEffect(() => {
		let query = '';
		if (searchAvailable && searchTechnologies.length === 0) {
			console.log('searchAvailable: start');
			query = `available.available=${searchAvailable}`;

			if (searchLocation.length > 0) {
				query = query + `&location.city=`;
				searchLocation.map((location, index) => {
					if (index === 0) {
						query = query + `${location}`;
					}
					if (index !== 0) {
						query = query + `&location.city=${location}`;
					}
				});
			}
			if (searchExperience) {
				query = query + `&experiences.experience=${searchExperience}`;
			}
		} else if (searchLocation.length > 0 && searchTechnologies.length === 0) {
			console.log('searchLocation: start');
			query = `location.city=`;

			searchLocation.map((location, index) => {
				if (index === 0) {
					query = query + `${location}`;
				}
				if (index !== 0) {
					query = query + `&location.city=${location}`;
				}
			});

			if (searchAvailable) {
				query = `&available.available=${searchAvailable}`;
			}
			if (searchExperience) {
				query = query + `&experiences.experience=${searchExperience}`;
			}
		} else if (searchExperience && searchTechnologies.length === 0) {
			console.log('searchExperience: start');
			query = query + `experiences.experience=${searchExperience}`;
		} else {
			console.log('else: start');
			if (searchTechnologies.length > 0) {
				console.log('searchTechnologies: start');
				query = `technologies.technology=`;

				searchTechnologies.map((technology, index) => {
					if (index === 0) {
						query = query + `${technology}`;
					}
					if (index !== 0) {
						query = query + `&technologies.technology=${technology}`;
					}
				});

				if (searchAvailable) {
					query = query + `&available.available=${searchAvailable}`;
				}
				if (searchLocation.length > 0) {
					query = query + `&location.city=`;
					searchLocation.map((location, index) => {
						if (index === 0) {
							query = query + `${location}`;
						}
						if (index !== 0) {
							query = query + `&location.city=${location}`;
						}
					});
				}
				if (searchExperience) {
					query = query + `&experiences.experience=${searchExperience}`;
				}
			}
		}
		if (query) {
			axios
				.create({
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
					},
				})
				// .get(baseUrl + `/search?${query}`)
				.get(baseUrl + `/vespa?${query}`)
				.then(function (response) {
					console.log('searches :', response.data);
					props.setShowResult(response.data);
				})
				.catch(error => {
					console.log('search error: ', error);
				});
		} else {
			return props.setShowResult(null);
		}
	}, [searchAvailable, searchLocation, searchExperience, searchTechnologies]);

	return (
		<>
			{/* <div style={{width: '90vw', color: 'white'}}> */}
			{/*added styling for responsive*/}
			<div className={classes.search_container}>
				<Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} spacing={2} direction='row' justify='center' alignItems='flex-start'>
					{/*removed grid <Grid item xs={4}>*/}
					{/* added more gridpoints to make responsive*/}
					<Grid item xs={12} sm={6} md={6} lg={2}>
						<Autocomplete
							multiple
							onChange={(event, newValue) => {
								//commenting old code
								// props.setSearch_location(newValue);
								setSearchTechnologies(newValue);
							}}
							id='tags-outlined'
							// options={value_tec}
							options={technologies}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										label={option}
										sx={{
											backgroundColor: 'white',
										}}
										{...getTagProps({index})}
									/>
								))
							}
							renderInput={params => (
								<TextField
									{...params}
									label='technology'
									sx={{
										'& label.Mui-focused': {
											color: 'white',
										},
										'& label': {
											color: 'white',
										},
										'& .MuiInput-underline:after': {
											borderBottomColor: 'black',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
												backgroundColor: 'transparent',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'black',
												color: 'black',
											},
										},
									}}
								/>
							)}
						/>
					</Grid>
					{/*removed grid <Grid item xs={4}>*/}
					{/* added more gridpoints to make responsive*/}
					<Grid item xs={12} sm={6} md={6} lg={2}>
						<Autocomplete
							multiple
							onChange={(event, newValue) => {
								//commenting old code
								// props.setName(newValue);
								setSearchLocation(newValue);
							}}
							id='tags-outlined'
							// options={value}
							options={location}
							renderTags={(location, getTagProps) =>
								location.map((option, index) => (
									<Chip
										label={option}
										sx={{
											backgroundColor: 'white',
										}}
										{...getTagProps({index})}
									/>
								))
							}
							renderInput={params => (
								<TextField
									{...params}
									label='location'
									sx={{
										'& label.Mui-focused': {
											color: 'white',
										},
										'& label': {
											color: 'white',
										},
										'& .MuiInput-underline:after': {
											borderBottomColor: 'black',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
												backgroundColor: 'transparent',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'black',
												color: 'black',
											},
										},
									}}
								/>
							)}
						/>
					</Grid>
					{/* Add grid to display 'available' options in dropdown */}
					{/*removed grid <Grid item xs={4}>*/}
					{/* added more gridpoints to make responsive*/}
					<Grid item xs={12} sm={6} md={6} lg={2}>
						<Autocomplete
							onChange={(event, newValue) => {
								setSearchAvailable(newValue);
							}}
							id='tags-outlined'
							options={available}
							renderInput={params => (
								<TextField
									{...params}
									label='availability'
									sx={{
										'& label.Mui-focused': {
											color: 'white',
										},
										'& label': {
											color: 'white',
										},
										'& .MuiInput-underline:after': {
											borderBottomColor: 'black',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
												backgroundColor: 'transparent',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'black',
												color: 'black',
											},
										},
									}}
								/>
							)}
						/>
					</Grid>
					{/* Add grid to display 'experience' options in dropdown */}
					{/*removed grid <Grid item xs={4}>*/}
					{/* added more gridpoints to make responsive*/}
					<Grid item xs={12} sm={6} md={6} lg={2}>
						<Autocomplete
							onChange={(event, newValue) => {
								setSearchExperience(newValue);
							}}
							id='tags-outlined'
							options={experience}
							renderInput={params => (
								<TextField
									{...params}
									label='experience'
									sx={{
										'& label.Mui-focused': {
											color: 'white',
										},
										'& label': {
											color: 'white',
										},
										'& .MuiInput-underline:after': {
											borderBottomColor: 'black',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
												backgroundColor: 'transparent',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'black',
												color: 'black',
											},
										},
									}}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default Search;

// commenting code committed by Tayibulla
//   useEffect(() => {
//     let loc=[];
//     axios.get(baseUrl+`/locations`).then(res=>{
//       let locData=res.data.map((val)=>{
//         return loc.push(val.city);
//       })

//       setLocation(loc)
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//     let tech=[];
//     axios.get(baseUrl+`/technologies`).then(res=>{
//       let techData=res.data.map((val)=>{
//         return tech.push(val.technology)
//       })
//       setTechnology(tech)
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//     let availability=[];
//     axios.get(baseUrl+`/availables`).then(res=>{
//       let availData=res.data.map((val)=>{
//         return availability.push(val.available)
//       })
//       setAvailable(availability)
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//         let exp=[];
//     axios.get(baseUrl+`/experiences`).then(res=>{
//       let expData=res.data.map((val)=>{
//         return exp.push(val.experiences)
//       })
//       setExperience(exp)
//     })
//     .catch(err=>{
//       console.log(err)
//     })

//   }, []);

// useEffect(()=>{

//   //    removed and replaced fetch user details without Authorization headers
//     //axios.get(baseUrl+"/users")

//     //added authorization header
//     axios
//       .create({
//         headers: {
//           Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
//         },
//       })
// .get(`${baseUrl}/users?technologies.technology_contains=${result1}&location.city_contains=${result2}&available.available_contains=${result3}&experiences.experiences_contains=${result4}`)
//       .then((res)=> {
//    console.log('filtered users :', res.data);
//      props.setShowResult(res.data);
//         setResult1('')
//         setResult2('')
//         setResult3('')
//         setResult4('')

//         // props.setShowResult() usestate function is comming from view/ProductHero

// })
//       .catch(err => {
//         alert('no connection', err);
//       });
//     },[show])

// 	return (
// 		<>
// 			{/*removed old code without responsive*/}
// 			{/*<div style={{width:"100em", color:"white"}}>
//             <Grid container spacing={3}
//               direction="row"
//               justify="center"
//               alignItems="flex-start"
//             >
//                 */}

// 			{/*added styling for responsive*/}
// 			<div className={classes.search_container}>
// 				<Grid container spacing={2} justify='center'>
// 					{/*removed grid
//             <Grid item xs={4}>*/}
// 					{/* added more gridpoints to make responsive*/}
// 					<Grid item xs={12} sm={6} md={6} lg={2}>
// 						<Autocomplete
// 							multiple
// 							onChange={(event, newValue) => {
// 								setResult1(newValue.join('|'));
// 								setShow(newValue);
// 							}}
// 							renderTags={(value, getTagProps) =>
// 								value.map((option, index) => (
// 									<Chip
// 										label={option}
// 										sx={{
// 											backgroundColor: 'white',
// 										}}
// 										{...getTagProps({index})}
// 									/>
// 								))
// 							}
// 							id='tags-outlined'
// 							options={technology}
// 							renderInput={params => (
// 								<TextField
// 									{...params}
// 									label='technology'
// 									sx={{
// 										'& label.Mui-focused': {
// 											color: 'white',
// 										},
// 										'& label': {
// 											color: 'white',
// 										},
// 										'& .MuiInput-underline:after': {
// 											borderBottomColor: 'black',
// 										},
// 										'& .MuiOutlinedInput-root': {
// 											'& fieldset': {
// 												borderColor: 'white',
// 												backgroundColor: 'transparent',
// 											},
// 											'&.Mui-focused fieldset': {
// 												borderColor: 'black',
// 												color: 'black',
// 											},
// 										},
// 									}}
// 								/>
// 							)}
// 						/>
// 					</Grid>
// 					{/*removed grid
//             <Grid item xs={4}>*/}
// 					{/* added more gridpoints to make responsive*/}
// 					<Grid item xs={12} sm={6} md={6} lg={2}>
// 						<Autocomplete
// 							multiple
// 							onChange={(event, newValue) => {
// 								console.log(newValue);
// 								setResult2(newValue.join('|'));
// 								setShow(newValue);
// 							}}
// 							renderTags={(value, getTagProps) =>
// 								value.map((option, index) => (
// 									<Chip
// 										label={option}
// 										sx={{
// 											backgroundColor: 'white',
// 										}}
// 										{...getTagProps({index})}
// 									/>
// 								))
// 							}
// 							id='tags-outlined'
// 							options={location}
// 							renderInput={params => (
// 								<TextField
// 									{...params}
// 									label='location'
// 									sx={{
// 										'& label.Mui-focused': {
// 											color: 'white',
// 										},
// 										'& label': {
// 											color: 'white',
// 										},
// 										'& .MuiInput-underline:after': {
// 											borderBottomColor: 'black',
// 										},
// 										'& .MuiOutlinedInput-root': {
// 											'& fieldset': {
// 												borderColor: 'white',
// 												backgroundColor: 'transparent',
// 											},
// 											'&.Mui-focused fieldset': {
// 												borderColor: 'black',
// 												color: 'black',
// 											},
// 										},
// 									}}
// 								/>
// 							)}
// 						/>
// 					</Grid>
// 					{/* Added grid to display 'available' options in dropdown */}

// 					{/*removed grid
//             <Grid item xs={4}>*/}
// 					{/* added more gridpoints to make responsive*/}
// 					<Grid item xs={12} sm={6} md={6} lg={2}>
// 						<Autocomplete
// 							onChange={(event, newValue) => {
// 								setResult3(newValue);
// 								setShow(newValue);
// 							}}
// 							id='tags-outlined'
// 							options={available}
// 							renderInput={params => (
// 								<TextField
// 									{...params}
// 									label='available'
// 									sx={{
// 										'& label.Mui-focused': {
// 											color: 'white',
// 										},
// 										'& label': {
// 											color: 'white',
// 										},
// 										'& .MuiInput-underline:after': {
// 											borderBottomColor: 'black',
// 										},
// 										'& .MuiOutlinedInput-root': {
// 											'& fieldset': {
// 												borderColor: 'white',
// 												backgroundColor: 'transparent',
// 											},
// 											'&.Mui-focused fieldset': {
// 												borderColor: 'black',
// 												color: 'black',
// 											},
// 										},
// 									}}
// 								/>
// 							)}
// 						/>
// 					</Grid>

// 					{/* Added grid to display 'experience' options in dropdown */}
// 					{/*removed grid
//             <Grid item xs={4}>*/}
// 					{/* added more gridpoints to make responsive*/}
// 					<Grid item xs={12} sm={6} md={6} lg={2}>
// 						<Autocomplete
// 							onChange={(event, newValue) => {
// 								setResult4(newValue);
// 								setShow(newValue);
// 							}}
// 							id='tags-outlined'
// 							options={experience}
// 							renderInput={params => (
// 								<TextField
// 									{...params}
// 									label='experience'
// 									sx={{
// 										'& label.Mui-focused': {
// 											color: 'white',
// 										},
// 										'& label': {
// 											color: 'white',
// 										},
// 										'& .MuiInput-underline:after': {
// 											borderBottomColor: 'black',
// 										},
// 										'& .MuiOutlinedInput-root': {
// 											'& fieldset': {
// 												borderColor: 'white',
// 												backgroundColor: 'transparent',
// 											},
// 											'&.Mui-focused fieldset': {
// 												borderColor: 'black',
// 												color: 'black',
// 											},
// 										},
// 									}}
// 								/>
// 							)}
// 						/>
// 					</Grid>
// 				</Grid>
// 				{user}
// 			</div>
// 		</>
// 	);
// }

// export default Search;

//-------------------old-------------------------------
// import React, {useEffect, useState} from 'react';
// import SearchIcon from '@material-ui/icons/Search';
// import MicIcon from '@material-ui/icons/Mic';
// import Button from '@material-ui/core/Button';
// import './Search.css';
// import axios from 'axios';
// import SearchResults from './SearchResults';
// //import {MultiSelect} from "multiselect-react-dropdown"
// import {Multiselect} from 'multiselect-react-dropdown';
// import {Grid} from '@material-ui/core';
// import Chip from '@mui/material/Chip';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import {alpha, styled} from '@mui/material/styles';

// import baseUrl from '../../../utils/appconfig';
// //This is the component where the search is done and the search result will be shown, for this the data is comming from the strapi.
// function Search(props) {
//   //const [input, setInput] = useState("");
//   const [show, setShow] = useState();
//   const [value, setValue] = React.useState([]);
//   const [value_tec, setValue_tec] = React.useState([]);
//   const [available, setAvailable] = React.useState([]);
//   const [experience, setExperience] = React.useState([]);

//   const CssTextField = styled(TextField)({
//     '& label.Mui-focused': {
//       color: 'green',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'green',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'red',
//       },
//       '&:hover fieldset': {
//         borderColor: 'yellow',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'green',
//       },
//     },
//   });

//   useEffect(() => {
//     //  props.setShowResult()

//     //removed and replaced fetch user details without Authorization headers
//     //axios.get(baseUrl+"/users")

//     //added authorization header
//     axios
//       .create({
//         headers: {
//           Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
//         },
//       })
//       .get(baseUrl + '/users')
//       .then(function (res) {
//         console.log('users :', res.data);
//         // props.setShowResult() usestate function is comming from view/ProductHero
//         props.setShowResult(res.data);

//         // loc array is used to store location of users
//         var loc = [];

//         res.data.map(val => {
//           // console.log('val.location', val.location);
//           if (val.location) {
//             if (loc.indexOf(val.location.city) == -1) {
//               loc.push(val.location.city);
//             }
//           } else if (val.location == undefined) {
//             //console.log('val.location == undefined');
//           }
//         });

//         setValue(loc);

//         // tec is used to store tachnology of users
//         var tec = [];
//         res.data.map(val => {
//           val.technologies.map(v => {
//             if (Array.isArray(v.technology)) {
//               v.technology.map(j => {
//                 if (tec.indexOf(j) == -1) {
//                   tec.push(j);
//                 }
//               });
//             } else if (v.technology) {
//               if (tec.indexOf(v.technology) == -1) {
//                 tec.push(v.technology);
//               }
//             }
//           });
//         });
//         setValue_tec(tec);

// //unique availables values to dispaly in dropdown
//         let available = [];
// res.data.map(val => {
//           if (val.availability) {
//               available.push(val.availability);
//           } else if (val.availability == undefined) {
//            // console.log('val.availability == undefined');
//           }
//         });
//         setAvailable(available);
//         console.log('available', available);

// // res.data.map(val => {
// //           val.availables.map(v => {
// //             if (Array.isArray(v.available)) {
// //               v.available.map(j => {
// //                 if (availability.indexOf(j) == -1) {
// //                   availability.push(j);
// //                 }
// //               });
// //             } else if (v.available) {
// //               if (availability.indexOf(v.available) == -1) {
// //                 availability.push(v.available);
// //               }
// //             }
// //           });
// //         });
// //         setAvailable(availability);
// //         console.log('available', availability);

//         //unique availables values to dispaly in dropdown
//         let userexperience = [];

// res.data.map(val => {
//           if (val.experience) {
//               userexperience.push(val.experience);
//           } else if (val.experience == undefined) {
//          //   console.log('val.experience == undefined');
//           }
//         });
//         setExperience(userexperience);
//         console.log('experience', userexperience);

// // res.data.map(val => {
// //           val.user_experience.map(v => {
// //             if (Array.isArray(v.Experiences)) {
// //               v.experiences.map(j => {
// //                 if (userexperience.indexOf(j) == -1) {
// //                   userexperience.push(j);
// //                 }
// //               });
// //             } else if (v.Experiences) {
// //               if (userexperience.indexOf(v.Experiences) == -1) {
// //                 userexperience.push(v.Experiences);
// //               }
// //             }
// //           })
// //         });
//        // setExperience(userexperience);
//      //   console.log('experience', userexperience);
//       })
//       .catch(err => {
//         alert('no connection', err);
//       });

//   }, []);

//   return (
//     <>
//               {/*removed old code without responsive*/}
// {/*<div style={{width:"100em", color:"white"}}>
//             <Grid container spacing={3}
//               direction="row"
//               justify="center"
//               alignItems="flex-start"
//             >
//                 */}

//               {/*added styling for responsive*/}
//       <div style={{width: '95vw', color: 'white'}}>
//         <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} spacing={2} direction='row' justify='center' alignItems='flex-start'>
//           {/*removed grid
//             <Grid item xs={4}>*/}
//          {/* added more gridpoints to make responsive*/}
//           <Grid item xs={12} sm={6} md={6} lg={2}>
//            <Autocomplete
//               multiple
//               onChange={(event, newValue) => {
//                 props.setSearch_location(newValue);
//                 console.log(JSON.stringify(newValue));
//               }}
//               id='tags-outlined'
//               options={value_tec}
//               renderTags={(value, getTagProps) =>
//                 value.map((option, index) => (
//                   <Chip
//                     label={option}
//                     sx={{
//                       backgroundColor: 'white',
//                     }}
//                     {...getTagProps({index})}
//                   />
//                 ))
//               }
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   label='technology'
//                   sx={{
//                     '& label.Mui-focused': {
//                       color: 'white',
//                     },
//                     '& label': {
//                       color: 'white',
//                     },
//                     '& .MuiInput-underline:after': {
//                       borderBottomColor: 'black',
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: 'white',
//                         backgroundColor: 'transparent',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: 'black',
//                         color: 'black',
//                       },
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//                    {/*removed grid
//             <Grid item xs={4}>*/}
//          {/* added more gridpoints to make responsive*/}
//           <Grid item xs={12} sm={6} md={6} lg={2}>
//             <Autocomplete
//               multiple
//               onChange={(event, newValue) => {
//                 props.setName(newValue);
//               }}
//               id='tags-outlined'
//               options={value}
//               renderTags={(value, getTagProps) =>
//                 value.map((option, index) => (
//                   <Chip
//                     label={option}
//                     sx={{
//                       backgroundColor: 'white',
//                     }}
//                     {...getTagProps({index})}
//                   />
//                 ))
//               }
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   label='location'
//                   sx={{
//                     '& label.Mui-focused': {
//                       color: 'white',
//                     },
//                     '& label': {
//                       color: 'white',
//                     },
//                     '& .MuiInput-underline:after': {
//                       borderBottomColor: 'black',
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: 'white',
//                         backgroundColor: 'transparent',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: 'black',
//                         color: 'black',
//                       },
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//           {/* Added grid to display 'available' options in dropdown */}

//          {/*removed grid
//             <Grid item xs={4}>*/}
//          {/* added more gridpoints to make responsive*/}
//           <Grid item xs={12} sm={6} md={6} lg={2}>

//             <Autocomplete
//               multiple
//               onChange={(event, newValue) => {
//                 props.setSearch_available(newValue);
//               }}
//               id='tags-outlined'
//               options={available}
//               renderTags={(value, getTagProps) =>
//                 value.map((option, index) => (
//                   <Chip
//                     label={option}
//                     sx={{
//                       backgroundColor: 'white',
//                     }}
//                     {...getTagProps({index})}
//                   />
//                 ))
//               }
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   label='available'
//                   sx={{
//                     '& label.Mui-focused': {
//                       color: 'white',
//                     },
//                     '& label': {
//                       color: 'white',
//                     },
//                     '& .MuiInput-underline:after': {
//                       borderBottomColor: 'black',
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: 'white',
//                         backgroundColor: 'transparent',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: 'black',
//                         color: 'black',
//                       },
//                     },
//                   }}
//                 />
//               )} />
//             </Grid>

//           {/* Added grid to display 'experience' options in dropdown */}
//                   {/*removed grid
//             <Grid item xs={4}>*/}
//          {/* added more gridpoints to make responsive*/}
//           <Grid item xs={12} sm={6} md={6} lg={2}>
//             <Autocomplete
//               multiple
//               onChange={(event, newValue) => {
//                 props.setSearch_experience(newValue);
//               }}
//               id='tags-outlined'
//               options={experience}
//               renderTags={(value, getTagProps) =>
//                 value.map((option, index) => (
//                   <Chip
//                     label={option}
//                     sx={{
//                       backgroundColor: 'white',
//                     }}
//                     {...getTagProps({index})}
//                   />
//                 ))
//               }
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   label='experience'
//                   sx={{
//                     '& label.Mui-focused': {
//                       color: 'white',
//                     },
//                     '& label': {
//                       color: 'white',
//                     },
//                     '& .MuiInput-underline:after': {
//                       borderBottomColor: 'black',
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: 'white',
//                         backgroundColor: 'transparent',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: 'black',
//                         color: 'black',
//                       },
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//         </Grid>
//       </div>
//     </>
//   );
// }

// export default Search;
