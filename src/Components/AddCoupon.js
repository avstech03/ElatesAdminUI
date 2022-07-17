import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddCouponModal, addCoupon } from "../ReduxStore/Actions";
import apis from "../APICalls";

const couponApis = apis.couponApis();

const AddCoupon = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [priceMoreThan, setProceMoreThan] = useState(0);
    const [maximumDiscount, setMaximumDiscount] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    
    const onClickCancel = () => {
        dispatch(toggleAddCouponModal());
    };

    const onSubmit = () => {
        let body = {
            code,
            description,
            restrictions: {
                priceMoreThan,
                maximumDiscount,
                discountPercent
            }
        }
        couponApis.addCoupon(auth.userId, auth.token, body)
        .then(response => {
            dispatch(addCoupon(response));
        })
        onClickCancel();
    };

    return (
        <div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Code</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={code}
                    onChange={event => setCode(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Description</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">MinimumCartValue</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={priceMoreThan}
                    onChange={event => setProceMoreThan(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">MaximumDiscount</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={maximumDiscount}
                    onChange={event => setMaximumDiscount(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Percent</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt"
                    value={discountPercent}
                    onChange={event => setDiscountPercent(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container edit-user-container">
                <button onClick={() => onClickCancel()} className="btn add-new-product-btn">Cancel</button>
            </div>

            <div className="add-product-inpt-container edit-user-container">
                <button onClick={() => onSubmit()} className="btn add-new-product-btn">Save</button>
            </div>
        </div>
    )
};

export default AddCoupon;