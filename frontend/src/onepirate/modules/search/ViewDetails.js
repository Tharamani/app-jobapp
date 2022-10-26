/** @format */

import {makeStyles} from '@material-ui/core';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Closeicon from './Closeicon.js';

const useStyles = makeStyles(theme => ({
	boxStyle: {
		width: '95vw',
		margin: '10px',
		padding: '10px',
		fontWeight: 'bold',
		backgroundColor: 'whitesmoke',
		[theme.breakpoints.down('sm')]: {
			width: '85vw',
		},
	},
}));
export default function ViewDetails({data}) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button id='fade-button' aria-controls={open ? 'fade-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick} variant='contained'>
				View Details
			</Button>

			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: '80vw',

							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							left: 300,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
				{/*removed inline-styles to Box component
  <Box sx={{width:'95vw',margin:'10px',padding:'10px',fontWeight:"bold",backgroundColor:"whitesmoke"}}>*/}

				{/*added className  to Box component*/}
				<Box className={classes.boxStyle}>
					<Closeicon />
					<Grid container spacing={3}>
						<Grid item lg={4}>
							<Typography component='h4' variant='body'>
								{' '}
								UserId :{data.id}
							</Typography>
						</Grid>
						<Grid item lg={4}>
							<Typography component='h4' variant='body'>
								{' '}
								Name :{data.username}
							</Typography>
						</Grid>{' '}
						<Grid item lg={4}>
							<Typography component='h4' variant='body'>
								Email:{data.email}
							</Typography>
						</Grid>
						<Grid item lg={4}>
							<Typography component='h4' variant='body'>
								{/* Commenting below code to handle null values */}
								{/* Skills:{data.technologies.map(j => j.technology).join(', ')} */}
								Skills:{data.technologies ? data.technologies.map(j => j.technology).join(', ') : ''}
							</Typography>
						</Grid>
						<Grid item lg={4}>
							<Typography component='h4' variant='body'>
								{' '}
								{/* Commenting below code to handle null values */}
								{/* Location :{data.location.city} */}
								{/* Location :{data.location.city} */}
								Location :{data.location === undefined ? '' : data.location.city}
							</Typography>
						</Grid>
						<Grid item lg={4}>
							<Typography component='h4' variant='body'>
								{' '}
								{/* Commenting below code to handle null values */}
								{/* Experience :{data.experience} years*/}
								Experience :{data.experiences ? data.experiences.experience : ''}
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Menu>
		</div>
	);
}
