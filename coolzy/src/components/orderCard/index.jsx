import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const OrderCard = (props) => {
    const {order} = props
    return (
        <Card sx={{ maxWidth: 345, p: 2, m: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1521459382675-a3f2f35a6b9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        {order._id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {order.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {order.phone}
                    </Typography>
                    <Typography variant="body2" color="error">
                       {order.status}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => props.handleChooseItem(order)}>
                    Show
                </Button>
            </CardActions>
        </Card>
    );
}
export default OrderCard;