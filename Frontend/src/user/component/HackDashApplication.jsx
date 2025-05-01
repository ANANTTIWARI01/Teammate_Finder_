import React from 'react'
import { Link } from 'react-router-dom'

function HackDashApplication({hackathonName}) {
  return (
    <>
    
    <div className='flex flex-col justify-center items-center bg-gray-500 p-4 min-h-screen w-full'>

<div className='w-full flex justify-center items-start gap-6 '>

  <div className='flex flex-col bg-gray-300 px-4 py-6 w-[60%] rounded-lg'>
    
<div className='text-center my-[7%]'>
  <p className=' font-semibold text-xl'>Submitting Your Application will share the following with {hackathonName} organizers</p>
</div>

    <div className='mx-2 my-2'>
      <div></div>
      <div>
        <h1 className='text-2xl font-semibold'>About</h1>
        <h3 className='text-lg text-gray-500'>Your username,bio</h3>
      </div>
    </div>
    {/* ////.. */}
    <div className='mx-2 my-2'>
      <div></div>
      <div>
        <h1 className='text-2xl font-semibold'>Experience</h1>
        <h3 className='text-lg text-gray-500'>Your domain expertise,skills</h3>
      </div>
    </div>

    <div className='mx-2 my-2'>
      <div></div>
      <div>
        <h1 className='text-2xl font-semibold'>Links</h1>
        <h3 className='text-lg text-gray-500'>Your Online Profile Links</h3>
      </div>
    </div>

    <div className='mx-2 my-2'>
      <div></div>
      <div>
        <h1 className='text-2xl font-semibold'>Contact</h1>
        <h3 className='text-lg text-gray-500'>Your city, email and phone number</h3>
      </div>
    </div>

    <div className='text-center mx-4 my-4'>
      <Link to="/editUser" className='text-xl bg-blue-300 p-4 rounded-lg'>Continue to the Application</Link>
    </div>
  </div>

  <div className='w-[20%]'>
    <div className='bg-white p-6 rounded-lg'>
      <h1 className='text-2xl font-bold my-4'>{hackathonName}</h1>
      <h1 className=' text-lg font-semibold text-gray-500 my-1'>Hackathon Starts</h1>
      <h1 className='text-xl font-semibold'>Date:</h1>
      <h1 className='mt-3 text-lg font-semibold text-gray-500 my-1'>Hackathon Ends</h1>
      <h1 className='my-1 text-xl font-semibold'>Date:</h1>

    </div>
  </div>
</div>

</div>
    </>
  )
}

export default HackDashApplication