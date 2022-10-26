/** @format */

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import baseUrl from '../../../utils/appconfig';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ScheduleInterview({data}) {
	const [open, setOpen] = React.useState(false);
	const [snackopen, setSnackopen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClose2 = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackopen(false);
	};
	const formSubmit = e => {
		e.preventDefault();
		const formOb = {
			Date: e.target.data.value,
			comments: e.target.comment.value,
			userId: data.id,
		};

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.post(baseUrl + '/contractrequests', formOb)
			.then(res => {
				setSnackopen(true);
			})
			.catch(e => {
				console.log('error occured ' + e);
			});
	};
	return (
		<div>
			<Button variant='contained' onClick={handleClickOpen}>
				Interview
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Schedule Interview</DialogTitle>
				<form id='myform' onSubmit={formSubmit}>
					<DialogContent>
						<label htmlFor='data'>Interview Date:</label>
						<br />
						<input type='datetime-local' name='data' required />
						<br />
						<br />
						<TextField autoFocus margin='dense' name='comment' label='Message/Comments....' multiline rows={3} fullWidth variant='standard' />
						<Snackbar
							open={snackopen}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							onClose={handleClose2}>
							<Alert onClose={handleClose2} variant='filled' severity='success' sx={{width: '100%'}}>
								Your request has been submitted, Our team will get back to you soon.
							</Alert>
						</Snackbar>
					</DialogContent>
					<DialogActions>
						{/*renamed back button into Cancel*/}
						<Button variant='contained' color='error' onClick={handleClose}>
							Cancel
						</Button>
						<Button variant='contained' color='success' type='submit'>
							Schedule
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
