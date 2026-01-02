import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../constants/user';
import { useEffect } from 'react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    console.log("Checking authentication status in PrivateRoute.");

    const navigate = useNavigate();
    useEffect(() => {
        isAuthenticated().then(res => {
            console.log("isAuthenticated result:", res)
            if(res.data == false) {
                console.log("User not authenticated according to server response, redirecting to login.");
                navigate("/login");
            }
        }).catch(err => {
            console.error("isAuthenticated error:", err)
        });
    }, []);

    return children
}
