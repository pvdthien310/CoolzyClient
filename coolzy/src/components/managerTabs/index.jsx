import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StaffManager from '../../containers/staff';
import OrderManager from '../../containers/order';
import ProductManager from '../../containers/product';

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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
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

                </Tabs>
            </Box>
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

        </Box>
    );
}