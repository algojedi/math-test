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
                <CustomButton onClick={() => sendSelection(ADD) }>
                    Addition
                </CustomButton>
                <CustomButton onClick={() => sendSelection(SUBTRACT)}>
                    Subtraction
                </CustomButton>
                <CustomButton onClick={() => sendSelection(MIXED)}>
                    Mixed
                </CustomButton>
                <CustomButton onClick={() => sendSelection(MULTIPLY)}>
                    Subtraction
                    </CustomButton>
                <CustomButton onClick={() => sendSelection(DIVIDE)}>
                    Mixed
                </CustomButton>
            </div>

     );
}
 
export default Choice;