import React, { Component } from 'react';
import './Airport.css'

import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AirportContext from '../context/airport'

class AirportPage extends Component {

    state = {
        creating: false,
        airportList: [],
    }

    componentDidMount() {
        this.fetchAirportsHandler()
    }

    addAirportHandler = () => {
        this.setState({ creating: true })
    }

    closeModalHandler = () => {
        this.setState({ creating: false })
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
                console.log(resData)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <React.Fragment>
                <AirportContext.Provider value={{ fetchairports: this.fetchAirportsHandler, closeModal: this.closeModalHandler }}>
                    {this.state.creating && <Backdrop />}
                    {this.state.creating && <Modal type="airport" title="Airport" />}
                    <div className="airport-control">
                        <p>Add new Airport</p>
                        <Button clicked={this.addAirportHandler}>Add Airport</Button>
                    </div>
                    <div className="table_content">
                        <h2>Below is the current list of the airports(Sorted by Name)</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Airport Name</th>
                                    <th>Airport Fuel Capacity</th>
                                    <th>Airport Fuel Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.airportList.map(airport => (
                                        <tr key={airport._id}>
                                            <td>{airport.airport_name}</td>
                                            <td>{airport.fuel_capacity}</td>
                                            <td>{airport.fuel_available}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </AirportContext.Provider>
            </React.Fragment>
        );
    }
}

export default AirportPage;