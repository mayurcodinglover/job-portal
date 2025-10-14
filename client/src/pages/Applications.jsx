import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets';
import moment from "moment";
import Footer from '../components/Footer'

const Applications = () => {
  const [isEdit, setisEdit] = useState(false);
  const [Resume, setResume] = useState(null);
  return (
    <>
      <Navbar/>
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'> 
          { isEdit ? 
          <>
            <label htmlFor="resumeUpload" className='flex item-center'>
              <p className='bg-blue-100 text-blue-600 w-[9rem] px-4 py-2 rounded-lg mr-2'>Select Resume</p>
              <input type="file" name="resumeUpload" id="resumeUpload" onChange={e=>setResume(e.target.files[0])} accept='application/pdf' hidden/>
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button className='bg-green-100 border border-green-400 px-4 py-2 rounded-lg ' onClick={()=>setisEdit(false)}>Save</button>
          </>
          :
          <div className='flex gap-2'>
            <a href="" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</a>
            <button className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2' onClick={()=>setisEdit(true)}>Edit</button>
          </div>
          }
        </div>
          <h2 className='text-xl font-semibold mb-4 '>Jobs Applied</h2>
          <table className='min-w-full bg-white border rounded-lg'>
            <thead>
                <tr className='py-3 px-4 border-b text-left'>
                  <th className='py-3 px-4 border-b text-left'>Company</th>
                  <th className='py-3 px-4 border-b text-left'>Job Title</th>
                  <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
                  <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
                  <th className='py-3 px-4 border-b text-left'>Status</th>
                </tr>
            </thead>
            <tbody>
                  {jobsApplied.map((job,index)=> true ? (
                    <tr className='border-gray-500 border-b'>
                      <td className='py-3 px-4 flex item-center gap-2'>
                        <img className='w-8 h-8' src={job.logo} alt="" />
                        {job.company}
                      </td>
                      <td className='py-2 px-4'>{job.title}</td>
                      <td className='py-2 px-4 max-sm:hidden'>{job.location}</td>
                      <td className='py-2 px-4 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                      <td className='py-2 px-4 '>
                        <span className={`${job.status==='Accepted' ? 'bg-green-100' : job.status==='Rejected' ? 'bg-red-100' :'bg-blue-100'} px-4 py-1.5 rounded}`}>
                          {job.status}
                        </span>
                      
                      </td>
                    </tr>
                  ): (null))}
            </tbody>
          </table>
      </div>
      <Footer/>
    </>
  )
}

export default Applications