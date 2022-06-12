import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, currentListItem, isOrderFromCart } from "../../redux/selectors";
import { unwrapResult } from "@reduxjs/toolkit";
import emailApi from "../../api/emailAPI";

import { Dialog, Button } from "@mui/material";
import { DialogTitle } from "@mui/material";
import {accountSlice} from '../../redux/slices/accountSlices'
import accountApi from "../../api/accountAPI";
import { useNavigate } from 'react-router-dom';
import { addOrder } from './../../redux/slices/orderSlice';
import { updateClothesWithID } from './../../redux/slices/clothSlice'

export default function Paypal({ data, purchases }) {
     console.log(purchases)
    const _isFromCart = useSelector(isOrderFromCart)
    const _currentUser = useSelector(currentUser)
    const _currentListItem = useSelector(currentListItem)
    const dispatch = useDispatch()
    const paypal = useRef();
    const navigate = useNavigate()
    const [currentOrder, setCurrentOrder]= useState({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        items: data.items,
        total: data.total, 
        status: data.status,
        method: "Paypal"
    })

    const [paidSuccessfully, setPaidSuccessfully] = useState(false)

    const handleCloseDialog = async () => {
        setPaidSuccessfully(false)

        let stringOrder = ''

        _currentListItem.forEach((item) => {
            stringOrder += "\n"
            stringOrder += item.product.name + "\n"
                + "\n- Size: " + item.size
                + "- Quantity: " + item.quantity
                + "\n- Price: " + item.product.price + " USD"
                + "\n- Total: " + item.total + "USD"
            stringOrder += "\n"
        })

        emailApi.sendVerify({
            to: data.email,
            subject: "Your order information",
            text: "Thank for placing an order in Coolzy site. \n" +
                "Your order: \n" +
                `Name: ${data.name} \n` +
                `Phone: ${data.phone} \n` +
                `COD Address: ${data.address}` + "\n" +
                "-------------------------------------------------------- \n" +
                stringOrder + "\n" +
                "-------------------------------------------------------- \n" +
                `Ship: 2 USD` + "\n" +
                `Total: ${getTotal() + 2} USD` + "\n" +
                "-------------------------------------------------------- \n" +
                "Any wondered things. Please contact with our shop with contact below site: coolzy.com"
        }).then(data => {
        })
            .catch(err => console.log(err))
        setPaidSuccessfully(false)
        navigate('/history')
    }

    const getTotal = () => {
        let temp = 0
        for (let i = 0; i < purchases.length; i++) {
            temp = temp + Number(purchases[i].unit_amount.value)
        }
        return temp
    }

    const makeOrder = async () => {
        try {
            const resultAction = await dispatch(addOrder(currentOrder))
            const originalPromiseResult = unwrapResult(resultAction)
        } catch (rejectedValueOrSerializedError) {
            alert(rejectedValueOrSerializedError);
        }
    }

    const subtractQuantity = async () => {
        //redux
        let newList = []
        _currentListItem.forEach((item) => {
            let product = item.product
            let listProductSize = product.size
            let _newListProductSize = []

            for (let i = 0; i < listProductSize.length; i++) {
                if (listProductSize[i].size == item.size) {
                    let size = {
                        size: item.size,
                        quantity: listProductSize[i].quantity - item.quantity
                    }
                    _newListProductSize.push(size)
                }
                else
                    _newListProductSize.push(listProductSize[i])
            }

            newList.push({
                ...product,
                size: _newListProductSize
            })

        })

        console.log(newList)

        newList.forEach(async (product) => {
            try {
                const resultAction = await dispatch(updateClothesWithID(product))
                const originalPromiseResult = unwrapResult(resultAction)
                setPaidSuccessfully(true)
            } catch (rejectedValueOrSerializedError) {
                alert(rejectedValueOrSerializedError);
            }
        })

    }

    const updateCart = async () => {
        dispatch(accountSlice.actions.update({
            ..._currentUser,
            listCarts: []
        }))

        await accountApi.updateAccount({
            ..._currentUser,
            listCarts: []
        })
            .then((res) => {
                navigate('/history')
            })
            .catch((error) => {

            })
    }

   
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value: getTotal() +2, //total+ 2,
                                    breakdown: { 
                                        item_total: { 
                                            currency_code: 'USD',
                                            value: getTotal()
                                        },

                                        shipping: { 
                                            currency_code: 'USD',
                                            value: 2
                                        }
                                    },       
                                },
                                items: purchases
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    await makeOrder()
                    await subtractQuantity()
                    if (_isFromCart)
                        await updateCart()
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
            <Dialog open={paidSuccessfully}>
                <DialogTitle >Paid Successfully</DialogTitle>
                <Button
                    onClick={handleCloseDialog}
                    style={{
                        alignSelf: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '15px',
                        border: '1px solid black',
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '13px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        padding: '12px 45px',
                    }}
                >
                    OK
                </Button>
            </Dialog>
        </div>
    );
}