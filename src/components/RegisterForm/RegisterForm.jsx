import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [question1, setQuestion1] = useState(0);
  const [question2, setQuestion2] = useState(0);
  const [question3, setQuestion3] = useState(0);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const errors = useSelector((store) => store.errors);
  const questions = useSelector(store => store.questions);
  const dispatch = useDispatch();
  console.log("list of questions: ", questions);
  useEffect(() => {
    dispatch({type: 'FETCH_QUESTIONS'});
  }, [])

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      
      <div id='recovery'>
        <p>Password Recovery Questions</p>
        <label htmlFor='question1'>
          Question 1:
          <select name='question1' value={question1} onChange={(event) => setQuestion1(event.target.value)}>
            <option value={0}></option>
            <option value={1}>Question 1</option>
            <option value={2}>Question 2</option>
            <option value={3}>Question 3</option>
            <option value={4}>Question 4</option>
          </select>
          <input type='text' placeholder='Answer to question 1' required value={answer1} onChange={(event) => setAnswer1(event.target.value)}/>
        </label>
      
        <label htmlFor='question2'>
          Question 2:
          <select name='question2' value={question2} onChange={(event) => setQuestion2(event.target.value)}>
            <option value={0}></option>
            <option value={1}>Question 1</option>
            <option value={2}>Question 2</option>
            <option value={3}>Question 3</option>
            <option value={4}>Question 4</option>
          </select>
          <input type='text' placeholder='Answer to question 2' required value={answer2} onChange={(event) => setAnswer2(event.target.value)}/>
        </label>

        <label htmlFor='question3'>
          Question 3:
          <select name='question3' value={question3} onChange={(event) => setQuestion3(event.target.value)}>
            <option value={0}></option>
            <option value={1}>Question 1</option>
            <option value={2}>Question 2</option>
            <option value={3}>Question 3</option>
            <option value={4}>Question 4</option>
          </select>
          <input type='text' placeholder='Answer to question 3' required value={answer3} onChange={(event) => setAnswer3(event.target.value)}/>
        </label>
      </div>
      
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
