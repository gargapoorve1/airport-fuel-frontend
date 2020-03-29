import React, { Component } from 'react';
import './Transaction.css'

import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import TransactionContext from '../context/transaction';

class TransactionPage extends Component {

    state = {
        creating: false,
        transactionList: []
    }

    componentDidMount() {
        this.fetchTransactionHandler()
    }

    addTransactionHandler = () => {
        this.setState({ creating: true })
    }

    closeModalHandler = () => {
        this.setState({ creating: false })
    }

    fetchTransactionHandler = () => {
        fetch(`http://localhost:8000/transaction/transactions`, {
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
                console.log(resData)
                this.setState({ transactionList: resData.transactions })
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteTransactionHandler = () => {
        fetch(`http://localhost:8000/transaction/deletetransactions`, {
            method: 'DELETE',
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
                this.fetchTransactionHandler()
            })
            .catch(err => {
                console.log(err);
            })
    }

    reverseTransaction = (transaction) => {

        let requestbody = {
            _id: transaction._id
        }

        fetch(`http://localhost:8000/transaction/reversetransaction`, {
            method: 'POST',
            body: JSON.stringify(requestbody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!!')
            }
            return res.json()
        })
            .then((resData) => {
                this.fetchTransactionHandler()
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let transactionData = []
        this.state.transactionList.map(transaction => {
            if (transaction.transaction_parent_id) {
                transaction['hideButton'] = true
                const reversedTransaction = this.state.transactionList.find(trans => transaction.transaction_parent_id === trans._id)
                if (reversedTransaction) {
                    reversedTransaction['hideButton'] = true
                }
            }
            return transactionData.push(transaction)
        });
        return (
            <React.Fragment>
                <TransactionContext.Provider value={{ fetchtransactions: this.fetchTransactionHandler, closeModal: this.closeModalHandler }}>
                    {this.state.creating && <Backdrop />}
                    {this.state.creating && <Modal type="transaction" title="Transaction" />}
                    <div className="transaction-header">
                        <div className="transaction-control">
                            <p>Add new Transaction</p>
                            <Button clicked={this.addTransactionHandler}>Add Transaction</Button>
                        </div>
                        <div className="transaction-control">
                            <p>Delete All Transaction</p>
                            <Button clicked={this.deleteTransactionHandler}>Delete Transactions</Button>
                        </div>
                    </div>
                    <div className="table_content">
                        <h2>Below is the current list of the transactions(Sorted by Date Descending)</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Transaction Type</th>
                                    <th>Airport Name</th>
                                    <th>Aircraft Name</th>
                                    <th>Aircraft Number</th>
                                    <th>Transaction Quantity</th>
                                    <th>Transaction Date & Time</th>
                                    <th>Transaction Reverse Id</th>
                                    <th>Reverse Transaction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactionData.map(transaction => (
                                        <tr key={transaction._id}>
                                            <td>{transaction._id}</td>
                                            <td>{transaction.transaction_type}</td>
                                            <td>{transaction.airport_id.airport_name}</td>
                                            {transaction.aircraft_id ? <td>{transaction.aircraft_id.airline}</td> : <td></td>}
                                            {transaction.aircraft_id ? <td>{transaction.aircraft_id.airline_no}</td> : <td></td>}
                                            <td>{transaction.quantity}</td>
                                            <td>{transaction.transaction_date_time}</td>
                                            {transaction.transaction_parent_id ? <td>{transaction.transaction_parent_id}</td> : <td></td>}
                                            {!transaction.hideButton ===true ? <td>
                                                <Button clicked={() => this.reverseTransaction(transaction)}>Reverse this Transaction</Button>
                                            </td> : <td></td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </TransactionContext.Provider>
            </React.Fragment >
        );
    }
}

export default TransactionPage;