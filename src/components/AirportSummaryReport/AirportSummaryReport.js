import React from 'react';
import './AirportSummaryReport.css'

const airportSummaryReport = props => {
    return (
        <div className="main-summary">
            <header className="summary-header">
                <p>Airport</p>
                <span className="summary-header-item">
                    <p>Fuel Available</p>
                    <button type="button" className="button" onClick={props.closeAirportSummary}>Close</button>
                </span>
            </header>
            <section className="summary-section">
                {
                    props.airportList.map((airport, index) => (
                        <div key={airport._id} className="summary-section-content">
                            <p>{index + 1}. {airport.airport_name}</p>
                            <div>
                                <p>{airport.fuel_available}</p>
                            </div>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default airportSummaryReport