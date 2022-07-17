import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditUser } from "../ReduxStore/Actions";
import EditUser from "./EditUser";

const userApis = apis.userApis();

const Users = props => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [filter, setFilter] = useState({
        email: "",
        username: "",
        phoneNumber: "",
        membership: ""
    });
    const [showMembership, setShowMembership] = useState(false);
    const [seletedUser, setSelectedUser] = useState({});

    const editUserModal = useSelector(state => state.toggler.editUserModal);

    const fetchUsers = () => {
        setLoader(true);
        userApis.getUsers(auth.userId, auth.token, filter)
            .then(response => {
                setLoader(false);
                setUsers(response);
            });
    };

    const onClickUser = (user) => {
        setSelectedUser(user);
        dispatch(toggleEditUser())
    };

    const onClickMembership = (mem) => {
        setFilter({
            ...filter,
            membership: mem
        });
        setShowMembership(false);
    }

    const onEmailChange = event => setFilter({
        ...filter,
        email: event.target.value
    });

    const onUsernameChange = event => setFilter({
        ...filter,
        username: event.target.value
    });

    const onPhoneNumberChange = event => setFilter({
        ...filter,
        phoneNumber: event.target.value
    })

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <React.Fragment>
            {
                loader ? <p className="loader">LOADING...</p>
                    :
                    <div className="orders-bg">
                        {
                            (() => {
                                if(editUserModal) {
                                    return (
                                        <div className="add-product-modal w3-animate-zoom">
                                        <div className="add-new-product-bg">
                                            <div className = "add-product-title-bg">
                                                <p className="modal-title">USER</p>
                                            </div>
                                            <EditUser user={seletedUser}/>
                                        </div>
                                    </div>
                                    );
                                }
                            })()
                        }
                        {
                            users.map(user => {
                                return (
                                    <div className="order-card" onClick={() => onClickUser(user)}>
                                        <div className="order-text username-text">{user.username.toUpperCase()}</div>
                                        <div className="order-text email-text">{user.email.toUpperCase()}</div>
                                        <div className="order-text contactno-text">{user.phoneNumber}</div>
                                        <div className="order-text">Rs {user.walletAmount}</div>
                                        <div className="order-text status-text-placed membership-badge">
                                            {
                                                user.membershipObtained ? "PRIME MEMBER" : "NON PRIME MEMBER"
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            <div className="actions-bg-order">
                <div className="filter-label">Email</div>
                <input
                    type="text"
                    value={filter.email}
                    className="inpt filter-inpt order-filter-inpt"
                    onChange={onEmailChange}
                />

                <div className="filter-label">Username</div>
                <input
                    type="text"
                    value={filter.username}
                    className="inpt filter-inpt order-filter-inpt"
                    onChange={onUsernameChange}
                />

                <div className="filter-label">Phone Number</div>
                <input
                    type="text"
                    value={filter.phoneNumber}
                    className="inpt filter-inpt order-filter-inpt"
                    onChange={onPhoneNumberChange}
                />

                <div className="filter-label">membership</div>
                <input
                    type="text"
                    value={filter.membership}
                    className="inpt filter-inpt order-filter-inpt"
                    onFocus={() => setShowMembership(true)}
                />
                {
                    showMembership ?
                        <div className="filter-select-bg add-quantity-select-bg">
                            {
                                ["prime", "non-prime", "both"].map(sts => {
                                    return <ul className="filter-select-ele" onClick={() => onClickMembership(sts)}>{sts}</ul>
                                })
                            }
                            <ul className="filter-select-ele" onClick={() => setShowMembership(false)}>cancel</ul>
                        </div>
                        :
                        <React.Fragment />
                }

                <button className="filter-btn order-filter-btn" onClick={() => fetchUsers()}>
                    Filter
                    </button>
            </div>
        </React.Fragment>
    );
};

export default Users;