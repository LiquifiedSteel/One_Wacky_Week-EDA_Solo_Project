import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* questionsRootSaga() {
    yield takeLatest('FETCH_QUESTIONS', fetchQuestions);
}
  
function* fetchQuestions() {
    try {
        // If a user visits the register page, this will be called and will grab a list of all the questions
        const response = yield axios.get('/api/user/questions');
    
        yield put({ type: 'LOAD_QUESTIONS', payload: response.data });
    } catch (error) {
        console.log('Questions GET request failed', error);
    }
}

export default questionsRootSaga;