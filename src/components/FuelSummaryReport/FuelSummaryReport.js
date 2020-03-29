import React from 'react';
import './FuelSummaryReport.css'

const fuelSummaryReport = props => {
    return (
        <div className="main-fuel">
            <header className="fuel-header">
                <p>Summary</p>
                <button type="button" className="button" onClick={props.closeFuelSummary}>Close</button>
            </header>
            <section className="fuel-section">
                {
                    props.fuelSumamry.map(sumamry => (
                        <React.Fragment>
                            <div className="fuel-section-content">
                                <p>Airport: {sumamry.airport[0].airport_name}</p>
                                <div className="table-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date/Time</th>
                                                <th>Type</th>
                                                <th>Fuel</th>
                                                <th>Aircraft</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sumamry.transactions.map(transaction => (
                                                    <tr key={transaction._id}>
                                                        <td>{transaction.transaction_date_time}</td>
                                                        <td>{transaction.transaction_type}</td>
                                                        <td>{transaction.quantity}</td>
                                                        {transaction.aircraft.length > 0 ? <td>{transaction.aircraft[0].airline_no}</td> : <td></td>}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <p>Fuel Available: {sumamry.airport[0].fuel_available}</p>
                            </div>
                        </React.Fragment>
                    ))
                }
            </section>
        </div>
    )
}

export default fuelSummaryReport