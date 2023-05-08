//We will create a react context in this file that will house all authentication info (currentUser, Login, Logout). React context allo9w us to store info and transport it to the components and use it. We could store this info in the App component and just pass props to send the user information to other components, but this isnt ideal for larger apps. Instead we create the context and a component that will pass this context to its children. Think of this much like Session storage in a .NET application.
import React, {useContext, useEffect, useState} from "react";
import {auth } from '../base'; //Givess us access to the auth object which initializes authentication.
//below are firebase objects we need to use in our Logic in the component portion of the code.
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

//below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

//below we create a function that will allow us to use the context in components. We will import this function anytime we want the currentUser, Login, or Logout functionality
export function useAuth() {
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside of it. See App.js where we call to an instance of this component and nest all other components inside of it
export default function AuthProvider({children}) {
    //create react hooks for currentUser and another custom hook to determine if the context has info to share with child components before rendering those children to the screen
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Login functionality 
    //  FIRST we instantiate a GitHubAuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authDate => {
            console.log(authDate)
            setCurrentUser(authDate.user)
            //Here we could add additional functionality we want to fire off upon a user logging in
            //For example, I could give them a rule or save their info to a local db.
        }))
    }

    //Logout fuctionallity 
    async function logout(){
        signOut(auth).then(setCurrentUser(null))
    }

    //The object below will hold currentUser info and login/logout functions so we can use them in the child components. We will pass this as a prop in the return below
    const value = {currentUser, login, logout}

    useEffect(() => {
        //authChange will use firebase functionallity to get user info, set the currentUser hook to the value retrieved, and will allow components to load in using out custom hook (loading)
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return authChange
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {/* Below we are waiting for the AuthContext info to populate before loading the children in the UI */}
            {!loading && children}
        </AuthContext.Provider>
    )
}