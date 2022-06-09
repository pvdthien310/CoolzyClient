import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepLabel from '@mui/material/StepLabel';
import OrderManager from '../../containers/order';
import { useDispatch } from 'react-redux';
import { updateOrder } from '../../redux/slices/orderSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const steps = ['Preparing', 'Shipping', 'Delivered'];

const OrderStepper = (props) => {
    const [activeStep, setActiveStep] = React.useState(0);

    // const dispatch = useDispatch()

    React.useEffect(() => {
        let t = false
        const setActive = () => {
            if (props.stepString === "preparing") {
                setActiveStep(1)
            } else if (props.stepString === "shipping") {
                setActiveStep(2)
            } else {
                setActiveStep(3)
            }
        }
        if (t === false) {
            setActive()
            t = true
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* <div>
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep !== steps.length ? (
                            <Button onClick={handleDoneStep} sx={{ fontSize: '9px' }} >
                                Done
                            </Button>
                        ) : (
                            null
                        )}
                    </Box>
                </React.Fragment>
            </div> */}
        </Box>
    );
}

export default OrderStepper;
