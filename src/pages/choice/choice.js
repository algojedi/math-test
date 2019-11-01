import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';
import './choice.css';
import { ADD, SUBTRACT, MIXED, MULTIPLY, DIVIDE } from './../../components/constants'

const Choice = ({ selected }) => {
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
                <CustomButton large={true} onClick={() => sendSelection(MIXED)}>
                    Mixed
                </CustomButton>
                <CustomButton large={true} onClick={() => sendSelection(MULTIPLY)}>
                    Subtraction
                </CustomButton>
                <CustomButton large={true} onClick={() => sendSelection(DIVIDE)}>
                    Division
                </CustomButton>
            </div>

     );
}
 
export default Choice;