import React from 'react';
import CustomButton from './../../components/custom-button/custom-button.component';
import './level.css';
import { EASY, MEDIUM, HARD } from './../../components/constants';
import { useSpring, animated } from 'react-spring';


const Level = ({ selected }) => {
    const slideIn = useSpring({
        from: {
            transform: 'translateX(-200px)', opacity: 0
        },
        to: {
            transform: 'translateX(0px)', opacity: 1
        }
    })
   
    return (

        <div id="level-wrapper">

            <animated.div style={slideIn}>
                <CustomButton large={true} onClick={() => selected(EASY)}>
                    Easy
                </CustomButton>
            </animated.div>

            <animated.div style={slideIn}>
                <CustomButton large={true} onClick={() => selected(MEDIUM)}>
                    Medium
                </CustomButton>
            </animated.div>

            <animated.div style={slideIn}>
                <CustomButton large={true} onClick={() => selected(HARD)}>
                    Hard
                </CustomButton>
            </animated.div>

        </div>
    );
}

export default Level;