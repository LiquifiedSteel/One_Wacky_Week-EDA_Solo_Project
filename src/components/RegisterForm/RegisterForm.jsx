import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';


function RegisterForm() {
  const [username, setUsername] = useState(''); // username is used to store the new account's username
  const [password, setPassword] = useState(''); // password is used to store the new account's password
  const [question1, setQuestion1] = useState(null); // question1 is used to store the first of the new account's password recovery questions
  const [question2, setQuestion2] = useState(null); // question2 is used to store the second of the new account's password recovery questions
  const [question3, setQuestion3] = useState(null); // question3 is used to store the third of the new account's password recovery questions
  const [email, setEmail] = useState(''); // email is used to store the new account's email
  const [answer1, setAnswer1] = useState(''); // answer1 is used to store the answer to question 1
  const [answer2, setAnswer2] = useState(''); // answer2 is used to store the answer to question 2
  const [answer3, setAnswer3] = useState(''); // answer3 is used to store the answer to question 3
  const errors = useSelector((store) => store.errors);
  const questions = useSelector(store => store.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_QUESTIONS'});
  }, [])

  const registerUser = (event) => {
    event.preventDefault();
    let toggle = false;
    let trackProvider = '';
    let trackTLD = '';
    for(let i=0; i<=email.length-1; i++) {
      if(email[i] === '@') {
        toggle = 'Provider';
      }
      if(toggle) {
        if (email[i] === '.') {
          toggle = 'TLD';
        }
        if (toggle === 'Provider') {
          trackProvider += email[i];
        }
      }
      if(toggle === 'TLD') {
        trackTLD += email[i];
      }
    }
    // here we have some very rudamentary email checking, I will improve it with some real email verification in the future
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(re.test(email) && (trackProvider === '@gmail' || trackProvider === '@yahoo' || trackProvider === '@outlook' || trackProvider === '@hotmail' || trackProvider === '@aol' ||
      trackProvider === '@icloud' || trackProvider === '@protonmail' || trackProvider === '@zoho' || trackProvider === '@mail' || trackProvider === '@me' ||
      trackProvider === '@fastmail' || trackProvider === '@gmx' || trackProvider === '@yandex' || trackProvider === '@msn' || trackProvider === '@live' ||
      trackProvider === '@qq' || trackProvider === '@rambler' || trackProvider === '@rediffmail' || trackProvider === '@t-online' || trackProvider === '@163' ||
      trackProvider === '@tutanota' || trackProvider === '@sendgrid' || trackProvider === '@domain') && (trackTLD === '.com' || 
      trackTLD === '.org' || trackTLD === '.net' || trackTLD === '.info' || trackTLD === '.biz' || trackTLD === '.edu' || 
      trackTLD === '.gov' || trackTLD === '.mil' || trackTLD === '.io' || trackTLD === '.co' || trackTLD === '.me' || 
      trackTLD === '.tv' || trackTLD === '.us' || trackTLD === '.ca' || trackTLD === '.uk' || trackTLD === '.au' || 
      trackTLD === '.de' || trackTLD === '.jp' || trackTLD === '.fr' || trackTLD === '.in')) {
      
      
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
    } else {
      alert('that is an invalid email');
    }
  }; // end registerUser

  return (
    <Form className="formPanel myform" onSubmit={registerUser}>
      <h2 className='blue'>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label className='blue' htmlFor="username">
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
        <label className='blue' htmlFor="password">
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
        <label className='blue' htmlFor='email'>
          Email:
          <input type='email' placeholder='Your Email' required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
      </div>


      <div className='blue' id='recovery'>
        <p className='blue'>Password Recovery Questions</p>
        <label className='blue question' htmlFor='question1'>
          Question 1:
          <Form.Select className='expandable' name='question1' value={question1} onChange={(event) => {setQuestion1(event.target.value);}}>
            <option value={null}></option>
            {questions.filter((question)=>Number(question2) !== Number(question.id) && Number(question3) !== Number(question.id)).map(question =><option key={question.id} value={question.id}>{question.Questions}</option>)}
          </Form.Select>
          <input type='text' placeholder='Answer to question 1' required value={answer1} onChange={(event) => setAnswer1(event.target.value)}/>
        </label>

        <br />

        <label className='blue question' htmlFor='question2'>
          Question 2:
          <Form.Select className='expandable' name='question2' value={question2} onChange={(event) => {setQuestion2(event.target.value);}}>
            <option value={null}></option>
            {questions.filter((question)=>Number(question1) !== Number(question.id) && Number(question3) !== Number(question.id)).map(question =><option key={question.id} value={question.id}>{question.Questions}</option>)}
          </Form.Select>
          <input type='text' placeholder='Answer to question 2' required value={answer2} onChange={(event) => setAnswer2(event.target.value)}/>
        </label>

        <br />

        <label className='blue question' htmlFor='question3'>
          Question 3:
          <Form.Select className='expandable' name='question3' value={question3} onChange={(event) => {setQuestion3(event.target.value);}}>
            <option value={null}></option>
            {questions.filter((question)=>Number(question1) !== Number(question.id) && Number(question2) !== Number(question.id)).map(question =><option key={question.id} value={question.id}>{question.Questions}</option>)}
          </Form.Select>
          <input type='text' placeholder='Answer to question 3' required value={answer3} onChange={(event) => setAnswer3(event.target.value)}/>
        </label>
      </div>
      
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </Form>
  );
}

export default RegisterForm;
