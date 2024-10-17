import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [question1, setQuestion1] = useState(null);
  const [question2, setQuestion2] = useState(null);
  const [question3, setQuestion3] = useState(null);
  const [email, setEmail] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const errors = useSelector((store) => store.errors);
  const questions = useSelector(store => store.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_QUESTIONS'});
  }, [])

  const registerUser = (event) => {
    event.preventDefault();
    if(question1 && question2 && question3) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          answer1: answer1,
          answer2: answer2,
          answer3: answer3,
          email: email,
          question1: question1,
          question2: question2,
          question3: question3,
        },
      });
    } else {
      alert("You must pick one option for each of the Question Dropdown fields, these will be saved for password recovery later.");
    }
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
      <div>
        <label htmlFor='email'>
          Email:
          <input type='email' placeholder='Your Email' required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
      </div>
      <div id='recovery'>
        <p>Password Recovery Questions</p>
        <label htmlFor='question1'>
          Question 1:
          <select name='question1' value={question1} onChange={(event) => {setQuestion1(event.target.value);}}>
            <option value={null}></option>
            {questions.filter((question)=>Number(question2) !== Number(question.id) && Number(question3) !== Number(question.id)).map(question =><option key={question.id} value={question.id}>{question.Questions}</option>)}
          </select>
          <input type='text' placeholder='Answer to question 1' required value={answer1} onChange={(event) => setAnswer1(event.target.value)}/>
        </label>
      
        <label htmlFor='question2'>
          Question 2:
          <select name='question2' value={question2} onChange={(event) => {setQuestion2(event.target.value);}}>
            <option value={null}></option>
            {questions.filter((question)=>Number(question1) !== Number(question.id) && Number(question3) !== Number(question.id)).map(question =><option key={question.id} value={question.id}>{question.Questions}</option>)}
          </select>
          <input type='text' placeholder='Answer to question 2' required value={answer2} onChange={(event) => setAnswer2(event.target.value)}/>
        </label>

        <label htmlFor='question3'>
          Question 3:
          <select name='question3' value={question3} onChange={(event) => {setQuestion3(event.target.value);}}>
            <option value={null}></option>
            {questions.filter((question)=>Number(question1) !== Number(question.id) && Number(question2) !== Number(question.id)).map(question =><option key={question.id} value={question.id}>{question.Questions}</option>)}
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
