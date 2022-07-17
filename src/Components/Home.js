import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginAction } from "../ReduxStore/Actions";
import Header from "./Header";
import Products from './Products';
import Category from './Category';
import Order from './Order';
import Offers from './Offers';
import Users from './Users';
import SeedData from './SeedData';
import Coupons from './Coupon';
import HomeScreenTemplate from './HomeScreenTemplate';
import AdvanceHomeScreenTemplate from './AdvanceHomeScreenTemplate';
const config = require("../config/config.json");

const Tab = (tab, props) => {
    switch (tab) {
        case "products":
            return <Products {...props} />
        case "category":
            return <Category {...props} />
        case "offers":
            return <Offers {...props} />
        case "users":
            return <Users {...props} />
        case "coupons":
            return <Coupons {...props} />
        case "orders":
            return <Order {...props} />
        case "seeddata":
            return <SeedData {...props} />
        case "hometemplate":
            if(config.homescreenTemplate.advance.enable)
                return <AdvanceHomeScreenTemplate {...props}/>
            else
                return <HomeScreenTemplate {...props} />
    }
}

const Home = props => {
    let tab = useSelector(state => state.tab);
    if (tab) tab = tab.value;
    else tab = "products";
    return (
        <div>
            <Header username="SaiKiran" />
            {Tab(tab, props)}
        </div>
    )
}

const HomeHOC = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    let authInfo, token, userId, username;

    authInfo = useSelector(state => state.auth);

    useEffect(() => {
        token = Cookies.get("token");
        userId = Cookies.get("userId");
        username = Cookies.get("username");
        if (userId) userId = JSON.parse(userId);
        if (token) token = JSON.parse(token);
        if (username) username = JSON.parse(username);
        if (token && !authInfo.token) {
            dispatch(loginAction({ token, userId, username }));
        }
    }, []);

    return (
        <div>
            {
                token || authInfo.token ? <Home auth={authInfo} /> : history.push("/login")
            }
        </div>
    )
}

export default HomeHOC;