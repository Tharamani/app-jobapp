/** @format */

import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Field, Form, FormSpy} from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import validator from 'validator';
import axios from 'axios';
import {authRequests} from '../utils/apirequests';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {useState, useEffect} from 'react';
import {CircularProgress} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import baseUrl from '../utils/appconfig.js';

const useStyles = makeStyles(theme => ({
	form: {
		marginTop: theme.spacing(6),
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	feedback: {
		marginTop: theme.spacing(2),
	},
	link: {
		marginTop: theme.spacing(2),
	},
	label: {
		marginTop: theme.spacing(2),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

toast.configure();

function UpdateProfile(props) {
	let editLocation = [];
	let [state, setState] = useState([]);
	let finalLoc = {};
	let arrb = [];
	let arrc = [];
	let [tech, settech] = useState([]);
	const [loading, setloading] = useState(false);
	let [loc, setLoc] = useState([]);
	let [techno, setTechno] = useState([]);
	const [user, setUser] = useState();
	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);

	useEffect(() => {
		//removed and replaced fetch user details without Authorization
		//axios.get(baseUrl+"/users")

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + '/users')
			.then(res => {
				const loginUser = JSON.parse(localStorage.getItem('user'));
				setUser(loginUser);

				const xyz = res.data.map(val => {
					//return val.id == loginUser.id ? setData([val]) : null;
				});
			})
			.catch(err => {
				console.log(err);
			});

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + `/locations`)
			.then(res => {
				setState(res.data);
			})
			.catch(err => {
				console.log(err);
			});

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + `/technologies`)
			.then(res => {
				settech(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const classes = useStyles();

	let profileData = props.location.state.sendData;

	const [{id, username, email, experience, status, location, technologies}] = profileData;

	let history = useHistory();
	const showResults = values => {
		const updatedData = {
			username: values.username,
			email: values.email,
			experience: values.experience,
			location: loc[0],
			Status: values.status,
			technologies: techno,
		};
		setloading(true);

		//removed and replaced fetch user details without Authorization
		//axios.get(baseUrl+"/users")

		// added authorization header for non-blocked users and companyusers
		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.put(baseUrl + `/users/${user._id}`, updatedData)
			.then(res => {
				toast.success('Data saved successfully!!', {
					autoClose: 3000,
				});
				setloading(false);
				history.push('/userprofile');
			})
			.catch(err => {
				setloading(false);
			});
	};
	/*  let locDrop = state.map(function (val) {
    return (   
    );
  });*/

	function locFilter(e) {
		arrb = state.filter(function (val) {
			if (val.id == e.target.value) {
				return true;
			}
		});

		setLoc(arrb);
	}

	function techFilter(event) {
		const {
			target: {value},
		} = event;
		setPersonName(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);

		event.target.value.forEach(val1 => {
			tech.forEach(val => {
				if (val.technology == val1) {
					arrc.push(val);
				}
			});
		});
		setTechno(arrc);
	}

	return (
		<React.Fragment>
			<AppAppBar />
			<AppForm>
				<React.Fragment>
					<Typography variant='h4' gutterBottom marked='center' align='center'>
						Update Profile
					</Typography>
				</React.Fragment>

				<Form
					onSubmit={showResults}
					subscription={{submitted: true}}
					initialValues={{
						username: username,
						email: email,
						experience: experience,
						status: status,
						location: location,
						technologies: technologies,
					}}>
					{({handleSubmit, submitting, form}) => (
						<form onSubmit={handleSubmit} className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Field
										autoFocus
										type='text'
										name='username'
										label='Username'
										fullWidth
										validate={value => (value ? undefined : 'Username Required')}
										component={RFTextField}
										subscription={{
											value: true,
											error: true,
											touched: true,
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name='email'
										type='email'
										label='Email'
										fullWidth
										validate={value => !validator.isEmail(value || '') && 'Plese Enter valid Email '}
										component={RFTextField}
										subscription={{
											value: true,
											error: true,
											touched: true,
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<Field
										name='experience'
										type='number'
										label='Experience in Years'
										fullWidth
										validate={value => (isNaN(value) ? 'Please Enter Valid Experience ' : undefined)}
										component={RFTextField}
										subscription={{
											value: true,
											error: true,
											touched: true,
										}}
									/>
								</Grid>
							</Grid>

							<InputLabel id='select-label' className={classes.label}>
								Preferred Location
							</InputLabel>
							<Select
								labelId='select-label'
								fullWidth
								id='demo-simple-select'
								onChange={e => {
									locFilter(e);
								}}>
								{state.map(function (val) {
									return <MenuItem value={val.id}>{val.city}</MenuItem>;
								})}
							</Select>

							<InputLabel id='select-label-1' className={classes.label}>
								Technologies
							</InputLabel>
							<Select
								fullWidth
								labelId='select-label-1'
								id='demo-multiple-name'
								multiple
								value={personName}
								onChange={e => {
									techFilter(e);
								}}
								MenuProps={MenuProps}
								renderValue={selected => selected.join(', ')}>
								{tech.map(function (val) {
									return (
										<MenuItem value={val.technology}>
											<Checkbox checked={personName.indexOf(val.technology) > -1} />
											<ListItemText primary={val.technology} />
										</MenuItem>
									);
								})}
							</Select>

							<FormButton className={classes.button} disabled={submitting} size='large' color='secondary' fullWidth style={{borderRadius: '10px'}}>
								{loading ? <CircularProgress color='inherit' /> : 'Update'}
							</FormButton>
						</form>
					)}
				</Form>
			</AppForm>
			<AppFooter />
		</React.Fragment>
	);
}

export default withRoot(UpdateProfile);
