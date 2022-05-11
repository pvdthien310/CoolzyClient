import { Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import './styles.css'

const AddProduct = () => {
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
    ];
    return (
        <Grid container spacing={2} columns={10}>

            <Grid item xs={6} >
                <Item>
                    <ProductImages />
                </Item>

            </Grid>

            <Grid item xs={4} >
                <Item>
                    <Stack>
                        <TextField label="Name" variant="standard" />
                        <TextField label="Brand" variant="standard" />
                        <TextField label="Price" variant="standard" />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} variant="standard" label="Category" />}
                        />

                        <TextField label="Description" variant="standard" />

                        <AmountSize />
                    </Stack>

                </Item>
            </Grid>
        </Grid>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'start',
    margin: 5
}));

const ProductImages = (imgList) => {
    return (
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide>
                <Stack >
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>

            <SwiperSlide>
                <Stack>
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>

            <SwiperSlide>
                <Stack>
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>

            <SwiperSlide>
                <Stack>
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>
        </Swiper>
    )
}

const AmountSize = () => {
    return (
        <Stack></Stack>
    )
}
export default AddProduct;