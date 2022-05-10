import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import accountApi from './../../api/accountAPI';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Row from '../../components/staffManageRow'
import { createData } from '../../components/staffManageRow'

const StaffManager = () => {
    const [staffList, setStaffList] = useState([])
    const [row, setRow] = useState([])

    useEffect(async () => {
        const getStaff = async () => {
            await accountApi.getAllStaff()
                .then((res) => {
                    setStaffList(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        await getStaff()
    }, [])

    useEffect(() => {
        let arr = [];
        if (staffList.length > 0) {
            staffList.map((staff) => arr = [...arr, createData(staff)])
        }

        setStaffList(arr)
    }, [staffList])

    return (
        <div>
            <Typography>Staff Page</Typography>
            <StaffTable data = {staffList}/>

        </div>
    )
}

const StaffTable = (props) => {
    const data = props.data
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StaffManager;