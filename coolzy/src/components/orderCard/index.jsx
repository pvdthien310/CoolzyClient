import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import OrderStepper from './../stepperOrderStatus/index';

const OrderCard = (props) => {
    const { order } = props

    return (
        <Card sx={{ width: '100%', height: "auto", minHeight: 210, p: 2, m: 1 }}>
            <CardActionArea onClick={() => props.handleChooseItem(order)}>
                <CardMedia
                    component="img"
                    height="50"
                    image="https://images.unsplash.com/photo-1521459382675-a3f2f35a6b9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                    alt="green iguana"
                />
                <CardContent>
                    <Stack sx={{ width: '100%', justifyContent: 'space-between' }} direction={'row'}>
                        <Typography gutterBottom variant="body1" component="div">
                            #️{order._id}
                        </Typography>
                        <OrderStepper stepString={order.status} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {order.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Payment: {order.method}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Delivered address: {order.address}
                    </Typography>
                    <Typography variant="body2" color="success" fontWeight={'bold'}>
                        Phone: {order.phone}
                    </Typography>

                </CardContent>
            </CardActionArea>
            {order.status != "shipped" && order.status != "shipping" && order.method != "Paypal" ? (
                <Stack width="100%" sx={{ mt: 1 }}>
                    <Button onClick={() => props.handleCancelOrder(order)} sx={{ alignSelf: 'flex-end', fontSize: '10px' }} variant="outlined" color="error">
                        Cancel order
                    </Button>
                </Stack>
            ) : (
                null
            )}

        </Card>
    );
}
export default OrderCard;