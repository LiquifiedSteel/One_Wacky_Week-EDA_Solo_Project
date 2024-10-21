import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function AdminPage() {
    const users = useSelector(store => store.admin.adminUsers); // grabs all of the users from redux
    const payments = useSelector(store => store.admin.adminPayments); // grabs all of the payments from redux
    const QnA = useSelector(store => store.admin.adminQuestions); // grabs all of the question IDs and answers for every user
    const [notes, setNotes] = useState(''); // holds the notes that are typed in until they are dispatched to add a new patch note
    const [number, setNumber] = useState(''); // holds the number that is typed in until it is dispatched to add a new patch note
    const [remove, setRemove] = useState(''); // holds the number that is typed in until it is dispatched to remove the corresponding patch note
    const [attempt, setAttempt] = useState(false); // is used to make sure the page doesn't try and render before the store is populated, otherwise it will throw errors
    
    const dispatch = useDispatch();
    // the useEffect is used to populate the redux store
    useEffect(()=> {
        dispatch({type: 'FETCH_USERS'});
        dispatch({type: 'FETCH_PAYMENTS'});
        dispatch({type: 'FETCH_QUESTIONS'});
        // here we tell the page that it can now feel free to render the DOM
        setAttempt(true);
    }, [])
    
    // handle submit dispatches to the ADD_PATCH saga which will then add the notes and number to the patches table
    const handleSubmit = () => {
        dispatch({type: 'ADD_PATCH', payload: {notes: notes, number: number}});
        setNotes('');
        setNumber('');
    }

    // handleDelete dispatches to the REMOVE_PATCH saga which will then remove the patch note from
    // the table that has the same number as what the admin entered
    const handleDelete = () => {
        dispatch({type: 'REMOVE_PATCH', payload: remove});
        setRemove('');
    }

    // deleteUser dispatches to the DELETE_USER saga and will find the user with the
    // corresponding id and will remove them from the user table
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
                <div className="grid-col grid-col_6"> {/* This table is going to hold the information for every user */}
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
                            {users.map(user => {if(!user.isAdmin){
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
                            }})}
                        </tbody>
                    </table>   {/* End of users table */}
                </div>

                <div className="grid-col grid-col_6">
                    <table>    {/* This table is going to hold the information for every payment made */}
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
                    </table> {/* End of payments table */}
                </div>
            </div>
        </div>
    )
}

export default AdminPage;