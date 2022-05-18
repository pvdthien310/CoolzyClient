import * as React from 'react'
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';

const SizeItem = ({ item, sizeChange }) => {
    const handleChange = (val) => {
        sizeChange(item.id, val)
    }
    return (
        <Grid item columns={10} sx={{ alignItems: 'end' }}>
            <Grid item xs={1} >
                <p>{item.size}</p>
            </Grid>

            <Grid item xs={1} >
                <Input
                    defaultValue={item.quantity}
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