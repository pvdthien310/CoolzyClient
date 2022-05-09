import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Product from '../product';
import Staff from '../../containers/staff';
import Order from '../../containers/order';

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
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
    const [value, setValue] = React.useState(0);
    console.log(props.role)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        props.role == 'Admin' &&
                        <Tab label="Product" {...a11yProps(1)} />
                    }
                    {
                        props.role == 'Admin' &&
                        <Tab label="Staff" {...a11yProps(2)} />
                    }
                    <Tab label="Order" {...a11yProps(0)} />
                </Tabs>
            </Box>
            {
                props.role == 'Admin' &&
                <TabPanel value={value} index={1}>
                    <Product />
                </TabPanel>
            }
            {
                props.role == 'Admin' &&
                <TabPanel value={value} index={2}>
                    <Staff />
                </TabPanel>
            }
            <TabPanel value={value} index={0}>
                <Order />
            </TabPanel>
        </Box>
    );
}