import * as React from 'react'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';

const SizeItem = ({ item, sizeChange }) => {
    const handleChange = (val) => {
        sizeChange(item.id, val)
    }
    return (
        <Grid item columns={10} sx={{ alignItems: 'end' }}>
            <Grid item xs={1} >
                <p>{item.name}</p>
            </Grid>

            <Grid item xs={1} >
                <Input
                    placeholder=""
                    type="number"
                    inputProps={{ min: 0 }}
                    sx={{ width: 40 }}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </Grid>



        </Grid>

    )
}

export default SizeItem