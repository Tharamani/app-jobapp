/** @format */

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Display from '../search/display';
import NoImg from './noimage.jpg';
import baseUrl from '../../../utils/appconfig.js';
const useStyles = makeStyles({
	search__result: {
		backgroundColor: 'white',
		paddingTop: '5px',
		marginTop: '0px auto',
		width: '100%',
		minHeight: '10px',
		display: 'flex',
		flexDirection: 'column',
		//overflow: "Auto",
	},
	profile: {
		border: '1px solid lightgray',
		margin: '10px',
		height: '30%',
		display: 'flex',
		padding: '10px',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		borderRadius: '20px',
	},
	info: {
		width: '40%',
		flex: '0.9',
		textAlign: 'start',
		margin: '10px',
	},
	picture: {
		width: '25%',
		textAlign: 'center',
	},
	details: {
		backgroundColor: 'whitesmoke',
		borderRadius: '20px',
	},
	typography: {
		marginLeft: '10px',
	},
	image: {
		objectFit: 'contain',
		height: '100%',
		width: '100%',
		maxHeight: '145px',
		maxWidth: '145px',
		borderRadius: '50%',
		border: '2px solid white',
		backgroundColor: 'whitesmoke',
	},
	details: {
		backgroundColor: 'whitesmoke',
		borderRadius: '20px',
	},
	typography: {
		marginLeft: '10px',
	},
	not: {
		fontSize: '24px',
		fontWeight: 900,
		textAlign: 'center',
	},
	search__Icon: {
		height: '15px',
		marginBottom: '-3px',
	},
	profile_image: {
		transition: 'transform 0.2s',
		margin: '0 auto',
		borderRadius: ' 25px',
		cursor: 'pointer',
		width: '80%',
		height: '10rem',
		'&:hover': {
			transform: 'scale(1.15)',
		},
	},
});

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// This the component for the searchResult, where the data is passed to it from the search component as prop.
function SearchResults(props) {
	const [output, setOutput] = useState([]);
	const classes = useStyles();
	if (props.showResult.length == 0) {
		return (
			<div className={classes.search__result}>
				<div className={classes.profile}>
					<div className={classes.info}>
						<div className={classes.details}>
							<div className={classes.not}>Not Found</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (props.showResult.length > 0) {
		let resultArray = [];
		let a = props.showResult.filter(val => {
			resultArray.push(val);
		});
		if (resultArray.length == 0) {
			return (
				<div className={classes.search__result}>
					<div className={classes.profile}>
						<div className={classes.info}>
							<div className={classes.details}>
								<div className={classes.not}>Input doesn't match any result</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className={classes.search__result}>
				{resultArray.map(val => {
					return (
						<div className={classes.profile}>
							<div className={classes.info}>
								<div className={classes.details}>
									<Display val={val} />
								</div>
							</div>
							<div className={classes.picture}>
								<img alt='Profile Pic' className={classes.profile_image} src={!val.photo ? NoImg : baseUrl + `${val.photo.url}`} width='150px' height='100px' />
								<div className={classes.details}>
									<Typography component='h2' variant='body'>
										{' '}
										{val.username}{' '}
									</Typography>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
export default SearchResults;

// import React, { useState } from 'react';
// import { makeStyles } from "@material-ui/core";
// import WorkIcon from '@material-ui/icons/Work';
// import { createMuiTheme,responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Display from '../search/display';
// import NoImg from "./noimage.jpg"
// import baseUrl from "../../../utils/appconfig.js";
// const useStyles = makeStyles({
//   search__result: {
//       backgroundColor:"white",
//       paddingTop:"5px",
//       marginTop: "0px auto",
//       width: "100%",
//       minHeight: "10px",
//       display: "flex",
//       flexDirection: "column",
//       //overflow: "Auto",
//   },
//   profile: {
//       border: "1px solid lightgray",
//       margin: "10px",
//       height: '30%',
//       display: 'flex',
//       padding: "10px",
//       justifyContent: "space-around",
//       backgroundColor:"white",
//       borderRadius: "20px",
//   },
//   info: {
//       width: "40%",
//       flex: "0.9",
//       textAlign: "start",
//       margin: "10px",
//   },
//   picture: {
//      width: "25%",
//      textAlign: "center",
//   },
//   details: {
//     backgroundColor: "whitesmoke",
//     borderRadius: "20px",
// },
// typography: {
//     marginLeft: "10px",
// },
//   image: {
//     objectFit: "contain",
//     height: "100%",
//     width: "100%",
//     maxHeight: "145px",
//     maxWidth: "145px",
//     borderRadius: "50%",
//     border: "2px solid white",
//     backgroundColor: "whitesmoke",

//   },
//     details: {
//     backgroundColor: "whitesmoke",
//     borderRadius: "20px",
//   },
//   typography: {
//       marginLeft: "10px",
//   },
//   not:{
//       fontSize:"24px",
//       fontWeight:900,
//       textAlign:"center"
//   },
//   search__Icon:{
//       height:"15px",
//       marginBottom:"-3px",
//   }
// })

// let theme = createMuiTheme();
//  theme = responsiveFontSizes(theme)

// // This the component for the searchResult, where the data is passed to it from the search component as prop.
// function SearchResults (props) {
//   const [output, setOutput] = useState([])
//   console.log("search_location .........", props)
//   const classes = useStyles()
//   if (props.search_location.length==0  && props.name.length==0) {
//     return(
//       <div className={classes.search__result}>
//         <div className={classes.profile}>
//           <div className={classes.info}>
//             <div className={classes.details}>
//               <div className={classes.not}>

//                     Not Found

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   } else if(props.name.length > 0 && props.search_location.length==0){
//     console.log('props.name.length > 0 ',props.name)
//     let resultArray=[]
//     let resultArray1=[]
//     let search_location = props.name.map((v)=> { return (v.toLowerCase())} )
//         let a = props.showResult.filter((val)=>{
//         if(val.location && search_location.includes(val.location.city.toLowerCase())){
//           resultArray.push(val)
//         }
//         return null ;
//         })
//       resultArray.filter((val)=>{
//         if(resultArray1.indexOf(val)== -1){
//           resultArray1.push(val)
//         }
//       })
//         if(resultArray1.length==0){
//             return(
//                 <div className={classes.search__result}>
//             <div className={classes.profile}>
//                 <div className={classes.info}>
//                     <div className={classes.details}>
//                             <div className={classes.not}>
//                                  Input doesn't match any result

//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                     </div>)
//         }
//         return <div className={classes.search__result}>
//                   {resultArray1.map((val)=>{
//                        console.log( val)
//                     return( <div className={classes.profile}>
//                       <div className={classes.info}>
//                           <div className={classes.details}>
//                                   <Display val={val}/>
//                           </div>
//                       </div>
//                       <div className={classes.picture}>
//                       <img
//                                                     alt="Profile Pic"
//                                                     className="zoom"
//                                                     src={
//             val.photo ===   null? NoImg : baseUrl+`${val.photo.url}`
//                                                     }
//                                                     width="150px"
//                                                     height="100px"
//                                                 />
//                         <div className={classes.details}>
//   <Typography component="h2"  variant="body">  {val.username} </Typography>
//                           </div>
//                       </div>
//                     </div>
//                     )
//                   })}
//                 </div>

//   } else {
//     console.log("else part")
//     {
//         let resultArray=[]
//         let resultArray1=[]
//         if (props.search_location.length>0) {
//           let a =props.showResult.filter( (val) => {
//             props.search_location.map((n)=>{
//               val.technologies.filter((v)=>{
//                 if(v.technology.toLowerCase() == n.toLowerCase()){
//                   resultArray.push(val)
//                 }
//                 return null ;
//               })
//             })
//           })

//           console.log("else part",resultArray)

//           if (props.name.length>0) {
//             let search_location = props.name.map((v)=> { return (v.toLowerCase())} )
//             resultArray = resultArray.filter((val)=>{
//             if(val.location && search_location.includes(val.location.city.toLowerCase())){
//               return val
//             }
//             return null ;
//             })
//           }

//           resultArray.filter((val)=>{
//             if(resultArray1.indexOf(val)== -1){
//               resultArray1.push(val)
//             }
//           })
//         } else if (resultArray1.length==0) {
//             return(
//               <div className={classes.search__result}>
//                 <div className={classes.profile}>
//                   <div className={classes.info}>
//                     <div className={classes.details}>
//                       <div className={classes.not}>
//                         Input doesn't match any result
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>)
//           }
//           return <div className={classes.search__result}>
//                   {resultArray1.map((val)=>{
//                            console.log( val)

//                     return( <div className={classes.profile}>
//                               <div className={classes.info}>
//                                 <div className={classes.details}>
//                                   <Display val={val}/>
//                                 </div>
//                               </div>
//                             <div className={classes.picture}>
//  <img alt="Profile Pic" className="zoom"
//  src={val.photo === null ? NoImg : baseUrl+`${val.photo.url}`} width="150px"
//                                                     height="100px"  />
//                             <div className={classes.details}>
//                               <Typography
//                                 component="h2"
//                                 variant="body"
//                               >  {val.username}
//                               </Typography>
//                             </div>
//                           </div>
//                         </div>
//                     )
//                   })}
//                 </div>
//         }
//     }
// }

// export default SearchResults;

// // import React, { useState } from 'react';
// // import { makeStyles } from "@material-ui/core";
// // import WorkIcon from '@material-ui/icons/Work';
// // import { createMuiTheme,responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
// // import Typography from "@material-ui/core/Typography";
// // import Button from "@material-ui/core/Button";
// // import Display from '../search/display';
// // import NoImg from "./noimage.jpg"
// // import baseUrl from "../../../utils/appconfig.js";
// // const useStyles = makeStyles({
// //   search__result: {
// //       backgroundColor:"white",
// //       paddingTop:"5px",
// //       marginTop: "0px auto",
// //       width: "100%",
// //       minHeight: "10px",
// //       display: "flex",
// //       flexDirection: "column",
// //       //overflow: "Auto",
// //   },
// //   profile: {
// //       border: "1px solid lightgray",
// //       margin: "10px",
// //       height: '30%',
// //       display: 'flex',
// //       padding: "10px",
// //       justifyContent: "space-around",
// //       backgroundColor:"white",
// //       borderRadius: "20px",
// //   },
// //   info: {
// //       width: "40%",
// //       flex: "0.9",
// //       textAlign: "start",
// //       margin: "10px",
// //   },
// //   picture: {
// //      width: "25%",
// //      textAlign: "center",
// //   },
// //   details: {
// //     backgroundColor: "whitesmoke",
// //     borderRadius: "20px",
// // },
// // typography: {
// //     marginLeft: "10px",
// // },
// //   image: {
// //     objectFit: "contain",
// //     height: "100%",
// //     width: "100%",
// //     maxHeight: "145px",
// //     maxWidth: "145px",
// //     borderRadius: "50%",
// //     border: "2px solid white",
// //     backgroundColor: "whitesmoke",

// //   },
// //     details: {
// //     backgroundColor: "whitesmoke",
// //     borderRadius: "20px",
// //   },
// //   typography: {
// //       marginLeft: "10px",
// //   },
// //   not:{
// //       fontSize:"24px",
// //       fontWeight:900,
// //       textAlign:"center"
// //   },
// //   search__Icon:{
// //       height:"15px",
// //       marginBottom:"-3px",
// //   },
// //   profile_image:{
// //   transition: "transform 0.2s",
// //   margin:"0 auto",
// //   borderRadius:" 25px",
// //   cursor: "pointer",
// //    width:"50%",
// //    height:"100px",
// //      "&:hover":   {
// //   transform: "scale(1.15)",
// // }
// //   },

// // })

// // let theme = createMuiTheme();
// //  theme = responsiveFontSizes(theme)

// // // This the component for the searchResult, where the data is passed to it from the search component as prop.
// // function SearchResults (props) {
// //   const [output, setOutput] = useState([])
// //   console.log("search_location .........", props)
// //   const classes = useStyles()
// //   if (props.search_location.length==0  && props.name.length==0) {
// //     return(
// //       <div className={classes.search__result}>
// //         <div className={classes.profile}>
// //           <div className={classes.info}>
// //             <div className={classes.details}>
// //               <div className={classes.not}>

// //                     Not Found

// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   } else if(props.name.length > 0 && props.search_location.length==0){
// //     console.log('props.name.length > 0 ',props.name)
// //     let resultArray=[]
// //     let resultArray1=[]
// //     let search_location = props.name.map((v)=> { return (v.toLowerCase())} )
// //         let a = props.showResult.filter((val)=>{
// //         if(val.location && search_location.includes(val.location.city.toLowerCase())){
// //           resultArray.push(val)
// //         }
// //         return null ;
// //         })
// //       resultArray.filter((val)=>{
// //         if(resultArray1.indexOf(val)== -1){
// //           resultArray1.push(val)
// //         }
// //       })
// //         if(resultArray1.length==0){
// //             return(
// //                 <div className={classes.search__result}>
// //             <div className={classes.profile}>
// //                 <div className={classes.info}>
// //                     <div className={classes.details}>
// //                             <div className={classes.not}>
// //                                  Input doesn't match any result

// //                             </div>
// //                         </div>
// //                     </div>
// //                     </div>
// //                     </div>)
// //         }
// //         return <div className={classes.search__result}>
// //                   {resultArray1.map((val)=>{
// //                        console.log( val)
// //                     return( <div className={classes.profile}>
// //                       <div className={classes.info}>
// //                           <div className={classes.details}>
// //                                   <Display val={val}/>
// //                           </div>
// //                       </div>
// //                       <div className={classes.picture}>
// //                       <img
// //                                                     alt="Profile Pic"
// //                                                     className="zoom"
// //                                                     src={
// //             !val.photo? NoImg : baseUrl+`${val.photo.url}`
// //                                                     }
// //                                                     width="150px"
// //                                                     height="100px"
// //                                                 />
// //                         <div className={classes.details}>
// //   <Typography component="h2"  variant="body">  {val.username} </Typography>
// //                           </div>
// //                       </div>
// //                     </div>
// //                     )
// //                   })}
// //                 </div>

// //   } else {
// //     console.log("else part")
// //     {
// //         let resultArray=[]
// //         let resultArray1=[]
// //         if (props.search_location.length>0) {
// //           let a =props.showResult.filter( (val) => {
// //             props.search_location.map((n)=>{
// //               val.technologies.filter((v)=>{
// //                 if(v.technology.toLowerCase() == n.toLowerCase()){
// //                   resultArray.push(val)
// //                 }
// //                 return null ;
// //               })
// //             })
// //           })

// //           console.log("else part",resultArray)

// //           if (props.name.length>0) {
// //             let search_location = props.name.map((v)=> { return (v.toLowerCase())} )
// //             resultArray = resultArray.filter((val)=>{
// //             if(val.location && search_location.includes(val.location.city.toLowerCase())){
// //               return val
// //             }
// //             return null ;
// //             })
// //           }

// //           resultArray.filter((val)=>{
// //             if(resultArray1.indexOf(val)== -1){
// //               resultArray1.push(val)
// //             }
// //           })
// //         } else if (resultArray1.length==0) {
// //             return(
// //               <div className={classes.search__result}>
// //                 <div className={classes.profile}>
// //                   <div className={classes.info}>
// //                     <div className={classes.details}>
// //                       <div className={classes.not}>
// //                         Input doesn't match any result
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>)
// //           }
// //           return <div className={classes.search__result}>
// //                   {resultArray1.map((val)=>{
// //                            console.log( val)

// //                     return( <div className={classes.profile}>
// //                               <div className={classes.info}>
// //                                 <div className={classes.details}>
// //                                   <Display val={val}/>
// //                                 </div>
// //                               </div>
// //                             <div className={classes.picture}>
// //                             <div >
// //  <img alt="Profile Pic"  className="zoom" className={classes.profile_image}
// //  src={!val.photo? NoImg : baseUrl+`${val.photo.url}`}/>
// //                                                     </div>
// //                             <div className={classes.details}>
// //                               <Typography
// //                                 component="h2"
// //                                 variant="body"
// //                               >  {val.username}
// //                               </Typography>
// //                             </div>
// //                           </div>
// //                         </div>
// //                     )
// //                   })}
// //                 </div>
// //         }
// //     }
// // }

// // export default SearchResults;
