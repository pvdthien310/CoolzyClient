import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';

const OrderCard = (props) => {
    const { order } = props
    return (
        <Card sx={{ width: '100%', height: 200, p: 2, m: 1 }}>
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
                            {order._id}
                        </Typography>
                        <Typography variant="body2" color="error">
                            {order.status}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {order.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {order.address}
                    </Typography>
                    <Typography variant="body2" color="success" fontWeight={'bold'}>
                        {order.phone}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default OrderCard;