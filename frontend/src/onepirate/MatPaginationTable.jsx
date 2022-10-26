/** @format */

import React, {useState, useEffect} from 'react';
import withRoot from './modules/withRoot';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Button} from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../utils/appconfig.js';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import NoImg from './modules/slick/noimage.jpg';
import {SRLWrapper} from 'simple-react-lightbox';
import SimpleReactLightbox from 'simple-react-lightbox';
import '../App.css';
// This is the table which is created using the Material-UI, with pagination and the data is local in this.

const useStyeles = makeStyles({
	root: {
		width: '100%',
	},
	goback__button: {
		margin: '20px 20px',
	},
	container: {
		maxHeight: 400,
		margin: 'auto',
	},
	backButton: {
		borderRadius: '10px',
	},
});

function MatPaginationTable() {
	const classes = useStyeles();
	const [page, setPage] = useState(0);
	const [data, setData] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		//removed and replaced fetch user details without Authorization headers
		//axios.get(baseUrl+"/users")

		axios
			.create({
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
				},
			})
			.get(baseUrl + '/users')
			.then(res => {
				console.log(res.data);
				setData(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handelChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const options = {
		buttons: {
			showNextButton: false,
			showPrevButton: false,
			showThumbnailsButton: false,
			showAutoplayButton: false,
		},
		thumbnails: {
			showThumbnails: false,
		},
		settings: {
			disablePanzoom: false,
			disableWheelControls: true,
		},
	};

	return (
		<Paper>
			<SimpleReactLightbox>
				<AppAppBar />
				<Link to='/' style={{textDecoration: 'none'}}>
					<div className={classes.goback__button}>
						<Button color='secondary' variant='contained' classes={classes.backButton}>
							Go Back to Search
						</Button>
					</div>
				</Link>

				<TableContainer classes={classes.container}>
					<Table stickyHeader aria-lable='sticky table'>
						<TableHead>
							<TableRow>
								<TableCell style={{fontSize: '18px'}} align='center'>
									Name
								</TableCell>
								<TableCell style={{fontSize: '18px'}} align='center'>
									Location
								</TableCell>
								<TableCell style={{fontSize: '18px'}} align='center'>
									Technologies
								</TableCell>
								<TableCell style={{fontSize: '18px'}} align='center'>
									Experience
								</TableCell>
								<TableCell style={{fontSize: '18px'}} align='center'>
									Profile Pic
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
								return (
									<TableRow key={row.id}>
										<TableCell style={{fontSize: '15px'}} align='center'>
											{row.username}
										</TableCell>
										<TableCell style={{fontSize: '15px'}} align='center'>
											{!row.location ? 'N/A' : row.location.city}
										</TableCell>
										<TableCell style={{fontSize: '15px'}} align='center'>
											{row.technologies.length == 0 ? 'N/A' : row.technologies.map(j => j.technology).join(', ')}
										</TableCell>
										<TableCell style={{fontSize: '15px'}} align='center'>
											{!row.experience ? 'N/A' : row.experience}
										</TableCell>
										<TableCell align='center'>
											<SRLWrapper options={options}>
												{/* Commenting below code to handle null values */}
												{/* <img
                                                    alt="Profile Pic"
                                                    className="zoom"
                src={row.photo === null ? NoImg : baseUrl+`${row.photo.url}`}
                                                    width="150px"
                                                    height="100px"
                                                /> */}
												<img alt='Profile Pic' className='zoom' src={row.photo === undefined ? NoImg : baseUrl + `${row.photo.url}`} width='150px' height='100px' />
											</SRLWrapper>
										</TableCell>
										{/* <TableCell align="center" ><img style={{ height: "60px", width: "90px" }} 
  src={row.photo == undefined ? NoImg : row.photo.url} alt="" />
                                    </TableCell> */}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination rowsPerPageOptions={[5, 10, 15]} component='div' count={data.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handelChangeRowsPerPage} />
				<AppFooter />
			</SimpleReactLightbox>
		</Paper>
	);
}

export default withRoot(MatPaginationTable);
