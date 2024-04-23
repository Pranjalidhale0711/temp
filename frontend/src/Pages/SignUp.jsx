import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';

export default function SignOut() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-sm mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
     <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
    <input type='text' placeholder='username' className='border-2  border-black p-3 rounded-lg' onChange={handleChange} id='username'></input>
    <input type='text' placeholder='email' className='border-2 p-3  border-black rounded-lg' onChange={handleChange} id='email'></input>
    <input type='text' placeholder='password' className='border-2 p-3   border-black rounded-lg' onChange={handleChange} id='password'></input>
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign Up</button>
     </form>
     <div className='flex'>
    <p>Already have an Account?</p>
    <Link to={"/sign-in"}>
    <span className='text-blue-700 p-1'>Sign In</span>
    </Link>
     </div>
     {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
