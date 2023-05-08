import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function Navigation() {
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>Todo</Navbar.Brand>

        <Navbar.Collapse className='justify-content-end'>

            <Nav>
            {currentUser &&
                <>
                  <Link to='/todo' className='nav-link'>Todo</Link>
                  <Link to='/categories' className='nav-link'>Categories</Link>
                </>
              }
              {/* Below we conditionally render the Login link if there is no currentUser */}
              {!currentUser &&
                <Link to='/login' className='nav-link'>Login</Link>
              }

                
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
