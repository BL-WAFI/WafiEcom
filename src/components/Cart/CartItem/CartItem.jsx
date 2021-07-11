import React from 'react'
import { Typography, Card,CardMedia,CardContent,CardActions, Button} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({item,onUpdate, onRemoveFromCart}) => {
    const classes=useStyles();
    const handleUpdate = (lineItemId, newQuantity) => onUpdate(lineItemId, newQuantity);
    const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
    return (
        <Card >
            <CardMedia image={item.media.source}  alt='' className={classes.media} />
      
            <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdate(item.id, item.quantity - 1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdate(item.id, item.quantity + 1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
        </Card> 
    )
}

export default CartItem
