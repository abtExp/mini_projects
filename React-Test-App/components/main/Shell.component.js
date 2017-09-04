import { React, ReactDOM } from 'react';
import { Router, Route, Link } from 'react-router';

import Header from '../inner/Header.component';
import App from './App.component'
import Footer from '../inner/Footer.component';

class Shell extends React.Component {
    constructor() {
        super();
        this.state = {
            state: 'offline'
        }
    }

    componentWillMount(){
        fetch('https://api.github.io/users/abtExp/repos')
        .then(res=>{
            if(res.status === 200) this.setState({
                state : 'online'
            })
        })
    }

    render(){
        if(this.state.state === 'online'){
            return(
                <div>
                    <Header state={this.state.state} />
                    <App state={this.state.state}>
                        <img src='logged_off.png' />
                    </App>
                    <Footer state={this.state.state}/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Header state={this.state.state} />
                    <App state={state}>
                        <CardLoader />
                    </App>
                    <Footer state={this.state.state}/>
                </div>
            )
        }
    }
}