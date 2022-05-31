import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StaffManager from '../../containers/staff';
import OrderManager from '../../containers/order';
import ProductManager from '../../containers/product';
import { Route, Routes, useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import RevenuePage from '../../containers/revenue';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>{children}</Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ManagerTabs(props) {
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue == 0) {
            navigate('/manager/order')
        }
        else if (newValue == 1) {
            navigate('/manager/product/all')
        }
        else if (newValue == 2) {
            navigate('/manager/staff')
        }
        else if (newValue == 3) {
            navigate('/manager/revenue')
        }
    };

    const tabTheme = createTheme({
        palette: {
            primary: {
                main: '#272727'
            },
        },
    })

    useEffect(() => {
        let path = window.location.pathname

        if (path.includes('manager/product')) {
            setValue(1)
        }
        else if (path.includes('manager/staff')) {
            setValue(2)
        }
        else if (path.includes('manager/revenue')) {
            setValue(3)
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <ThemeProvider theme={tabTheme}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Order" {...a11yProps(0)} />
                        {
                            props.role == 'Admin' &&
                            <Tab label="Product" {...a11yProps(1)} />
                        }
                        {
                            props.role == 'Admin' &&
                            <Tab label="Staff" {...a11yProps(2)} />
                        }
                        {
                            props.role == 'Admin' &&
                            <Tab label="Revenue" {...a11yProps(3)} />
                        }

                    </Tabs>
                </Box>
            </ThemeProvider>

            <TabPanel value={value} index={0}>
                <OrderManager />
            </TabPanel>
            {
                props.role == 'Admin' &&
                <TabPanel value={value} index={1}>
                    <ProductManager />
                </TabPanel>
            }
            {
                props.role == 'Admin' &&
                <TabPanel value={value} index={2}>
                    <StaffManager />
                </TabPanel>
            }
             {
                props.role == 'Admin' &&
                <TabPanel value={value} index={3}>
                    <RevenuePage />
                </TabPanel>
            }

        </Box>
    );
}