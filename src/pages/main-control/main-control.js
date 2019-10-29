import React, { Component } from 'react';
import Choice from './../choice/choice';
import Main from './../main-pg/main';


class MainControl extends Component {
    state = { operator: 'ADD' }
    render() { 
        return ( 
            <div>
                <Choice/>
                <Main/>
            </div>
         );
    }
}
 
export default MainControl;