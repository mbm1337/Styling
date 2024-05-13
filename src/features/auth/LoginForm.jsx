import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({isAuthenticated,setAuthenticated}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const uname = data.get('uname');
        const pass = data.get('pass');
        if (uname === 'admin' && pass === 'admin') {
            setAuthenticated(true);
        } else {
            alert('Invalid username or password');
        }

    };

    useState(() => {
        if (isAuthenticated) naviegate('/home',{replace:true});
        
    }, [isAuthenticated]);


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <input type="submit" value="Login" />
                </div>
            </form>

        </div>
    );
};

export default LoginForm;