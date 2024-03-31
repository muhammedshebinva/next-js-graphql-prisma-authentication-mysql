import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/Layout"

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;

function SignupForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const router = useRouter(); // Get router instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ variables: { email, password} });
      console.log('registerd');
      router.push('/login');
      // Handle successful registration (redirect to login)

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // ... JSX for signup form
  return (

    <Layout>
      <div className='page'>
     
    <form onSubmit={handleSubmit}>
    <h1>Signup user</h1>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <br />
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  
    
      <button className='btn' type="submit" disabled={loading}>
        Register
      </button>
      {loading && <p>Registering...</p>}
      {error && <p>Error: {error.message}</p>}
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
export default SignupForm
