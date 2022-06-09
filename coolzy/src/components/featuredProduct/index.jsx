import { React, useEffect, useState } from 'react';
import './styles.css'

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import homePageAssetApi from '../../api/homePageAssetAPI';
import clothesApi from '../../api/clothesAPI';

const FeaturedProduct = () => {
    const [data, setData] = useState(null)
    useEffect(async () => {
        const getListHomeProduct = async () => {
            await homePageAssetApi.getAll()
                .then(async (res) => {
                    let products = [];
                    let count = 0;
                    console.log(res.data.listFeaturedProduct)
                    await res.data.listFeaturedProduct.map(async (item, i) => {
                        await clothesApi.getById(item)
                            .then(result_1 => {
                                products.push(result_1.data)
                                if (products.length == res.data.listFeaturedProduct.length) {
                                    setData(products.filter(ite => ite != null))
                                }
                            })
                            .catch((err) => console(err))
                    })

                })
                .catch(err => console.log(err))
        }
        await getListHomeProduct()

    }, [])
    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="branch__container">
            {
                data && data.map((item, i) => (
                    <ProductItem key={i} item={item} index={i} />
                ))
            }
        </div>
    )
}

const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 50px',
    margin: '15px 0px',
    borderRadius: '10px'

}));

const ProductItem = props => {
    const item = props.item
    const {index} = props
    return (
        <div>
            {index % 2 == 0 ?
                <div className='branch__item__container'>
                    <img className='branch__item__content__poster' src={item.images[0]} alt='' />

                    <div className='branch__item__content__info'>
                        <h2>{item.name}</h2>
                        <p>{item.price} USD</p>
                        <p>{item.description}</p>
                        <CustomButton > Detail</CustomButton>
                    </div>
                </div>
                :
                <div className='branch__item__container'>
                    <div className='branch__item__content__info'>
                    <h2>{item.name}</h2>
                        <p>{item.price} USD</p>
                        <p>{item.description}</p>

                        <CustomButton > Detail</CustomButton>
                    </div>

                    <img className='branch__item__content__poster' src={item.images[0]} alt='' />

                </div>
            }
        </div>


    )
}
export default FeaturedProduct
