import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';




const LoginForm = ({isAuthenticated,setAuthenticated}) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const [email, pass] = e.target
        const response = await fetch('http://localhost:7000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uname: email.value,
                pass: pass.value
            })
        });
        if (response.ok) {
            const data = await response.json();
            setAuthenticated(true);
            console.log(data);
        } else {
            console.error('Error:', response.status);
        }



    };

    useState(() => {
        if (isAuthenticated) navigate ('/home'), { replace: true };
        
    }, [isAuthenticated, navigate]);


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="pass">Password:</label>
                    <input type="password" id="pass" name="pass" />
                </div>
                <button type="submit">Login</button>
            </form>

        </div>
    );
};

export default LoginForm;