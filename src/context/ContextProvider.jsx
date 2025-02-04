import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    role: null,

    setUser: () => { },
    setToken: () => { },
    setNotification: () => { },
    setRole: () => { },
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
    const [role, _setRole] = useState(localStorage.getItem('ROLE'))

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setRole = (role)=>{
        _setRole(role)
        if (role){
            localStorage.setItem('ROLE', role);
        } else {
            localStorage.removeItem('ROLE');
        }
    }

    return (
        <StateContext.Provider value={{
            // ADD VALUES HERE YOU WANT TO PASS

            user,
            setUser,

            token,
            setToken,

            notification,
            setNotification,

            role,
            setRole,


            // ADD ADDITIONAL VARIABLES HERE
            //EXAMPLES:
            /*  
            tasks,
            emojis
            */


        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);