import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);


  const { register, error, clearErrors, isAuthenticated } = authContext;
  
  if(localStorage.token){
    props.history.push('/');
  }

  useEffect(()=> {
    if(isAuthenticated){
      props.history.push('/');
    }

    if(error === "User already exists"){
      alertContext.setAlert('User already exists', 'text-center alert-danger');

      // setAlarm instead of console.log(error)
      console.log(error);
      //@ToDo clearErrors
    }

    //  eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      console.log('here')
      alertContext.setAlert('Please enter all fields', 'alert-danger');

    } else if (password !== password2) {
      alertContext.setAlert('Passwords do not match', 'alert-danger');

    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span>Register</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
