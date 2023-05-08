import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Auth/Login';
import Categories from './components/Categories/Categories';
import Navigation from './components/Navigation'
import NotFound from './components/NotFound/NotFound';
import Todo from './components/Todo/Todo';
import AuthProvider from './contexts/AuthContext'
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'



export default function App() {
  return (
    <div className="App">


<AuthProvider>
      <Router>
            <Navigation />
            {/* This is like a switch that decides what to render to the screen based on the url path. */}
            <Routes>
              {/* You should have one Route that has an exact path to "/".*/}
              <Route path='/' />
                
                {/*"/Login" should point to a login component. (For now, just render an h1 that says 'Login with GitHub' in the Login component.)*/}
                <Route path='/login' element={<Login />} />

                {/*"/Categories" should point to a Categories component (For now, just render and h1 that says 'Categories' in the Todos.)*/}
                <Route path='/categories' element={<ProtectedRoute><Todo /></ProtectedRoute>} />

                {/*"/Todos" should point to a Todos component. (For now, just render an h1 that says 'Todos' in the Todos component.)*/}
                <Route path='/todo' element={<ProtectedRoute><Categories /></ProtectedRoute>} />

                  {/*Create the NotFound component and render that in the Router as we did in react_todo_plus. */}
                  <Route path='*' element={<NotFound />} />

            </Routes>
        <Footer />
    </Router>
    </AuthProvider>
    </div>
  )
}