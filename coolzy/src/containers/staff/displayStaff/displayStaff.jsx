import { Typography, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import accountApi from '../../../api/accountAPI';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Row from '../../../components/staff/staffManageRow'
import { createData } from '../../../components/staff/staffManageRow'
import { CustomFillButton } from '../index'
import { CustomOutlineButton } from '../index'

import { styles } from "./styles";
import { getAllStaff } from "../../../redux/slices/staffSlices";
import { useDispatch, useSelector } from "react-redux";
import { currentStaffList } from "../../../redux/selectors";

const DisplayStaff = () => {
    const [staffList, setStaffList] = useState([])
    const [data, setData] = useState([])
    const [row, setRow] = useState([])
    const dispatch = useDispatch()
    const _staffList = useSelector(currentStaffList)

    const navigate = useNavigate()

    useEffect(async () => {
        let cancel = false
        await dispatch(getAllStaff())
            .unwrap()
            .then((originalPromiseResult) => {
                if (cancel) return
                setStaffList(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
        return () => cancel = true
    }, [])

    useEffect(() => {
        let arr = [];
        if (staffList.length > 0) {
            staffList.forEach((staff) => arr = [...arr, createData(staff)])
        }
        setData(arr)
    }, [staffList])

    useEffect(() => {
        setStaffList(_staffList)
    },[_staffList])

    return (
        <div>
            <Box textAlign="right">
                <CustomFillButton onClick={() => { navigate('/manager/staff/add') }}>New</CustomFillButton>
            </Box>
            {staffList &&
                <StaffTable data={staffList} />
            }
        </div>
    )
}

const StaffTable = (props) => {
    const data = props.data
    return (
        <div>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <Typography variant="button" sx={styles.title}>Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="button" sx={styles.title}>Email</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="button" sx={styles.title}>Phone</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <Row sx={{ m: 1 }} key={row.email} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DisplayStaff