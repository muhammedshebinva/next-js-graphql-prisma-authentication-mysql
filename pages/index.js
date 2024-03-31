


'use client'
import Layout from "../components/Layout"
import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';


import { useAuth } from '../AuthContext';
import LogoutButton from '../components/LogoutButton';



function HomePage() {
 
  const router = useRouter(); // Get router instance


  const { isLoggedIn, logout } = useAuth();

    return (
      <Layout>
      <div className="main">
      <Head>
        <title>Home Page</title>
        
      </Head>
      <h1>Welcome, to Home </h1>
      
      {!isLoggedIn && (
        <>
        <button onClick={() => router.push('/signup')}>Signup</button>
        <button onClick={() => router.push('/login')}>Login</button>

        <h1>{isLoggedIn}</h1>
        </>
      )}

      {isLoggedIn && (
        <>
        <LogoutButton/>
        </>
      )}
    </div>

    <style jsx>{`
      
    }
  `}</style>
</Layout>
  );
}

export default HomePage;


