import React from 'react'
import { useRef,useState,useEffect } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';


const AddJob = () => {
  const [title, settitle] = useState('');
  const [location, setlocation] = useState('Banglore');
  const [category, setcategory] = useState('Programming');
  const [level, setlevel] = useState('Beginner level');
  const [salary, setsalary] = useState(0);


  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    //Initiate Qill only once
    if(!quillRef.current && editorRef.current)
    {
      quillRef.current=new Quill(editorRef.current,{
        theme:'snow',
      })
    }
  }, [])
  
  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
        <div className='w-full'>
          <p className='mb-2'>Title</p>
          <input type="text" name="title" id="title" value={title} onChange={(e)=>settitle(e.target.value)} placeholder='Type here' required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'/>
        </div>
        <div className='w-full max-w-lg'>
          <p className='my-2'>Job Descriptions</p>
          <div ref={editorRef}>

          </div>
        </div>
        <div className='flex flex-col sm:flex-row w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Job Category</p>
            <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={(e)=>setcategory(e.target.value)}>
              {JobCategories.map((category,index)=>{
                return (
                  <option value={category} key={index}>{category}</option>
                )
              })}
            </select>
          </div>
          <div>
            <p className='mb-2'>Job Location</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={(e)=>setlocation(e.target.value)}>
              {JobLocations.map((location,index)=>{
                return (
                  <option value={location} key={index}>{location}</option>
                )
              })}
            </select>
          </div>
          <div>
            <p className='mb-2'>Job Level</p>
            <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={(e)=>setlevel(e.target.level)}>
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>
        <div>
          <p className='mb-2'>Job Salary</p>
          <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' type="number" placeholder='2500' onChange={(e)=>setsalary(e.target.value)}/>
        </div>
        <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
    </form>
  )
}

export default AddJob