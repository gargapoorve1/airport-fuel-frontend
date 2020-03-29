import React, { Component } from 'react';
import './Auth.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import AuthContext from '../context/auth-context';


class AuthPage extends Component {

    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.nameEl = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault()
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestbody = {
            email: email,
            password: password
        }

        if (!this.state.isLogin) {
            const name = this.nameEl.current.value;
            requestbody = {
                email: email,
                password: password,
                name: name
            }
        }

        fetch(`http://localhost:8000/auth/${this.state.isLogin ? 'signin' : 'signup'}`, {
            method: 'POST',
            body: JSON.stringify(requestbody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                res.json().then(err => toast.error(err.message))
                throw new Error('Failed!!')
            }
            return res.json()
        })
            .then((resData) => {
                if (resData.token) {
                    this.context.login(resData.token, resData.userId)
                }
            })
            .catch(err => {
                console.log("1", err);
            })
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin }
        })
    }

    render() {
        let signUpName = ''
        if (!this.state.isLogin) {
            signUpName = (
                <Input type="text" id="name" label="Name" placeholder="Enter Name" refel={this.nameEl} />
            );
        }
        return (
            <React.Fragment>
                <form className="auth-form">
                    <div>
                        {signUpName}
                        <Input type="email" id="email" label="Email" placeholder="Enter Email" refel={this.emailEl} />
                        <Input type="password" id="password" placeholder="Enter Password" label="Password" refel={this.passwordEl} />
                    </div>
                    <div className="button-center">
                        <Button clicked={this.submitHandler}>Submit</Button>
                        <Button clicked={this.switchModeHandler}>Want to {this.state.isLogin ? 'SignUp' : 'SignIn'} ?</Button>
                    </div>
                </form>
                <ToastContainer />
            </React.Fragment>
        );
    }
}

export default AuthPage;