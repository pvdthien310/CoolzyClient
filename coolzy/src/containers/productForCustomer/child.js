import React, { useEffect, useState } from 'react';
import categoryApi from '../../api/categoryAPI';

import { useNavigate, useParams } from 'react-router-dom';
import clothesApi from '../../api/clothesAPI';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import Loading from '../../components/Loading/loading';


const ListBrand = () => {
    const [data, setData] = useState()
    let navigate = useNavigate();
    const { categoryId } = useParams();

    useEffect(() => {
        categoryApi.getAll().then(res => {
            if (res.status == 200) {
                setData(res.data)
            }
        })
    }, [])

    return (
        <div className='listBrand'>
            <p style={categoryId == 'all' ? { cursor: 'pointer', textDecoration: 'underline' } : { cursor: 'pointer' }} onClick={() => navigate(`/product/all`)}>All</p>
            {data &&
                data.map((item, i) => (
                    <p key={i} style={categoryId == item._id ? { cursor: 'pointer', textDecoration: 'underline' } : { cursor: 'pointer' }} onClick={() => navigate(`/product/${item._id}`)}>
                        {item.name}
                    </p>
                ))
            }
        </div>
    )
}


const ProductList = ({ categoryId }) => {
    const [data, setData] = useState()

    useEffect(() => {
        if (categoryId == 'all') {
            clothesApi.getAll().then(res => {
                if (res.status == 200) {
                    let result = res.data.filter(e => e.isAvailable == true && e.published == true)
                    setData(result)
                }
            })
        }
        else {
            clothesApi.getByCategoryId(categoryId).then(res => {
                if (res.status == 200) {
                    setData(res.data.filter(e => e.isAvailable == true && e.published == true))
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
                                <ProductItem item={item} categoryId={categoryId} />
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
    '&:hover': {
        backgroundColor: '#F2DDD0',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        opacity: '80%',
        textAlign: 'end',
    }
}));

const ProductItem = ({ item }) => {
    const navigate = useNavigate()
    const clickHandle = () => {
        navigate('/productDetail/' + item._categoryId + '/' + item._id)
    }

    let sizeLength = item.size.filter(e => e.quantity != 0)

    return (
        <Stack sx={{ cursor: 'pointer' }} onClick={() => clickHandle()}>
            <img src={item.images[0]} alt='' />
            <Typography sx={{ color: '#272727' }} fontWeight={'bold'}>{item.name}</Typography>
            <Typography sx={{ color: '#a6a6a6' }}>{item.brand}</Typography>
            <Typography sx={{ color: '#a6a6a6' }}>{sizeLength.length} SIZE</Typography>
            <Typography sx={{ color: '#272727' }}>{item.price} USD</Typography>
        </Stack>
    )
}



export { ListBrand, ProductList }
