

import { useMutation, gql } from '@apollo/client';
//import { AuthContext } from '../AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext';
import Layout from "../components/Layout"

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) 
  }
`;

function LoginForm() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const { loginUser } = useAuth();

 const router = useRouter(); // Get router instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      const response = await login({ variables: formData });
      
      const newToken = response.data.login; // Extract token from response
      console.log(newToken);

      
      loginUser(newToken);

      


      console.log('Login successful:', response.data.login);
      router.push('/');
     
    } catch (error) {
      console.error('Login error:', error);
      
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (

    <Layout>
   
    <div className='page'>
    
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        const formData = { email, password };
        const response = await login({ variables: formData });
        
        const newToken = response.data.login; // Extract token from response
        console.log(newToken);
  
        
        loginUser(newToken);
  
        
  
  
        console.log('Login successful:', response.data.login);
        router.push('/');
       
      } catch (error) {
        console.error('Login error:', error);
        
      }
    }}>
    <h1>Login user</h1>
      <label htmlFor="email">Email:</label> <br/>
      <input 
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      {/* Add email validation logic here */}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      {/* Add password validation logic here */}
      <button className='btn' type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
    </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }
        .btn{
          background: #ececec;
          border: 0.2px;
          padding: 1rem 2rem; 
          margin-top: 1rem;
          width:150px;
        }


       
      `}</style>
    </Layout>
  );
}

export default LoginForm;
