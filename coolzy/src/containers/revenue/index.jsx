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

const data1 = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const RevenuePage = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function LoadData() {
            const result = await invoiceAPI.getAll()
            let result2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            if (result) {
                await result.map(ite => {
                    const newDate = new Date(ite.date)
                    result2[newDate.getMonth() - 1] = result2[newDate.getMonth() - 1] + ite.total
                })
                let revenue = []
                await result2.map((ite, i) => {
                    revenue.push({
                        name: i + 1,
                        Profit: ite / 1000
                    })
                })
                console.log(result2)
                console.log(revenue)
                setData(revenue)
            }
            else console.log('error')
        }
        LoadData()
    }, [])
    return (
        <Stack sx={{ width: ' 100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
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