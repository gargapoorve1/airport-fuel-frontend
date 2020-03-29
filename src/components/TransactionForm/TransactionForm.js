import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './TransactionForm.css'

import Input from '../Input/Input'
import Button from '../Button/Button';
import TransactionContext from '../../context/transaction';

class TransactionForm extends Component {

    state = {
        message: '',
        airportList: [],
        aircraftList: [],
        showAircraft: false
    }

    static contextType = TransactionContext

    constructor(props) {
        super(props)
        this.transactionTypeElRef = React.createRef()
        this.transactionAirportElRef = React.createRef()
        this.transactionAircraftElRef = React.createRef()
        this.transactionQuantitytElRef = React.createRef()
    }

    componentDidMount() {
        this.fetchAirportsHandler()
        this.fetchAircraftsHandler()
    }

    fetchAirportsHandler = () => {
        fetch(`http://localhost:8000/airport/airports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Failed!!')
            }
            return res.json()
        })
            .then((resData) => {
                this.setState({ airportList: resData.airports })
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchAircraftsHandler = () => {
        fetch(`http://localhost:8000/aircraft/aircrafts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200) {
                throw new Error('Failed!!')
            }
            return res.json()
        })
            .then((resData) => {
                this.setState({ aircraftList: resData.aircrafts })
            })
            .catch(err => {
                console.log(err);
            })
    }

    addTransactionHandler = () => {
        const transaction_type = this.transactionTypeElRef.current.value;
        const quantity = this.transactionQuantitytElRef.current.value;
        const airport_id = this.transactionAirportElRef.current.value;

        let requestbody = {
            transaction_type: transaction_type,
            quantity: quantity,
            airport_id: airport_id
        }

        if (this.state.showAircraft === true) {
            const aircraft_id = this.transactionAircraftElRef.current.value;
            requestbody = {
                transaction_type: transaction_type,
                quantity: quantity,
                airport_id: airport_id,
                aircraft_id: aircraft_id,
            }
        }
        fetch(`http://localhost:8000/transaction/addtransaction`, {
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
                this.context.fetchtransactions();
                this.context.closeModal();
            })
            .catch(err => {
                console.log(err);
            })
    }

    transactionTypeHandler = () => {
        this.transactionTypeElRef.current.value === 'OUT' ? this.setState({ showAircraft: true }) : this.setState({ showAircraft: false })
    }

    render() {
        return (
            <React.Fragment>
                <TransactionContext.Consumer>
                    {(context) => {
                        return (
                            <form>
                                <div>
                                    <div className="Select">
                                        <label htmlFor="transaction_type" className="Label">Select Transaction Type</label>
                                        <select ref={this.transactionTypeElRef} onChange={this.transactionTypeHandler} className="InputElement">
                                            <option value="IN">IN</option>
                                            <option value="OUT">OUT</option>
                                        </select>
                                    </div>
                                    <div className="Select">
                                        <label htmlFor="transaction_airport" className="Label">Select Airport</label>
                                        <select ref={this.transactionAirportElRef} className="InputElement">
                                            {
                                                this.state.airportList.map(airport => (
                                                    <option key={airport._id} value={airport._id}>{airport.airport_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {this.state.showAircraft && (
                                        <div className="Select">
                                            <label htmlFor="transaction_aircraft" className="Label">Select Aircraft</label>
                                            <select ref={this.transactionAircraftElRef} className="InputElement">
                                                {
                                                    this.state.aircraftList.map(aircraft => (
                                                        <option key={aircraft._id} value={aircraft._id}>{aircraft.airline_no}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    )
                                    }
                                    <Input label="Enter Quantity" type="text" placeholder="Enter Quantity" id="transaction_quantity" refel={this.transactionQuantitytElRef}></Input>
                                </div>
                                <div className="action">
                                    <Button clicked={context.closeModal}>Cancel</Button>
                                    <Button clicked={this.addTransactionHandler}>Add Transaction</Button>
                                </div>
                            </form>
                        );
                    }}
                </TransactionContext.Consumer>
                <ToastContainer />
            </React.Fragment>
        )
    }
}

export default TransactionForm