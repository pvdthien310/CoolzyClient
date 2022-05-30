import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import clothesApi from '../../api/clothesAPI';

const OrderItemCard = (props) => {
    const { item } = props
    const [product, setProduct] = useState(null)
    useEffect(() => {
        async function LoadItem() {
            const result = await clothesApi.getById(item._itemid)
            if (result.status == 200) {
                setProduct(result.data)
            }
            else {
                console.log(result)
            }
        }
        console.log(item)
        LoadItem()
        return () => {
            setProduct(null)
        }
    }, [item._itemid])

    return (
        <Card sx={{ width: '100%', m: 2, p: 2 }}>
            <CardActionArea>
                {
                    product &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0]}
                        alt="green iguana"
                    />
                }
                <CardContent>
                    {
                        product &&
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                    }
                    <Typography variant="body2" color="text.secondary" sx={{p:1}}>
                        Size : {item.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{p:1}}>
                       Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1" color="success" sx={{p:1}} fontWeight={'bold'}>
                        Total: {item.total}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default OrderItemCard;