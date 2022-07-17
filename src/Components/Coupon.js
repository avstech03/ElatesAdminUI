import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import { setCoupons, toggleAddCouponModal, toggleEditCouponModal } from "../ReduxStore/Actions";
import AddCoupon from "./AddCoupon";
import EditCoupon from "./EditCoupon";

const couponApis = apis.couponApis();

const Coupons = props => {
    const auth = useSelector(state => state.auth);
    const coupons = useSelector(state => state.coupons.coupons);
    const addCouponModal = useSelector(state => state.toggler.addCouponModal);
    const editCouponModal = useSelector(state => state.toggler.editCouponModal);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState({});

    const fetchCoupons = () => {
        setLoader(true);
        couponApis.getCoupons(auth.userId, auth.token)
            .then(response => {
                setLoader(false);
                dispatch(setCoupons(response));
            });
    };

    const onClickAdd = () => {
        dispatch(toggleAddCouponModal());
    }

    const onClickCoupon = (coupon) => {
        setSelectedCoupon(coupon);
        dispatch(toggleEditCouponModal());
    }

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <React.Fragment>
            <div className="orders-bg coupons-bg">
            {
                        (() => {
                            if (addCouponModal) {
                                return (
                                    <div className="add-product-modal w3-animate-zoom">
                                        <div className="add-new-product-bg">
                                            <div className="add-product-title-bg">
                                                <p className="modal-title">ADD COUPON</p>
                                            </div>
                                            <AddCoupon/>
                                        </div>
                                    </div>
                                )
                            } else if (editCouponModal) {
                                return (
                                    <div className="add-product-modal w3-animate-zoom">
                                        <div className="add-new-product-bg">
                                            <div className="add-product-title-bg">
                                                <p className="modal-title">EDIT COUPON</p>
                                            </div>
                                        <EditCoupon coupon={selectedCoupon}/>
                                        </div>
                                    </div>
                                )
                            }
                        })()
                    }
                {
                    loader ? <p className="loader">LOADING...</p>
                        :
                        coupons && coupons.length > 0
                            ?
                            <div>
                                <div>
                                    {
                                        coupons.map(coupon => {
                                            return (
                                                <div className="order-card" onClick={() => onClickCoupon(coupon)}>
                                                    <div className="order-text coupon-text">Code : {coupon.code.toUpperCase()}</div>
                                                    <div className="order-text coupon-text">Discount : {coupon.restrictions.discountPercent}%</div>
                                                    <div className="order-text coupon-text">MaxDiscount : {coupon.restrictions.maximumDiscount} Rs</div>
                                                    <div className="order-text coupon-text">Min Cart Value : {coupon.restrictions.priceMoreThan} Rs</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div> NO COUPONS </div>
                }
            </div>

            <div className="actions-bg-order">
                <button class="add-product-btn" onClick={() => onClickAdd()}>
                    Add New
                </button>
            </div>
        </React.Fragment>
    )
}

export default Coupons;