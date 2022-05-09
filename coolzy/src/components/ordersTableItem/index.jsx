import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import { getClothesWithID } from "../../redux/slices/clothSlice"

export default function TableOrderItem({ list, total }) {

    const [listProduct, setListProduct] = useState([])

    const dispatch = useDispatch()
    const fetchListProduct = async () => {
        let listTemp = []
        for (let i = 0; i < list.length; i++) {

            const resultAction = await dispatch(getClothesWithID(list[i]._itemid))
            const originalPromiseResult = unwrapResult(resultAction)
            // handle result here
            listTemp = [...listTemp, originalPromiseResult]
        }
        setListProduct(listTemp)
        setReady(true)
    }
    const [ready, setReady] = useState(false)
    useEffect(async () => {
        if (ready === false) {
            fetchListProduct()
        }
    }, [ready])

    return (
        <>
            <table width="100%" style={{ marginLeft: '1.5rem', marginTop: '1.5rem' }}>
                <thead>
                    <tr style={{ marginRight: '2rem' }}>
                        <td style={{ letterSpacing: '0.1rem', fontSize: '14px', color: 'gray' }}>Description</td>
                        <td style={{ letterSpacing: '0.1rem', fontSize: '14px', color: 'gray' }}>Quantity</td>
                        <td style={{ letterSpacing: '0.1rem', fontSize: '14px', color: 'gray' }}>Price</td>
                        <td style={{ letterSpacing: '0.1rem', fontSize: '14px', color: 'gray' }}>Amount</td>
                    </tr>
                </thead>
                {listProduct.map((p) => (
                    <React.Fragment>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: '13px', color: 'black' }}>{p.name}</td>
                                {
                                    list.map((i) => (
                                        p._id === i._itemid ? (
                                            <td style={{ fontFamily: 'serif', display: 'flex', justifyContent: 'center', fontSize: '13px', color: 'black' }}>{i.quantity}</td>
                                        ) : (
                                            null
                                        )
                                    ))
                                }
                                <td style={{ fontFamily: 'serif', width: 'auto', color: 'black' }}>💸{p.price}</td>
                                {
                                    list.map((i) => (
                                        p._id === i._itemid ? (
                                            <td style={{ fontFamily: 'serif', color: 'black' }}>💸{i.total}</td>
                                        ) : (
                                            null
                                        )
                                    ))
                                }
                            </tr>
                        </tbody>
                    </React.Fragment>
                ))}
            </table>

            <div>
                <h2 style={{ display: 'flex', color: 'black', justifyContent: 'flex-end', justifyItems: 'flex-end', fontWeight: 'bold', fontFamily: 'serif' }}>
                    Total cost. {total} USD
                </h2>
            </div>
        </>
    )
}