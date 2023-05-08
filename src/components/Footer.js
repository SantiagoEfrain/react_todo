import React from 'react'
//Logout will be conditionally rendered if the user is logged in, so we need currentUser
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'

export default function Footer() {
  const { currentUser } = useAuth()

  return (
    <>
      {currentUser &&
        <Logout />
      }
      <footer className="text-center text-white bg-info p-4">
          <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
      </footer>
    </>
  )
}
