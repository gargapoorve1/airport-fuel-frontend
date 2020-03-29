import React, { Component } from 'react';

import './Report.css';

import Button from '../components/Button/Button'
import AirportSummaryReport from '../components/AirportSummaryReport/AirportSummaryReport'
import FuelSummaryReport from '../components/FuelSummaryReport/FuelSummaryReport'

class ReportPage extends Component {

    state = {
        showAirportReport: false,
        showFuelAirport: false,
        airportList: [],
        fuelSumamry: [],
    }

    showAirportSummaryReport = () => {
        this.setState({ showAirportReport: true })
        this.setState({ showFuelAirport: false })
        this.fetchAirportsHandler();
    }

    showFuelConsumptionReport = () => {
        this.setState({ showFuelAirport: true })
        this.setState({ showAirportReport: false })
        this.fetchFuelSummaryHandler();
    }

    closAirportSummaryeHandler = () => {
        this.setState({ showAirportReport: false })
    }

    closeFuelSummaryReport = () => {
        this.setState({ showFuelAirport: false })
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

    fetchFuelSummaryHandler = () => {
        fetch(`http://localhost:8000/transaction/getFuelSummary`, {
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
                this.setState({ fuelSumamry: resData.result })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="report-header">
                    <div className="report-control">
                        <p>Show Airport Summary Report</p>
                        <Button clicked={this.showAirportSummaryReport}>Show</Button>
                    </div>
                    <div className="report-control">
                        <p>Show Fuel Consumption Report</p>
                        <Button clicked={this.showFuelConsumptionReport}>Show</Button>
                    </div>
                </div>
                {
                    this.state.showAirportReport && <AirportSummaryReport airportList={this.state.airportList} closeAirportSummary={this.closAirportSummaryeHandler} />
                }
                {
                    this.state.showFuelAirport && <FuelSummaryReport fuelSumamry={this.state.fuelSumamry} closeFuelSummary={this.closeFuelSummaryReport} />
                }
            </React.Fragment>
        );

    }
}

export default ReportPage