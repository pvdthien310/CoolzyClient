import { React, useState, useEffect } from 'react';
import ProductHomeSlider from '../productHomeSlider/index'
import categoryApi from './../../api/categoryAPI';
import homePageAssetApi from './../../api/homePageAssetAPI';
import clothesApi from './../../api/clothesAPI';
import { removeDuplicates } from '../../function';
import { Typography, Stack } from '@mui/material';

const Product = () => {
    const [listHomeProduct, setListHomeProduct] = useState([])
    const [listCategoriesId, setListCategoriesId] = useState([])

    useEffect(async () => {
        const getListHomeProduct = async () => {
            await homePageAssetApi.getAll()
                .then(async (res) => {
                    let products = [];
                    let count = 0;
                    console.log(res)
                    await res.data.listProduct.map(async (item, i) => {

                        await clothesApi.getById(item)
                            .then(result_1 => {
                                products.push(result_1.data)
                                count++
                                if (count == res.data.listProduct.length) {
                                    setListHomeProduct(products)
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
        const getCategories = () => {
            let arr = [];
            listHomeProduct.map((item, i) => {

                arr.push(item._categoryId)
            })
            setListCategoriesId(removeDuplicates(arr))
        }
        if (listHomeProduct.length != 0)
            getCategories()
    }, [listHomeProduct])

    return (
        listCategoriesId && listCategoriesId.map((item, i) => {
            //console.log(item)
            return (
                // categoryId && 
                <ProductHomeSlider key={i} categoryId={item} products={listHomeProduct} />
                //<Typography variant="h6">{item}</Typography>
            )
        })
    )
}

export default Product
