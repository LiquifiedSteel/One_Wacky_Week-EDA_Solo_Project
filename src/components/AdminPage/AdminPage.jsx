import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function AdminPage() {
    const users = useSelector(store => store.admin.adminUsers);
    const payments = useSelector(store => store.admin.adminPayments);
    const QnA = useSelector(store => store.admin.adminQuestions);
    const [notes, setNotes] = useState('');
    const [number, setNumber] = useState('');
    const [remove, setRemove] = useState('');
    const [attempt, setAttempt] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch({type: 'FETCH_USERS'});
        dispatch({type: 'FETCH_PAYMENTS'});
        dispatch({type: 'FETCH_QUESTIONS'});

        setAttempt(true);
    }, [])

    const handleSubmit = () => {
        dispatch({type: 'ADD_PATCH', payload: {notes: notes, number: number}});
        setNotes('');
        setNumber('');
    }

    const handleDelete = () => {
        dispatch({type: 'REMOVE_PATCH', payload: remove});
        setRemove('');
    }

    function deleteUser(id) {
        dispatch({type: 'DELETE_USER', payload: id});
        setNumber('');
    }

    return !attempt ? null :(
        <div id="admin">
            <h2>Admin</h2>
            <input value={number} onChange={(event) => setNumber(event.target.value)} placeholder="Input for new Patch note number" />
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="input for patch note" />
            <button onClick={handleSubmit}>Submit new Patch Note</button>
            <div>
                <input value={remove} onChange={(event) => setRemove(event.target.value)} placeholder="Input for removing an uneeded patch note" />
                <button onClick={handleDelete}>Delete designated patch note</button>
            </div>
            <div className="grid">
                <div className="grid-col grid-col_6">
                    <table>
                        <thead>
                            <tr>
                                <th>Usernames</th>
                                <th>Email</th>
                                <th>Password Recovery Questions</th>
                                <th>Flagged for deletion</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.user_email}</td>
                                    <td>{QnA.map(qa => {if(qa.user_id === user.id && attempt){
                                        return <ul>
                                            <li>{qa.questionsIDs[0]}: {qa.answer[0]}</li>
                                            <li>{qa.questionsIDs[1]}: {qa.answer[1]}</li>
                                            <li>{qa.questionsIDs[2]}: {qa.answer[2]}</li>
                                        </ul>
                                    }})}</td>
                                    {user.flagged ? <td>✅</td> : <td>❎</td>}
                                    <td><button onClick={() => deleteUser(user.id)}>🗑️</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="grid-col grid-col_6">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Date Purchased</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => {
                                return <tr key={payment.id}>
                                    <td>{payment.user_email}</td>
                                    <td>{moment(payment.date_purchased).format('MMMM Do YYYY')}</td>
                                    <td>{payment.amount}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;