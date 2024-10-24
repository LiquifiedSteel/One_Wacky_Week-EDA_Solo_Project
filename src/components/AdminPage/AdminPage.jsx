import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import "./AdminPage.css"

function AdminPage() {
    const users = useSelector(store => store.admin.adminUsers); // grabs all of the users from redux
    const payments = useSelector(store => store.admin.adminPayments); // grabs all of the payments from redux
    const QnA = useSelector(store => store.admin.adminQuestions); // grabs all of the question IDs and answers for every user
    const [notes, setNotes] = useState(''); // holds the notes that are typed in until they are dispatched to add a new patch note
    const [number, setNumber] = useState(''); // holds the number that is typed in until it is dispatched to add a new patch note
    const [attempt, setAttempt] = useState(false); // is used to make sure the page doesn't try and render before the store is populated, otherwise it will throw errors
    const [patches, setPatches] = useState([]);

    const dispatch = useDispatch();
    // the useEffect is used to populate the redux store
    useEffect(()=> {
        dispatch({type: 'FETCH_USERS'});
        dispatch({type: 'FETCH_PAYMENTS'});
        dispatch({type: 'FETCH_QUESTIONS'});
        axios({
            method: 'GET',
            url: '/api/patch'
        }).then(response => setPatches(response.data))
        .catch(err => console.error("Failed to collect patch notes: ", err));
        // here we tell the page that it can now feel free to render the DOM
        setAttempt(true);
    }, [])
    
    // handle submit dispatches to the ADD_PATCH saga which will then add the notes and number to the patches table
    const handleSubmit = () => {
        dispatch({type: 'ADD_PATCH', payload: {notes: notes, number: number}});
        setNotes('');
        setNumber('');
        axios({
            method: 'GET',
            url: '/api/patch'
        }).then(response => setPatches(response.data))
        .catch(err => console.error("Failed to collect patch notes: ", err));
    }

    // handleDelete dispatches to the REMOVE_PATCH saga which will then remove the patch note from
    // the table that has the same number as what the admin entered
    function handleDelete(patch) {
        console.log(patch);
        dispatch({type: 'REMOVE_PATCH', payload: patch.number});
        axios({
            method: 'GET',
            url: '/api/patch'
        }).then(response => setPatches(response.data))
        .catch(err => console.error("Failed to collect patch notes: ", err));
    }

    // deleteUser dispatches to the DELETE_USER saga and will find the user with the
    // corresponding id and will remove them from the user table
    function deleteUser(id) {
        dispatch({type: 'DELETE_USER', payload: id});
        setNumber('');
    }

    return !attempt ? null :(
        <Container fluid id="admin">
            <Row>
                <Col xs={12} md={7}> {/* This table is going to hold the information for every user */}
                    <h3>Accounts Table</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Usernames</th>
                                <th>Email</th>
                                <th>Flagged for deletion</th>
                                <th>Delete User</th>
                                <th>Date Paid (if purchased game)</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.filter(((user)=>user.purchased === true && user.flagged === false)).map(user => {if(!user.isAdmin){
                                return <tr className="tableBackground" key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.user_email}</td>
                                    {!user.flagged ? <td className="delete">❎</td> : <td className="doNot"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                        </svg></td>}
                                    <td>{!user.purchased && <button onClick={() => deleteUser(user.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg></button>}</td>
                                    {payments.map(payment => {if (payment.user_email === user.user_email) return <td>{moment(payment.date_purchased).format('MMMM Do YYYY')}</td>})}
                                    {payments.map(payment => {if (payment.user_email === user.user_email) return <td>{payment.amount}</td>})}
                                </tr>
                            }})}


                            {users.filter(((user)=>user.purchased === true && user.flagged === true)).map(user => {if(!user.isAdmin){
                                return <tr className="tableBackground" key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.user_email}</td>
                                    {!user.flagged ? <td className="delete">❎</td> : <td className="doNot"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                        </svg></td>}
                                    <td>{!user.purchased && <button onClick={() => deleteUser(user.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg></button>}</td>
                                    {payments.map(payment => {if (payment.user_email === user.user_email) return <td>{moment(payment.date_purchased).format('MMMM Do YYYY')}</td>})}
                                    {payments.map(payment => {if (payment.user_email === user.user_email) return <td>{payment.amount}</td>})}
                                </tr>
                            }})}


                            {users.filter(((user)=>user.purchased === false && user.flagged === false)).map(user => {if(!user.isAdmin){
                                return <tr className="tableBackground" key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.user_email}</td>
                                    {!user.flagged ? <td className="delete">❎</td> : <td className="doNot"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                        </svg></td>}
                                    <td>{!user.purchased && <button onClick={() => deleteUser(user.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg></button>}</td>
                                </tr>
                            }})}


                            {users.filter(((user)=>user.purchased === false && user.flagged === true)).map(user => {if(!user.isAdmin){
                                return <tr className="tableBackground" key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.user_email}</td>
                                    {!user.flagged ? <td className="delete">❎</td> : <td className="doNot"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                        </svg></td>}
                                    <td>{!user.purchased && <button onClick={() => deleteUser(user.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg></button>}</td>
                                </tr>
                            }})}
                        </tbody>
                    </table>   {/* End of users table */}
                </Col>

                <Col xs={12} md={5}>
                    <Card>
                        <div className="horizontal">
                            <div className="vertical">
                                <input value={number} onChange={(event) => setNumber(event.target.value)} placeholder="Patch Note Number" />
                                <button onClick={handleSubmit}>Submit new Patch Note</button>
                            </div>
                            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Patch Note Text" />
                        </div>
                    </Card>
                    
                    <h3>Patch Notes</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Patch #</th>
                                <th>Notes</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {patches.map(patch => {
                                return <tr className="tableBackground" key={patch.id}>
                                    <td>{patch.number}</td>
                                    <td>{patch.notes}</td>
                                    <td><button onClick={() => handleDelete(patch)}> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminPage;