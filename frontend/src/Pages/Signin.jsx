import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };
  return (
    <div className='p-3 max-w-sm mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
     <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
   
    <input type='text' placeholder='email' className='border-2 p-3  border-black rounded-lg' onChange={handleChange} id='email'></input>
    <input type='text' placeholder='password' className='border-2 p-3   border-black rounded-lg' onChange={handleChange} id='password'></input>
   
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign In</button>
    <OAuth/>
     </form>
     <div className='flex'>
    <p>Don't Have Account?</p>
    <Link to={"/sign-up"}>
    <span className='text-blue-700 p-1'>  Sign Up</span>
    </Link>
     </div>
     {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
