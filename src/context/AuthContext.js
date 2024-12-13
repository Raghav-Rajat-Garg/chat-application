import { useContext, createContext, useEffect, useState } from "react";
import { 
	GoogleAuthProvider,
	signInWithRedirect, 
	signOut, 
	onAuthStateChanged, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signInWithPopup, 
	getAuth 
} from "firebase/auth";
import { auth } from '../firebase'

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser)
			setUser(currentUser)
		})
		return () => {
			unsubscribe()
		}
	}, [])

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
	}
	return (
		<UserContext.Provider value={{ googleSignIn, createUser, user, logout, signIn }}>
			{children}
		</UserContext.Provider>
	)
}

// export const UserAuth = () => {
// 	return useContext(UserContext)
// }