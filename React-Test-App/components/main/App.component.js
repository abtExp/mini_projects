import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        if(this.props.state === 'online')
        return(
            <div>
                <h1>Hi</h1>
            </div>
        )
    else return(<div><h1>Looks like you're offline</h1></div>)
    }
}