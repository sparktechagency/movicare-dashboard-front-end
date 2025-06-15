import React, { useContext, useEffect, useState } from 'react';
import { useProfileQuery } from '../redux/apiSlices/authSlice';

type User = {
  email: string;
  image: string;
  name: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN"; 
  status: "active" | "inactive"; 

};

export const UserContext = React.createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    // const {data: profile} = useProfileQuery({}); 
    const [user, setUser] = useState();
    const { data } = useProfileQuery({});
    const profile = data?.data 

    useEffect(() => {
        if (profile) {
            setUser(profile);
        }
    }, [profile]);


    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};