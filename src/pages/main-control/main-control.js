import React, { Component } from 'react';
import Choice from './../choice/choice';
import Main from './../main-pg/main';
import { ADD } from './../../components/constants';

class MainControl extends Component {
    state = {   operator: ADD,
                selectionMade: false }

    selected = operatorSelected => {
        this.setState({ operator : operatorSelected,
                        selectionMade : true
        })
    }

    render() { 
        return ( 
            <div>
                {this.state.selectionMade ? 
                    <Main operator={this.state.operator} /> : 
                    <Choice selected={this.selected}/>
                }
            </div>
         );
    }
}
 
export default MainControl;