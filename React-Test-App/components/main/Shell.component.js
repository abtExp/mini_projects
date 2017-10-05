import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

import Header from '../inner/Header.component';
import App from './App.component'
import Footer from '../inner/Footer.component';

let rese = '';

class Shell extends React.Component {
    constructor() {
        super();
        this.state = {
            state: 'offline'
        }
    }

    componentWillMount() {
        fetch('https://api.github.com/users/abtExp/repos')
            .then(res => {
                if (res.status === 200){
                    rese = 'online';
                    setTimeout(this.setState({
                        state : rese
                    }),5000);
                }
            })
    }

    render() {
            return ( <div>
                <Header state = { this.state.state }/>
                <App state = { this.state.state } />
                <Footer state = { this.state.state }/> 
                </div>
            )
    }
}

const div = document.getElementById('app-shell');
ReactDOM.render(<Shell/>,div);