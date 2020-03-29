import React, { Component } from 'react';

import './AircraftForm.css';

import Input from '../Input/Input'
import Button from '../Button/Button';
import AircraftContext from '../../context/aircraft';

class AircraftForm extends Component {
    state = {
        message: ''
    }

    static contextType = AircraftContext

    constructor(props) {
        super(props)
        this.aircraftNumberElRef = React.createRef()
        this.aircraftNameElRef = React.createRef()
        this.aircraftSourceElRef = React.createRef()
        this.aircraftDestination = React.createRef()
    }

    addAircraftHandler = () => {
        const airline_no = this.aircraftNumberElRef.current.value;
        const airline = this.aircraftNameElRef.current.value;
        const source = this.aircraftSourceElRef.current.value;
        const destination = this.aircraftDestination.current.value;

        const requestbody = {
            airline_no: airline_no,
            airline: airline,
            source: source,
            destination: destination,
        }
        fetch(`http://localhost:8000/aircraft/add`, {
            method: 'POST',
            body: JSON.stringify(requestbody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error(res)
            }
            return res.json()
        })
            .then((resData) => {
                this.context.fetchaircrafts();
                this.context.closeModal();
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <AircraftContext.Consumer>
                {(context) => {
                    return (
                        <form>
                            <div>
                                <Input label="Enter Aircraft Name" type="text" placeholder="Enter Airport Name" id="aircraft_name" refel={this.aircraftNameElRef}></Input>
                                <Input label="Enter Aircraft Number" type="text" placeholder="Enter Aircraft Number" id="aircraft_number" refel={this.aircraftNumberElRef}></Input>
                                <Input label="Enter Source" type="text" placeholder="Enter Source" id="aircraft_source" refel={this.aircraftSourceElRef}></Input>
                                <Input label="Enter Destination" type="text" placeholder="Enter Destination" id="aircraft_destination" refel={this.aircraftDestination}></Input>
                            </div>
                            <div className="action">
                                <p>{this.state.message}</p>
                                <div>
                                    <Button clicked={context.closeModal}>Cancel</Button>
                                    <Button clicked={this.addAircraftHandler}>Add Aircraft</Button>
                                </div>
                            </div>
                        </form>
                    )
                }}
            </AircraftContext.Consumer>
        )
    }
}

export default AircraftForm