import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AirportForm.css'

import Input from '../Input/Input'
import Button from '../Button/Button';
import AirportContext from '../../context/airport';

class AirportForm extends Component {

    state = {
        message: ''
    }

    static contextType = AirportContext

    constructor(props) {
        super(props)
        this.airportNameElRef = React.createRef()
        this.airportFuelCapacityElRef = React.createRef()
    }

    addAirportHandler = () => {
        const airport_name = this.airportNameElRef.current.value;
        const airport_capacity = this.airportFuelCapacityElRef.current.value;

        const requestbody = {
            airport_name: airport_name,
            airport_capacity: airport_capacity,
        }
        fetch(`http://localhost:8000/airport/add`, {
            method: 'POST',
            body: JSON.stringify(requestbody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                res.json().then(err => toast.error(err.message))
                throw new Error('Failed!!')
            }
            return res.json()
        })
            .then((resData) => {
                this.context.fetchairports();
                this.context.closeModal();
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <React.Fragment>
                <AirportContext.Consumer>
                    {(context) => {
                        return (
                            <form>
                                <div>
                                    <Input label="Enter Airport Name" type="text" placeholder="Enter Airport Name" id="airport_name" refel={this.airportNameElRef}></Input>
                                    <Input label="Enter Fuel Capacity" type="text" placeholder="Enter Fuel Capacity" id="airport_capacity" refel={this.airportFuelCapacityElRef}></Input>
                                </div>
                                <div className="action">
                                    <Button clicked={context.closeModal}>Cancel</Button>
                                    <Button clicked={this.addAirportHandler}>Add Airport</Button>
                                </div>
                            </form>
                        );
                    }}
                </AirportContext.Consumer>
                <ToastContainer />
            </React.Fragment>
        )
    }
}

export default AirportForm