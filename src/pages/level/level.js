import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';
import './level.css';
import { EASY, MEDIUM, HARD } from './../../components/constants'

const Level = ({ selected }) => {
    
    const sendSelection = selection => {
        selected(selection);
    }
    return (


        <div id="level-wrapper">
            <CustomButton large={true} onClick={() => sendSelection(EASY)}>
                Easy
                </CustomButton>
            <CustomButton large={true} onClick={() => sendSelection(MEDIUM)}>
                Medium
                </CustomButton>
            <CustomButton large={true} onClick={() => sendSelection(HARD)}>
                Hard
                </CustomButton>
           
        </div>

    );
}

export default Level;