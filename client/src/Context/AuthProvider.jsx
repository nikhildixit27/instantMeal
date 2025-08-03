import { createContext, useEffect, useState } from "react"
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("X");
    const [loading, setLoading] = useState(true);

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const RegisterWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [user])

    const authInfo = {
        user,
        register,
        login,
        logout,
        loginWithGoogle: RegisterWithGoogle,
        RegisterWithGoogle,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
