import React from 'react'

const LoginForm = () => {

    const handleSubmit=()=>{

    }
     const handleChange=()=>{

    }
  return (
    <div className="login-container" >
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          
          onChange={handleChange}
          
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
         
          onChange={handleChange}
          
        />


        <button type="submit" >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm
