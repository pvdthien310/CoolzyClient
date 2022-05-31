import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, currentListItem } from "../../redux/selectors";
import { unwrapResult } from "@reduxjs/toolkit";
import emailApi from "../../api/emailAPI";

import { Dialog, Button } from "@mui/material";
import { DialogTitle } from "@mui/material";
// import { deleteCartById } from "../../redux/slices/cartSlice";
import { useNavigate } from 'react-router-dom';
import { addOrder } from './../../redux/slices/orderSlice';

export default function Paypal({ data, purchases }) {
    console.log(data)
    const _currentUser = useSelector(currentUser)
    const _currentListItem = useSelector(currentListItem)
    const dispatch = useDispatch()
    const paypal = useRef();
    const navigate = useNavigate()

    const [paidSuccessfully, setPaidSuccessfully] = useState(false)

    const handleCloseDialog = async () => {
        setPaidSuccessfully(false)

        let stringOrder = ''

        _currentListItem.forEach((item) => {
            stringOrder += "\n"
            stringOrder += item.product.name + "\n"
                + "\n- Size: " + item.size +
                +"- Quantity: " + item.quantity
                + "\n- Price: " + item.price + " USD"
                + "\n- Total: " + item.total + "USD"
            stringOrder += "\n"
        })

        emailApi.sendEmail({
            to: data.email,
            subject: "Your order information",
            text: "Thank for placing order in ComeBuy site. \n" +
                "Your order: \n" +
                `Name: ${data.name} \n` +
                `Phone: ${data.phoneNumber} \n` +
                `COD Address: ${data.address}` + "\n" +
                "-------------------------------------------------------- \n" +
                stringOrder + "\n" +
                "-------------------------------------------------------- \n" +
                `Total: ${getTotal()} USD` + "\n" +
                "-------------------------------------------------------- \n" +
                "Any wondered things. Please contact with our shop with contact below site: ComeBuy.com"
        }).then(data => {
        })
            .catch(err => console.log(err))
        setPaidSuccessfully(false)
        navigate('/')
    }

    const getTotal = () => {
        let temp = 0
        for (let i = 0; i < purchases.length; i++) {
            temp = temp + Number(purchases[i].amount.value)
        }
        return temp
    }

    const makeOrder = async() => {
        try {
            const resultAction = await dispatch(addOrder(data))
            const originalPromiseResult = unwrapResult(resultAction)
        } catch (rejectedValueOrSerializedError) {
            alert(rejectedValueOrSerializedError);
        }
    }

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: purchases,
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    await makeOrder()
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
            {/* {console.log(cartList)}
        {console.log(prodList)}
        {console.log(purchases)} */}
            <Dialog open={paidSuccessfully}>
                <DialogTitle color='success'>Paid Successfully. Click OK to back to Main Page</DialogTitle>
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