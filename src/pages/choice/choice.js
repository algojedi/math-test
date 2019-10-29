import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';
import './choice.css';

const Choice = () => {
    return ( 
        
           
            <div id="choice-wrapper">
                <CustomButton>
                    Addition
                </CustomButton>
                <CustomButton>
                    Subtraction
                </CustomButton>
                <CustomButton>
                    Mixed
                </CustomButton>
            </div>

      


     );
}
 
export default Choice;