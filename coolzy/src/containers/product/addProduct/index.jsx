import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const AddProduct = () => {
    return (
        <Grid container spacing={2} columns={10}>
            <Grid item xs={5} >
                <Item>
                    abc
                </Item>

                <Item>
                    abc
                </Item>
            </Grid>

            <Grid item xs={5} >
                <Item>
                    abc
                </Item>

                <Item>
                    abc
                </Item>
            </Grid>
        </Grid>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
}));

export default AddProduct;