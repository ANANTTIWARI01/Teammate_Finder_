import React, { useEffect } from 'react'
import instance from '../../../axiosConfig';

function UserAvailable() {
useEffect(()=>{
userNearMe()
},[])

async function userNearMe(){
    try {
     await instance.get("/user/nearby-users")
    
    } catch (error) {
        console.log(error.message);
        
    }
}

  return (
    <div>UserAvailable</div>
  )
}

export default UserAvailable
