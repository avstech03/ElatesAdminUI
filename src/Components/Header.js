import React from 'react';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginAction, changeTab} from "../ReduxStore/Actions";

const Header = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        dispatch(loginAction({token: "", user: ""}));
        history.push("/login");
    }
    return (
        <React.Fragment>
            <div className="header">
                <div className="header-brand">Elates Grocer</div>
                
                <div className="tab" onClick={() => dispatch(changeTab("products"))}>products</div>
                <div className="tab" onClick={() => dispatch(changeTab("category"))}>category</div>
                <div className="tab" onClick={() => dispatch(changeTab("orders"))}>orders</div>
                <div className="tab" onClick={() => dispatch(changeTab("users"))}>users</div>
                <div className="tab" onClick={() => dispatch(changeTab("offers"))}>offers</div>
                <div className="tab" onClick={() => dispatch(changeTab("coupons"))}>coupons</div>
                <div className="tab" onClick={() => dispatch(changeTab("seeddata"))}>seeddata</div>
                <div className="tab" onClick={() => dispatch(changeTab("hometemplate"))}>hometemplate</div>

                <button className="logout-btn" onClick={() => logout()}>logout</button>
                <div className="username">{props.username}</div>
            </div>
        </React.Fragment>
    )
};

export default Header;