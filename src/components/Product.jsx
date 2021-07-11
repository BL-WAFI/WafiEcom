import React from 'react'
import {Card,CardMedia,CardContent,CardActions ,Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons'
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
    backgroundSize:'contain'
  },
  media: {
    height: 10,
paddingTop: '56.25%', // 16:9
backgroundSize:'contain',

  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addshopicon:{
    color: green[500],
    '&:hover': {
      color: "#f00",
   },
  }
  
}));

const Product = ({product , onAddToCart}) => {
    const classes=useStyles();
  
    return (

        <Card className={classes.root}>
          
          <CardMedia className={classes.media}  image={product.media.source} title={product.name} />
          <CardContent>
                        <div className={classes.cardContent}>
                                  <Typography variant='h5' gutterBottom>
                                  {product.name} 
                                  </Typography>
                                  <Typography variant='h5' >
                                  {product.price.formatted_with_symbol} 
                                  </Typography>
                        </div>

                    <Typography  dangerouslySetInnerHTML={{__html:product.description}} variant='body2' color='textSecondary'/>
                      
          </CardContent>

          <CardActions disableSpacing className={classes.CardActions}>
                      <IconButton aria-label='Add to Cart' onClick={()=> onAddToCart(product.id, 1)}>
                          <AddShoppingCart className={classes.addshopicon} />
                      </IconButton>
          </CardActions>
        </Card>
    )
}

export default Product
