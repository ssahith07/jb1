import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header';

const JobDetails = (data) => {
    const {id} = useParams();
    const [job,setJob] = useState([]);
    // const{companyLogo}=data;
    useEffect(()=>{
        fetch(`http://localhost:5000/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data))
    }, [])

    const handleApply = async() =>{

    }
    const {_id,companyName, companyLogo, JobTitle, minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate, description} = useParams();
  return (
    // <div className='max-w-screen-2xl container mx-auto xl:px-24 px-24'>
    //   <Header title={"Single Job Page"} path={"Single Job"}/> 
    //   Job details:{id}
    //   <h1>{job.JobTitle}</h1>

    //   <div className='text-2xl font-semibold text-blue'>
    //     Job Details
    //   </div>

    //   <div className='flex gap-5'>
    //     <div className='box-border h-24 w-24 p-4 border-4'>
    //         <img src={job.companyLogo} alt="" />
    //     </div>

    //     {/* Content on the right side of the box */}
    //     <div>
    //       <h2 className='text-xl font-medium'>Company Name : {job.companyName}</h2>
    //       <h2 className='text-xl font-medium'>Job Role : {job.JobTitle}</h2>
    //     </div>
    //   </div>

    <section className='card'>
        <Link to={`/job-details/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start'>
            <img src={job.companyLogo} alt="" className='h-36 w-36' />
            <div>
                <h4 className='text-primary mb-1'>{companyName}</h4>
                <h3 className='text-lg font-semibold mb-2'>{JobTitle}</h3>
                <div className='text-primary text-3xl text-bold flex flex-wrap gap-2 mb-2'>
                    <ol className='my-4'>
                    <p>Company Name : {job.companyName}</p>
                    <p>Designation : {job.JobTitle}</p>
                    
                    </ol>
                </div>

                <p className='text-base text-primary/70'>{description}</p>
            </div>
        </Link>

      
    <button className='bg-green px-8 py-2 my-2 text-white rounded-full' onClick={handleApply}>Apply Now</button>
    </section>
    
  )
}

export default JobDetails
