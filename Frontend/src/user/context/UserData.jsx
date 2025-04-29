import React, { createContext, useState, useEffect, useContext } from 'react'
import instance from '../../../axiosConfig'
import { useUserAuth } from './UserAuth'

export const userContext = createContext({})

function UserData({ children }) {
  const [hackathons, setHackathons] = useState([])
  const [userData, setUserData] = useState([])
  const { isAuthenticated } = useUserAuth()
  useEffect(() => {
    if (isAuthenticated) {
      showUserData()
    }
  }, [isAuthenticated])


  const showUserData = async () => {
    try {
      const response = await instance.get(`/user/hackathons`)
      setUserData(response.data.myUser);
      setHackathons(response.data.hackathons)
    } catch (error) {
      console.log(error, error.message);
    }
  }

  useEffect(() => {
    userNearMe()
  }, [userData])
  const [availableUser, setAvailableUser] = useState([])
  const [toggle, setToggle] = useState(false)

  async function userNearMe() {
    try {
      const response = await instance.get("/user/nearby-users")
      setAvailableUser(response.data.users)
      setToggle(true)
    } catch (error) {
      console.log(error.message);
      setToggle(false)
    }
  }


  return (
    <userContext.Provider value={{ toggle, availableUser, hackathons, userData, showUserData,setHackathons,userNearMe }}>
      {children}
    </userContext.Provider>
  )
}

export function useUserData() {
  return useContext(userContext)
}

export default UserData;