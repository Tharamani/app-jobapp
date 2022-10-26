/** @format */

import ScheduleInterview from './ScheduleInterview';
import ViewDetails from './ViewDetails';
import {makeStyles} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
		marginBottom: '0px',
		fontSize: 30,
	},
	div: {
		fontSize: 24,
		display: 'flex',
		placeItems: 'center',
	},
});

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
export default function SearchResults(props) {
	const classes = useStyles();
	return (
		<div className={classes.typography}>
			<Grid container spacing={1}>
				<Grid item lg={8}>
					<div className={classes.div}>
						{' '}
						<AccountCircleIcon className={classes.search__Icon} fontSize={'large'} />{' '}
						<Grid item lg={8}>
							{props.val.username}
						</Grid>
					</div>
				</Grid>
				<Grid item lg={2}>
					<Typography component='h6' variant='body'>
						{/* Commenting below code to handle null values */}
						{/* <LocationOnIcon className={classes.search__Icon} /> {props.val.location.city} */}
						<LocationOnIcon className={classes.search__Icon} /> {props.val.location == undefined ? '' : props.val.location.city}
					</Typography>
				</Grid>
				<Grid item lg={4}>
					<Typography component='h6' variant='body'>
						{' '}
						{/* Commenting below code to handle null values */}
						{/* Available: {props.val.available.available} */}
						Available: {props.val.available ? props.val.available.available : ''}
					</Typography>
				</Grid>
				<Grid item lg={4}>
					<Typography component='h6' variant='body'>
						{' '}
						{/* Commenting below code to handle null values */}
						{/* Technologies:{props.val.technologies.map(j => j.technology).join(', ')} */}
						Technologies:{props.val.technologies ? props.val.technologies.map(j => j.technology).join(', ') : ''}
					</Typography>
				</Grid>
				<Grid item lg={4}>
					<Typography component='h6' variant='body'>
						{' '}
						{/* Commenting below code to handle null values */}
						{/* <WorkIcon className={classes.search__Icon} /> {props.val.experiences.experiences} Years. */}
						<WorkIcon className={classes.search__Icon} /> {props.val.experiences ? props.val.experiences.experience : ''}.
					</Typography>
				</Grid>
				<Grid item lg={4}>
					<Typography component='h6' variant='body'>
						{' '}
						Education:
					</Typography>{' '}
				</Grid>
				<Grid item lg={4}>
					<Typography component='h6' variant='body'>
						{' '}
						College:
					</Typography>
				</Grid>
				<Grid item lg={4}>
					<Typography component='h6' variant='body'>
						{' '}
						Description:
					</Typography>{' '}
				</Grid>
				<br />
				<br />
				{/*
 replaced plain button with no functionalities,
added dialog component named "ScheduleInterview" to add form and submit data to server 
*/}
				{/*        <Grid item lg={8}><Button
                                          variant="contained"
                                          color="primary"
                                          size="small"
                                      >  interview
                                      </Button></Grid>*/}
				<Grid item lg={2}>
					<ScheduleInterview data={props.val} />
				</Grid>
				{/*Added ViewDetails button as dropdown to view all details of the candidate */}
				<Grid item lg={2}>
					<ViewDetails data={props.val} />
				</Grid>
			</Grid>
		</div>
	);
}
