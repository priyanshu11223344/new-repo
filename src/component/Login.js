import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let history = useNavigate();
  // const host = "http://localhost:5000";
  const [creds, setCreds] = useState({ email: "", password: "" });

  const handleOnChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: creds.email, password: creds.password }),
      });

      const res = await response.json();
      console.log('Response from server:', res);

      if (res.success) {

        // Save the auth token in local storage
        await localStorage.setItem('token', res.token);
        console.log('Token stored:', res.token);
        history("/home");
      } else {
        alert("Please enter valid details");
      }
    } catch (error) {
      console.error('Error during login request:', error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className='container'>
      <form onSubmit={submit}>
        <div className="mb-3">
          <h2>Login</h2>
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={creds.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={creds.password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;
