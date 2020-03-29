import React, { Component } from 'react';
import './Aircraft.css'

import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AircraftContext from '../context/aircraft'

class AircraftPage extends Component {

    state = {
        creating: false,
        aircraftsList: [],
    }

    componentDidMount() {
        this.fetchAircraftsHandler()
    }

    addAircraftHandler = () => {
        this.setState({ creating: true })
    }

    closeModalHandler = () => {
        this.setState({ creating: false })
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
                this.setState({ aircraftsList: resData.aircrafts })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <React.Fragment>
                <AircraftContext.Provider value={{ fetchaircrafts: this.fetchAircraftsHandler, closeModal: this.closeModalHandler }}>
                    {this.state.creating && <Backdrop />}
                    {this.state.creating && <Modal type="aircraft" title="Aircraft" />}
                    <div className="aircraft-control">
                        <p>Add new Aircraft</p>
                        <Button clicked={this.addAircraftHandler}>Add Aircraft</Button>
                    </div>
                    <div className="table_content">
                        <h2>Below is the current list of the airports(Sorted by Aircraft Number)</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Aircraft Name</th>
                                    <th>Aircraft Number</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.aircraftsList.map(aircraft => (
                                        <tr key={aircraft._id}>
                                            <td>{aircraft.airline}</td>
                                            <td>{aircraft.airline_no}</td>
                                            <td>{aircraft.source}</td>
                                            <td>{aircraft.destination}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </AircraftContext.Provider>
            </React.Fragment>
        );
    }
}

export default AircraftPage;