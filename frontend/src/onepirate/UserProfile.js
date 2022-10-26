/** @format */

import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link, useHistory} from 'react-router-dom';

import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone';

import Container from '@material-ui/core/Container';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import Button from './modules/components/Button';
import {authRequests} from '../utils/apirequests';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import baseUrl from '../utils/appconfig.js';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const useStyles = makeStyles(theme => ({
	container: {
		marginLeft: 40,
		[theme.breakpoints.down('md')]: {
			marginLeft: 30,
			fontSize: '10px',
		},
	},
	grid: {marginTop: 25},
	frame1: {
		marginLeft: 90,
		[theme.breakpoints.down('sm')]: {
			marginLeft: -44,
		},
	},
	frame: {
		display: 'flex',
		marginTop: 10,
	},

	dropzone: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 15,
		marginBottom: 35,
		[theme.breakpoints.down('sm')]: {
			marginLeft: 20,
		},
		[theme.breakpoints.down('md')]: {
			marginLeft: 3,
		},
	},
	dropzoneContent: {
		boxShadow: '0px 0px 10px #4dabe3',
		textAlign: 'center',
		display: 'flex',
		margin: 1,
		padding: 35,
		[theme.breakpoints.down('sm')]: {
			padding: 40,
		},
		[theme.breakpoints.down('md')]: {
			display: 'flex',
			width: '95vw',
			padding: 4,
		},
	},
	dropzoneFile: {},
	uploadbutton: {
		marginLeft: 10,
		borderRadius: '10px',
	},

	link: {textDecoration: 'none'},
	updateButton: {
		marginLeft: 40,
		borderRadius: '10px',
		[theme.breakpoints.down('md')]: {
			marginLeft: 8,
		},
	},
	success: {
		textAlign: 'center',
		marginTop: theme.spacing(3),
		color: theme.palette.success.dark,
		fontWeight: 'Bold',
	},
	button: {
		padding: theme.spacing(5),
	},
	inputButton: {
		padding: '10px',
		borderRadius: '10px',
	},
}));

function UserProfile() {
	const history = useHistory();
	const classes = useStyles();
	const [files, setFiles] = useState(null);
	const [resumeFile, setResumeFile] = useState(null);
	const [message, setMessage] = useState(false);
	const [resumeMessage, setResumeMessage] = useState(false);
	const [nopic, setNopic] = useState(false);
	const [noresume, setNoresume] = useState(false);

	const [data, setData] = useState([
		{
			username: null,
			email: null,
			experience: null,
			location: {city: null},
			status: null,
			technologies: [],
		},
	]);

	useEffect(() => {
		//removed and replaced fetch user details without Authorization
		//axios.get(baseUrl+"/users")

		//added header for authorization
		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + '/users')
			.then(res => {
				const loginUser = JSON.parse(localStorage.getItem('user'));

				const checkId = res.data.map(val => {
					return val.id == loginUser.id ? setData([val]) : null;
				});
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const clicklogout = () => {
		localStorage.setItem('regtoken', '');
		localStorage.setItem('user', '');
	};

	//const OnUploadPic = (e) => {
	//made change in function name first letter small
	const onUploadPic = e => {
		e.preventDefault();
		//removed files[0]
		//   if (files[0]) {

		if (files && files.size <= 2097152) {
			//submits only if the filesize is less than 2mb ,here:2097152 bytes=2mb

			//filtering file types with extensions of .png, .jpg ,.jpeg ,.gif only
			if (files.type == 'image/png' || files.type == 'image/jpg' || files.type == 'image/jpeg' || files.type == 'image/gif') {
				const formData = new FormData();

				formData.append('files', files);

				axios
					.post(baseUrl + '/upload/', formData)
					.then(res => {
						//const imgId = res.data[0].id;

						// removed put method to create header
						//axios.put(baseUrl+`/users/${data[0].id}`, { photo: res.data[0].id }).then((response) => {

						//added header for passing token
						axios
							.create({
								headers: {
									Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
								},
							})
							.put(baseUrl + `/users/${data[0].id}`, {photo: res.data[0].id})
							.then(response => {})
							.catch(err => {
								console.log(err);
							});
						setMessage(true);
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				setNopic(true);
			}
		} else {
			setNopic(true);
		}
	};
	//const OnUploadResume = (e) => {
	//made change in function name first letter small
	const onUploadResume = e => {
		e.preventDefault();

		//removed files[0]
		//   if (files[0]) {

		if (resumeFile && resumeFile.size <= 5242880) {
			//submits only if the filesize is less than 5mb ,here:5242880 bytes=5mb

			//filtering file types with extensions of .pdf and .doc only
			if (resumeFile.type == 'application/pdf' || resumeFile.type == 'application/msword' || resumeFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
				const resumeformData = new FormData();

				resumeformData.append('files', resumeFile);

				axios
					.post(baseUrl + '/upload/', resumeformData)
					.then(res => {
						const imgId = res.data[0].id;

						//removed post method of non-header
						//axios..post(baseUrl+`/resumes`, { Resume: res.data[0].id }).then((response) => {

						//added header for authorization
						axios
							.create({
								headers: {
									Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
								},
							})
							.post(baseUrl + `/resumes`, {Resume: res.data[0].id})
							.then(response => {})
							.catch(err => {});
						setResumeMessage(true);
					})
					.catch(err => {});
			} else {
				setNoresume(true);
			}
		} else {
			setNoresume(true);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setMessage(false);
		setResumeMessage(false);
		setNopic(false);
		setNoresume(false);
	};

	return (
		<React.Fragment>
			<AppAppBar />
			<Container className={classes.container}>
				<Typography variant='h3' gutterBottom marked='center' align='center'>
					User Profile
				</Typography>
				<Grid container spacing={2} className={classes.grid}>
					{data.map(val => {
						return (
							<>
								<Grid item xs={1} sm={1}></Grid>
								<Grid item xs={10} sm={5}>
									<dl className={classes.frame1}>
										<Typography variant='h6' gutterBottom>
											Username
										</Typography>
										<Typography variant='h5' gutterBottom>
											<dd>- {val.username}</dd>{' '}
										</Typography>
										<Typography variant='h6' gutterBottom>
											Email
										</Typography>
										<Typography variant='h5' gutterBottom>
											<dd>- {val.email}</dd>{' '}
										</Typography>
										<Typography variant='h6' gutterBottom>
											Experience
										</Typography>
										<Typography variant='h5' gutterBottom>
											<dd>- {!val.experience ? 'N/A' : val.experience + ' years'} </dd>{' '}
										</Typography>
									</dl>
								</Grid>
								<Grid item xs={10} sm={5}>
									<dl className={classes.frame}>
										<div>
											<Typography variant='h6' gutterBottom>
												Location
											</Typography>
											<Typography variant='h5' gutterBottom>
												<dd>- {!val.location ? 'N/A' : val.location.city}</dd>{' '}
											</Typography>
											<Typography variant='h6' gutterBottom>
												Technologies
											</Typography>
											<Typography variant='h5' gutterBottom>
												<dd>- {val.technologies.length == 0 ? 'N/A' : val.technologies.map(j => j.technology).join(', ')}</dd>{' '}
											</Typography>
										</div>
										<Link
											to={{
												pathname: '/updateprofile',
												state: {sendData: data},
											}}
											className={classes.link}>
											<Button color='secondary' variant='contained' className={classes.updateButton}>
												Update Profile
											</Button>
										</Link>
									</dl>
								</Grid>
								<Grid item xs={1} sm={1}></Grid>
							</>
						);
					})}
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs={10} sm={10} md={5}>
						<div className={classes.dropzone}>
							<div className={classes.dropzoneContent}>
								{/*removed dropzone component*/}

								{/*             <div className={classes.dropzoneFile}>
                  <DropzoneArea
                  filesLimit={1}
                    showAlerts={false}
                    onChange={(files) => {
                      setFiles(files);
                    }}
                  />
                </div>
*/}

								{/* Added input type to upload file*/}
								<Button color='secondary' variant='contained' className={classes.inputButton}>
									<input
										type='file'
										accept='.jpg,.jpeg,.png,.gif'
										id='photoimg'
										filesLimit={1}
										showAlerts={true}
										onChange={event => {
											setFiles(event.target.files[0]);
										}}
									/>
								</Button>

								<div className={classes.uploadbutton}>
									<Button className={classes.uploadbutton} color='secondary' variant='contained' onClick={onUploadPic}>
										Upload Profile
									</Button>
								</div>
							</div>
						</div>
					</Grid>
					<Grid item xs={1} sm={1}></Grid>
					<Grid item xs={10} sm={10} md={5}>
						<div className={classes.dropzone}>
							<div className={classes.dropzoneContent}>
								{/*removed dropzone component*/}

								{/*                <div className={classes.dropzoneFile}>
                  <DropzoneArea
                  filesLimit={1}
                    showAlerts={false}
                    onChange={(files) => {
                      setFiles(files);
                    }}
                  />
                </div>
*/}
								{/* Added input type to upload file*/}
								<Button color='secondary' variant='contained' className={classes.inputButton}>
									<input
										type='file'
										name='resumefile'
										accept='.pdf,.doc'
										filesLimit={1}
										showAlerts={true}
										onChange={event => {
											setResumeFile(event.target.files[0]);
										}}
									/>
								</Button>
								<div className={classes.uploadbutton}>
									<Button className={classes.uploadbutton} color='secondary' variant='contained' onClick={onUploadResume}>
										Upload Resume
									</Button>
								</div>
							</div>
						</div>
					</Grid>

					<Grid item xs={1} sm={1}></Grid>
				</Grid>
				<Snackbar
					open={message}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					autoHideDuration={5000}
					onClose={handleClose}>
					<Alert onClose={handleClose} severity='success' sx={{width: '100%'}}>
						Profile Pic Uploaded Successfully !
					</Alert>
				</Snackbar>
				<Snackbar
					open={resumeMessage}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					autoHideDuration={5000}
					onClose={handleClose}>
					<Alert onClose={handleClose} severity='success' sx={{width: '100%'}}>
						Resume Submitted Successfully !
					</Alert>
				</Snackbar>
				<Snackbar
					open={nopic}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					autoHideDuration={5000}
					onClose={handleClose}>
					<Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
						Please select Profile Pic first.
						<br />
						image format must be .jpg,.jpeg,.png or .gif with less than 2mb.
					</Alert>
				</Snackbar>
				<Snackbar
					open={noresume}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					autoHideDuration={5000}
					onClose={handleClose}>
					<Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
						Please select Resume first .<br />
						resume format must be .pdf or .doc with less than 5mb.
					</Alert>
				</Snackbar>

				{/*<div align="center" className={classes.button}>
          <Button
            color="secondary"
            variant="contained"
            onClick={clicklogout}
            component={Link}
            to="/signin"
          >
            Log Out
          </Button>
        </div>*/}
			</Container>
			<AppFooter />
		</React.Fragment>
	);
}

export default withRoot(UserProfile);
