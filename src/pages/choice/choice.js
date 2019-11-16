import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';
import './choice.css';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from './../../components/constants';
import { useSpring, animated } from 'react-spring';

const OperatorChoice = ({ selected }) => {
    
    const slideIn = useSpring({
        from: {
            transform: 'translateX(-200px)', opacity: 0
        },
        to: {
            transform: 'translateX(0px)', opacity: 1
        } 

    })
    return ( 
            <div id="choice-wrapper">
                <animated.div style={slideIn}>
                    <CustomButton large={true} onClick={() => selected(ADD) }>
                        Addition
                    </CustomButton>
                </animated.div>
                <animated.div style={slideIn}>
                    <CustomButton large={true} onClick={() => selected(SUBTRACT)}>
                        Subtraction
                    </CustomButton>
                </animated.div>
                <animated.div style={slideIn}>
                    <CustomButton large={true} onClick={() => selected(MULTIPLY)}>
                        Multiplication
                    </CustomButton>
                </animated.div>
                <animated.div style={slideIn}>
                    <CustomButton large={true} onClick={() => selected(DIVIDE)}>
                        Division
                    </CustomButton>
                </animated.div>
            </div>

     );
}
 
export default OperatorChoice;