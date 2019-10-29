import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';

const Choice = () => {
    return ( 
        <React.Fragment>
            <CustomButton>
                Addition
            </CustomButton>
            <CustomButton>
                Subtraction
            </CustomButton>
            <CustomButton>
                Mixed
            </CustomButton>

        </React.Fragment>


     );
}
 
export default Choice;