import React, { useRef } from 'react';

function TestLogin() {
  const rollNoRef = useRef(null);
  const testIdRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit =async(e) => {
    e.preventDefault();

    const rollNo = rollNoRef.current.value;
    const testId = testIdRef.current.value;
    const email = emailRef.current.value;

    const formData = {
      rollNo,
      testId,
      email,
    };
  
       try{
        const response=await fetch("http://127.0.0.1:7000/validate-test-user",{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify({login_data:formData})

        })
        if(response){
        console.log("data sent from the student login")
        }
        else{
            console.log("something went wrong with student data")
        }
       }
       catch{
          console.log("something went wrong with data base post API")
       }
    

    console.log("Form Data:", formData);
  };

  return (
    <div>
      <form className='test-login-container' onSubmit={handleSubmit}>
        <h1>Login here to get the Test</h1>
        <div>
          <input
            type="text"
            id="rollNo"
            ref={rollNoRef}
            placeholder="Enter your Roll No"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="testId"
            ref={testIdRef}
            placeholder="Enter Test ID"
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Enter your Gmail"
            required
          />
        </div>
        <button className='test-login-btn' type="submit">Login</button>
      </form>
    </div>
  );
}

export default TestLogin;
