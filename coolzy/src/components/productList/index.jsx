import React, { useEffect, useState } from 'react';
import clothesApi from '../../api/clothesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'
import Loading from './../loading/loading';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

const ProductList = ({ categoryId }) => {
    const [data, setData] = useState()


    useEffect(() => {
        if (categoryId == 'all') {
            clothesApi.getAll().then(res => {
                if (res.status == 200) {
                    setData(res.data)
                }
            })
        }
        else {
            clothesApi.getByCategoryId(categoryId).then(res => {
                if (res.status == 200) {
                    setData(res.data)
                }
            })
        }

    }, [categoryId])
    return (
        <div className='productDisplay'>
            <Grid container spacing={2} columns={15}>
                {data ?
                    data.map((item, i) => (
                        <Grid item xs={5} key={i}>
                            <Item>
                                <ProductItem item={item} />
                            </Item>
                        </Grid>
                    ))
                    :
                    <Loading />
                }
            </Grid>
        </div>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
}));

const ProductItem = ({ item }) => {

    return (
        <Stack>
            <img src={item.images[0]} alt='' />
            <Typography sx={{ color: '#272727' }}>{item.name}</Typography>
            <Typography sx={{ color: '#a6a6a6' }}>{item.brand}</Typography>
            <Typography sx={{ color: '#a6a6a6' }}>{item.size.length} SIZE</Typography>
            <Typography sx={{ color: '#272727' }}>{item.price} VNĐ</Typography>
        </Stack>
    )
}
export default ProductList
