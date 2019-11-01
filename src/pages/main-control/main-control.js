import React, { Component } from 'react';
import Choice from './../choice/choice';
import Level from './../level/level';
import Main from './../main-pg/main';
import { ADD, EASY } from './../../components/constants';


class MainControl extends Component {
    state = {   operator: ADD,
                opSelectionMade: false,
                level: EASY,
                levelSelectionMade: false}

    opSelected = selection => {
        this.setState({ operator : selection,
                        opSelectionMade : true
        })
    }

    levelSelected = selection => {
        this.setState({
            level: selection,
            levelSelectionMade: true
        })
    }
    render() { 
        return ( 
            <div>
                {this.state.opSelectionMade ? 
                    this.state.levelSelectionMade ? 
                    <Main operator={this.state.operator} /> : 
                    <Level selected={this.levelSelected} /> :
                    <Choice selected={this.opSelected} />
                }
            </div>
         );
    }
}
 
export default MainControl;