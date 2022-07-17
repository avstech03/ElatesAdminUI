import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditCouponModal, editCoupon, deleteCoupon } from "../ReduxStore/Actions";
import apis from "../APICalls";

const couponApis = apis.couponApis();

const AddCoupon = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [code, setCode] = useState(props.coupon.code);
    const [description, setDescription] = useState(props.coupon.description);
    const [priceMoreThan, setProceMoreThan] = useState(props.coupon.restrictions.priceMoreThan);
    const [maximumDiscount, setMaximumDiscount] = useState(props.coupon.restrictions.maximumDiscount);
    const [discountPercent, setDiscountPercent] = useState(props.coupon.restrictions.discountPercent);
    
    const onClickCancel = () => {
        dispatch(toggleEditCouponModal());
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
        couponApis.editCoupon(auth.userId, auth.token, body, props.coupon._id)
        .then(response => {
            dispatch(editCoupon(response));
        })
        onClickCancel();
    };

    const onDelete = () => {
        couponApis.deleteCoupon(auth.userId, auth.token, props.coupon._id)
        .then(response => {
            dispatch(deleteCoupon(props.coupon));
        })
        onClickCancel();
    }

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

            <div className="add-product-inpt-container edit-user-container">
                <button onClick={() => onDelete()} className="btn add-new-product-btn">Del</button>
            </div>
        </div>
    )
};

export default AddCoupon;