import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {
    const [state, setstate] = useState('Login')
    const [name, setname] = useState('');
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')

    const [image, setimage] = useState(false);

    const [isTextDataSubmited, setisTextDataSubmited] = useState(false)
    const {setshowRecruiterLogin}=useContext(AppContext);
    const submitHandler=async (e)=>{
        e.preventDefault();
        setisTextDataSubmited(true);
    }
    useEffect(() => {
      document.body.style.overflow='hidden';
      return ()=>{
        document.body.style.overflow='unset';
      }
    }, [])
    
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <form onSubmit={submitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Reqruiter {state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue </p>
            {state==="Sign Up" && isTextDataSubmited ? <>
                <div className='flex item-center gap-4 my-10'>
                    <label htmlFor="image">
                        <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        <input onChange={e=>setimage(e.target.files[0])} type="file" name="image" id="image" hidden/>
                    </label>
                    <p>Upload Company <br/> logo </p>
                </div>
            </> :
            <>
            {state !== 'Login' && (
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 '>
                    <img src={assets.person_icon} alt="" />
                    <input className='outline-none text-sm' type="text" name="" id="" placeholder='Company Name' required onChange={(e)=>setname(e.target.value)} value={name}/>
                </div>
            )}
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 '>
                    <img src={assets.email_icon} alt="" />
                    <input className='outline-none text-sm' type="email" name="" id="" placeholder='Email Id' required onChange={(e)=>setemail(e.target.value)} value={email}/>
                </div>
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 '>  
                    <img src={assets.lock_icon} alt="" />
                    <input className='outline-none text-sm' type="password" name="" id="" placeholder='Password' required onChange={(e)=>setpassword(e.target.value)} value={password}/>
                </div>
                
            </>
            }
            {state==='Login' && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password</p>}
            <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
                {state==="Login" ? "Login" : isTextDataSubmited ? "Create account" : 'Next'}
            </button>
            {state==="Login" ? (
                <p className='mt-5 text-center' onClick={()=>setstate("Sign Up")}>Don't have an account? <span className='text-blue-600 cursor-pointer'>Sign up</span></p>
            ) :
            (
                <p className='mt-5 text-center' onClick={()=>setstate("Login")}>Already have an account? <span className='text-blue-600 cursor-pointer'>Login</span></p>
            )}
            <img onClick={()=>setshowRecruiterLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5'/>
            
            
        </form>
    </div>
  )
}

export default RecruiterLogin