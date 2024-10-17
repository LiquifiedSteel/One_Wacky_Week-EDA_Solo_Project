import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* adminRootSaga() {
    yield takeLatest('FETCH_USERS', fetchUsers);
    yield takeLatest('FETCH_PAYMENTS', fetchPayments);
    yield takeLatest('FETCH_QUESTIONS', fetchQuestions);
    yield takeLatest('ADD_PATCH', addPatch);
    yield takeLatest('REMOVE_PATCH', deletePatch);
    yield takeLatest('DELETE_USER', deleteUser);
}
  
function* fetchUsers() {
    try {
        // If an admin visits the admin page, this will be called and will grab a list of all the users
        const response = yield axios.get('/api/user/all');
        yield put({ type: 'LOAD_USERS', payload: response.data });
    } catch (error) {
        console.log('Users GET request failed', error);
    }
}

function* fetchPayments() {
    try {
        // If an admin visits the admin page, this will be called and will grab a list of all the payments
        const response = yield axios.get('/api/user/payments');
        yield put({ type: 'LOAD_PAYMENTS', payload: response.data });
    } catch (error) {
        console.log('Payments GET request failed', error);
    }
}

function* fetchQuestions() {
    try {
        // If an admin visits the admin page, this will be called and will grab a list
        // of all the questions and answers grouped by the user they belong to
        const response = yield axios.get('/api/user/answers');
        yield put({ type: 'LOAD_ANSWERS', payload: response.data });
    } catch (error) {
        console.log('Questions GET request failed', error);
    }
}

function* addPatch(action) {
    try {
        // If an admin triggers the submit new patch note sequence,
        // this will run and will add the new patch note to the database
        yield axios.post('/api/patch', action.payload);
    } catch (error) {
        console.log('Patches POST request failed', error);
    }
}

function* deletePatch(action) {
    try {
        // If an admin triggers the delete patch note sequence,
        // this will run and will remove the patch note from the database
        yield axios.delete(`/api/patch/${action.payload}`);
    } catch (error) {
        console.log('Patches DELETE request failed', error);
    }
}

function* deleteUser(action) {
    try {
        console.log(action.payload);
        // If an admin triggers the delete user sequence,
        // this will run and will delete the user from the database
        yield axios.delete(`/api/user/hardDelete/${action.payload}`);
    } catch (error) {
        console.log('User DELETE request failed', error);
    }
}

export default adminRootSaga;