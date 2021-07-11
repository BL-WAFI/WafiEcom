import React from 'react'
import { AppBar,Toolbar,IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import { Link , useLocation} from 'react-router-dom';
import useStyles from './styles'
const Navbar = ({totalItems}) => {
     const classes = useStyles(); 
     const location = useLocation();
    return (
        <>
          <AppBar position='fixed' className={classes.appBar} color='inherit'>
<Toolbar>
    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
        <img src='https://media.glassdoor.com/sql/516683/wafi-squarelogo-1541068243569.png' alt='commerce.js' height='25px'  className={classes.image} />
    WafiEcom
    </Typography>
    <div className={classes.grow} />
    {location.pathname === '/'? (  
    <div className={classes.button}>
        <IconButton component={Link} to='/cart' aria-label='Cart items' color='inherit'>
                        <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart/>
                        </Badge>
             
        </IconButton>
    </div>
    ) : null}
</Toolbar>
          </AppBar>  
        </>
    )
}

export default Navbar
