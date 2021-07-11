import React,{ useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button ,CssBaseline} from '@material-ui/core';
import useStyles from './styles'
import { Link,useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
const steps = ['Shipping address', 'Payment details'];
const Checkout=({cart,order,onCaptureCheckout,error})=>{ 
  const classes=useStyles();
  const history=useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm  backStep={backStep}
    onCaptureCheckout={onCaptureCheckout}
     shippingData={shippingData} checkoutToken={checkoutToken}
       nextStep={nextStep} timeout={timeout}
     />);
  
let Confirmation=()=>{
  return( 
  <>
  <div>
          <Typography variant="h5">Thank you for your purchase</Typography>
       
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
     )
 }

 

 




useEffect(() => {
  if (cart.id) {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

        setCheckoutToken(token);
      } catch(error) {
      
       history.pushState('/')
      }
    };

    generateToken();
  }
}, [cart]);
const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

const next = (data) => {
  setShippingData(data);

  nextStep();
};
const timeout=()=>{
  setTimeout(()=>{
    setIsFinished(true);
  },3000)
}
  return (
    <>
     <CssBaseline/>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        {activeStep === steps.length ? <Confirmation /> :checkoutToken && <Form />  }
        </Paper>
      </main>
    </>
  );
}; 

export default Checkout;