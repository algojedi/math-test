import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';
import './choice.css';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from './../../components/constants'

const OperatorChoice = ({ selected }) => {
    const sendSelection = selection => {
        selected(selection);
    }
    return ( 
            <div id="choice-wrapper">
                <CustomButton large={true} onClick={() => sendSelection(ADD) }>
                    Addition
                </CustomButton>
                <CustomButton large={true} onClick={() => sendSelection(SUBTRACT)}>
                    Subtraction
                </CustomButton>
                <CustomButton large={true} onClick={() => sendSelection(MULTIPLY)}>
                    Multiplication
                </CustomButton>
                <CustomButton large={true} onClick={() => sendSelection(DIVIDE)}>
                    Division
                </CustomButton>
                
            </div>

     );
}
 
export default OperatorChoice;