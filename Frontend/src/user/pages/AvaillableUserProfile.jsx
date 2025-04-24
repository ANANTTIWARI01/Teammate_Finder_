import React from 'react'
import { useUserData } from '../context/UserData'

function UserProfile() {
  const { availableUser } = useUserData()
console.log(availableUser);

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile


