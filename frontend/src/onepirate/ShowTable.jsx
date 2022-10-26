import React from 'react';
import withRoot from './modules/withRoot';
import { makeStyles } from "@material-ui/core/styles";
import Typography from './modules/components/Typography';
import {Paper} from "@material-ui/core";
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';

import {COLUMNS} from "./Columns"
import { useTable,usePagination } from 'react-table'

const MOCKDATA = [
    { id: 1, name: 'Snow', age: 35,location:"Mumbai" },
    { id: 2, name: 'Lannister', age: 42,location:"Pune" },
    { id: 3, name: 'Lannister', age: 45,location:"Banglore" },
    { id: 4, name: 'Stark', age: 16,location:"Delhi" },
    { id: 5, name: 'Targaryen', age: 25,location:"Agra" },
    { id: 6, name: 'Melisandre',age: 35,location:"Pune" },
    { id: 7, name: 'Clifford', age: 44,location:"Haidrabad" },
    { id: 8, name: 'Frances', age: 36,location:"Banglore" },
    { id: 9, name: 'Roxie', age: 65,location:"Mumbai" },
    { id: 10, name: 'Targaryen', age: 25,location:"Agra" },
    { id: 11, name: 'Melisandre',age: 35,location:"Pune" },
    { id: 12, name: 'Clifford', age: 44,location:"Haidrabad" },
    { id: 13, name: 'Frances', age: 36,location:"Banglore" },
    { id: 14, name: 'Roxie', age: 65,location:"Mumbai" },
    { id: 15, name: 'Roxie', age: 65,location:"Mumbai" },
];

const useStyles = makeStyles((theme) => ({
    title:{
        marginTop: theme.spacing(2),
    },
    container : {
        display:"flex",
        justifyContent:"center",
        textAlign:"center",
        marginBottom: theme.spacing(2),
        
    },
    table: {
        width: "70%",
        marginTop: theme.spacing(2),
        border: "3px solid red",
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    th:{
        padding: theme.spacing(1),
        borderBottom: "3px solid black",
        fontSize:"1rem",
    },
    td:{
        padding: theme.spacing(1),
        borderBottom: "2px solid black",
        fontSize:"1rem",
    },
    pagination:{
        display:"flex",
        justifyContent:"center", 
        marginBottom: theme.spacing(6),
    }
    
}));

function ShowTable(){
    const classes = useStyles();
    
    const columns = React.useMemo(()=>COLUMNS,[])
    const data = React.useMemo(()=>MOCKDATA,[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        prepareRow,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },usePagination)

    return (
       <Paper>
        <AppAppBar />
        <Typography className={classes.title} variant="h4" gutterBottom marked="center" align="center">
            Students Information
        </Typography>
        <div className={classes.container}>
            <table {...getTableProps()} className={classes.table}>
                <thead >
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th className={classes.th} {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} className={classes.tr}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className={classes.td}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
        <div className={classes.pagination}>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
                Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            <span>
                | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
            </span>{' '}
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))}
            </select>
        </div>
        <AppFooter />
       </Paper>
    )
}

export default withRoot(ShowTable);


