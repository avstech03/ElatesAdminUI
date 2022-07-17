import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditUser } from "../ReduxStore/Actions";

const userApis = apis.userApis();

const EditUser = props => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(props.user);
    const [money, setMoney] = useState(0);

    const auth = useSelector(state => state.auth);

    const onClickCancel = () => {
        dispatch(toggleEditUser());
    };

    const addToWallet = () => {
        userApis.addToWallet(auth.userId, auth.token, user._id, money)
        .then(response => {
            onClickCancel();
        })
    };

    const onChangeMoney = event => setMoney(event.target.value);

    return (
        <React.Fragment>
            <div className="add-product-inpt-container">
                <div className="add-product-label">UserName</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.username}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">Email</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.email}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">PhoneNumber</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.phoneNumber}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">WalletAmount</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.walletAmount}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">HNo</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.address.HnoStreet}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">City and State</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.address.cs}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">Pincode</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.address.pincode}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">Landmark</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.address.landmark}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">ReferalCode</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={user.referalCode}
                />
            </div>

            <div className="add-product-inpt-container">
                <div className="add-product-label">AddToWallet</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={money}
                    onChange={onChangeMoney}
                />
            </div>

            <div className="add-product-inpt-container edit-user-container">
                <button onClick={() => addToWallet()} className="btn add-new-product-btn">Add</button>
            </div>

            <div className="add-product-inpt-container edit-user-container">
                <button onClick={() => onClickCancel()} className="btn add-new-product-btn">Cancel</button>
            </div>

        </React.Fragment>
    )
};

export default EditUser;