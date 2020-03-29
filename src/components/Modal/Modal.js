import React from 'react';

import './Modal.css'

import AirportForm from '../AirportForm/AirportForm'
import AircraftForm from '../AircraftForm/AircraftForm'
import TransactionForm from '../TransactionForm/TransactionForm'

const modal = props => {
    let compoentInModal = ''
    if (props.type === 'airport') {
        compoentInModal = <AirportForm />
    }
    if (props.type === 'aircraft') {
        compoentInModal = <AircraftForm />
    }
    if (props.type === 'transaction') {
        compoentInModal = <TransactionForm />
    }
    return (
        <div className="modal">
            <header className="modal-header">{props.title}</header>
            <section className="modal-content">
                {compoentInModal}
            </section>
        </div>
    )
}

export default modal