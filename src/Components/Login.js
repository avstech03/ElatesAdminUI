import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../ReduxStore/Actions';
import apis from "../APICalls";
import Cookies from "js-cookie";

const authApis = apis.authApis();

const Login = props => {
    const authInfo = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    if (authInfo.token) history.push("/home");

    useEffect(() => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");
        if(token && user) {
            dispatch(loginAction({token, user}));
            history.push("/home");
        }
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogginFailed, setIsLoginFailed] = useState(false);
    const [failureMessage, setFailureMessage] = useState("");

    const changeUserName = event => {
        setUsername(event.target.value);
    };

    const changePassword = event => {
        setPassword(event.target.value);
    };

    const login = () => {
        authApis.login({username, password}).then((response) => {
            if(response) {
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                if(response.status === 200) {
                    setIsLoginFailed(false);
                    Cookies.set("token", JSON.stringify(response.data.token), {expires: 1});
                    Cookies.set("userId", JSON.stringify(response.data.user._id), {expires: 1});
                    Cookies.set("username", JSON.stringify(response.data.user.username), {expires: 1});  
                    dispatch(loginAction({userId: response.data.user._id, username: response.data.user.username, token: response.data.token}));
                    history.push("/home");
                } else {
                    setIsLoginFailed(true);
                    setFailureMessage(response.data.err);
                }
            }
        });
    };

    return (
        <div>
            <center>

                <div className="login-card">
                    <div className="login-brand">Elates Grocer</div>
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        onChange={changeUserName}
                        value={username}
                        className="inpt login-usename-inpt"
                    />

                    <br/>

                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        onChange={changePassword}
                        value={password}
                        className="password"
                    />
                    
                    <br/>

                    <button className="login-btn" onClick={() => login()}>
                        login
                    </button>
                    {
                        isLogginFailed ? 
                            <p className="failure-message">
                                {failureMessage}
                            </p>
                        :
                            <React.Fragment/>
                    }
                </div>
            </center>
        </div>
    )
};

export default Login;