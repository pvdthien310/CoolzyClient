import { Stack } from '@mui/material';
// import "./styles.css";
import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import invoiceAPI from '../../api/orderAPI';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const RevenuePage = () => {
    const [data, setData] = useState(null)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [yearList, setYearList] = useState([])

    const handleChange = (event) => {
        setCurrentYear(event.target.value)
    }

    async function LoadData() {
        const result = await invoiceAPI.getAll()
        let yearList = []
        let result2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        if (result) {
            await result.map(ite => {
                const newDate = new Date(ite.date)

                if (!yearList.includes(newDate.getFullYear())) yearList.push(newDate.getFullYear())

                if (newDate.getFullYear() == currentYear)
                   { 
                       result2[newDate.getMonth() - 1] = result2[newDate.getMonth() - 1] + ite.total
                       console.log(ite.total)
                   }

            })
            let revenue = []
            await result2.map((ite, i) => {
                revenue.push({
                    name: i + 1,
                    Profit: ite / 1000
                })
            })
            setData(revenue)
            setYearList(yearList)
        }
        else console.log('error')
    }

    useEffect(() => {
        LoadData()
    }, [])

    useEffect(() => {
        LoadData()
    }, [currentYear])

    return (
        <Stack sx={{ width: ' 100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {
                yearList.length > 0 &&
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={yearList}
                            label="year"
                            onChange={handleChange}
                        >
                            {
                                yearList && yearList.map(ite => (
                                    <MenuItem value={ite}>{ite}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
            }
            {
                data &&
                <AreaChart
                    width={1300}
                    height={600}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Profit" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            }
        </Stack>
    )
}
export default RevenuePage;