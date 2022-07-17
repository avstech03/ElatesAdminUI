import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditOrderModal, editOrder } from "../ReduxStore/Actions";

const moment = require("moment");
const productApis = apis.productApis();
const orderApis = apis.orderApis();
const _ = require("lodash");

const EditOrder = props => {
    const [productsToBeDelivered, setProductsToBeDelivered] = useState(props.order && props.order.cart && props.order.cart.products || []);
    const [status, setStatus] = useState(props.order.status);
    const [slot, setSlot] = useState(props.order.cart.slot);
    const [productNameMapper, setProductNameMapper] = useState({});
    const [productName, setProductName] = useState("");
    const [qty, setQty] = useState("");
    const [count, setCount] = useState(0);
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const [inCorrectName, setInCorrectName] = useState(false);
    const [showQty, setShowQty] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [validStatuses, setValidStatuses] = useState([]);

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        fetchProductNames(_.map(productsToBeDelivered, "productId"));
        onClickStatus(props.order.status);
    }, []);

    const fetchProduct = (name) => {
        productApis.fetchProductByName(auth.userId, auth.token, name)
            .then(response => {
                if (response) {
                    setInCorrectName(false);
                    setProduct(response);
                } else {
                    setInCorrectName(true);
                }
            });
    };

    const onNameChange = event => {
        setProductName(event.target.value);
        fetchProduct(event.target.value);
    }

    const onClickCancel = () => {
        document.getElementById("orders-page").style.pointerEvents = "auto";
        document.getElementById("orders-page").style.opacity = "1";
        dispatch(toggleEditOrderModal());
    }

    const fetchProductNames = (productIds) => {
        productApis.fetchProductNames(auth.userId, auth.token, productIds)
            .then(response => {
                if (response) setProductNameMapper(response);
            })
    }

    const onQuantityClick = (quantity) => {
        setQty(quantity);
        setShowQty(false);
    }

    // const addProduct = () => {
    //     let obj = _.clone(productsToBeDelivered);
    //     if (obj[product._id]) {
    //         obj[product._id][qty] = count;
    //     } else {
    //         obj[product._id] = {
    //             [qty]: count
    //         };
    //     }
    //     setProductName("");
    //     setCount(0);
    //     setQty("");
    //     setProductsToBeDelivered(obj);
    // };

    const onSave = () => {
        let body = {
            productsToBeDelivered: [productsToBeDelivered],
            status: status,
            slot: slot
        };
        let updatedOrder = {
            ...props.order,
            productsToBeDelivered: [productsToBeDelivered],
            status: status,
            slot: slot
        }
        orderApis.editOrder(auth.userId, auth.token, props.order._id, body)
            .then(response => {
                document.getElementById("orders-page").style.pointerEvents = "auto";
                document.getElementById("orders-page").style.opacity = "1";
                dispatch(editOrder(response));
                dispatch(toggleEditOrderModal());
            })
    }

    const onClickStatus = (sts) => {
        setStatus(sts);
        if(sts === "placed") setValidStatuses(["dispatched", "cancelled"]);
        else if(sts === "dispatched") setValidStatuses(["shipped", "cancelled"]);
        else if(sts === "shipped") setValidStatuses(["delivered", "cancelled"]);
        else if(sts === "delivered" || sts === "cancelled") setValidStatuses([]);
        setShowStatus(false);
    }

    return (
        <div className="edit-order-modal w3-animate-zoom ">
            <div className="edit-order-bg">
                <div className="add-product-inpt-container">
                    <div className="add-product-label">Username</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={props.order.userInfo.username}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">PhoneNumber</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={props.order.userInfo.phoneNumber}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Email</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={props.order.userInfo.email}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">PaymentMode</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={props.order.paymentMode}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Amount</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={props.order.cart.amount}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Time</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={moment(props.order.time).format("LL")}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">DeliveryType</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={props.order.cart.deliveryType}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Slot</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={slot}
                        onChange={e => setSlot(e.target.value)}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Address</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt edit-order-address-text"
                        value={`${props.order.deliveryAddress.HnoStreet}, ${props.order.deliveryAddress.cs}, ${props.order.deliveryAddress.pincode}, ${props.order.deliveryAddress.landmark}`}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Status</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={status}
                        onFocus={() => setShowStatus(true)}
                    />
                    {
                        showStatus ?
                            <div className="filter-select-bg add-quantity-select-bg order-status-bg">
                                {
                                    validStatuses.map(sts => {
                                        return <ul className="filter-select-ele" onClick={() => onClickStatus(sts)}>{sts}</ul>
                                    })
                                }
                                <ul className="filter-select-ele" onClick={() => setShowStatus(false)}>cancel</ul>
                            </div>
                            :
                            <React.Fragment />
                    }
                </div>

                {
                    props.order.cart.deliveryType === "multiple" ?
                        <React.Fragment>
                            <div className="add-product-inpt-container">
                                <div className="add-product-label">Frequency</div>
                                <input
                                    type="text"
                                    className="inpt add-new-product-inpt"
                                    value={props.order.cart.frequency}
                                />
                            </div>

                            <div className="add-product-inpt-container">
                                <div className="add-product-label">From</div>
                                <input
                                    type="text"
                                    className="inpt add-new-product-inpt"
                                    value={moment(props.order.cart.from).format("LL")}
                                />
                            </div>

                            <div className="add-product-inpt-container">
                                <div className="add-product-label">To</div>
                                <input
                                    type="text"
                                    className="inpt add-new-product-inpt"
                                    value={moment(props.order.cart.to).format("LL")}
                                />
                            </div>
                            <div className="add-product-inpt-container">
                                <div className="add-product-label">NextDeliveryDate</div>
                                <input
                                    type="text"
                                    className="inpt add-new-product-inpt"
                                    value={moment(props.order.nextDeliveryOn).format("LL")}
                                />
                            </div>
                        </React.Fragment>
                        :
                        

                        <div className="add-product-inpt-container">
                            <div className="add-product-label">DeliveryDate</div>
                            <input
                                type="text"
                                className="inpt add-new-product-inpt"
                                value={moment(props.order.cart.deliveryDate).format("LL")}
                            />
                        </div>
                }

                <div className="quantity-bg">
                    <div className="add-product-inpt-container">
                        <div className="add-product-label">Product</div>
                        <input
                            id="name"
                            type="text"
                            className="inpt add-new-product-inpt edit-order-inpt"
                            value={productName}
                            onChange={onNameChange}
                        />
                    </div>
                    <div className="add-product-inpt-container">
                        <div className="add-product-label">Quantity</div>
                        <input
                            id="quantity"
                            type="text"
                            className="inpt add-new-product-inpt edit-order-inpt"
                            value={qty}
                            onFocus={() => setShowQty(true)}
                        />
                        {
                            !inCorrectName && showQty && product.quantity && product.quantity.length > 0 ?
                                <div className="filter-select-bg add-quantity-select-bg">
                                    {
                                        product.quantity.map(quantity => {
                                            return <ul className="filter-select-ele" onClick={() => onQuantityClick(quantity.value)}>{quantity.value}</ul>
                                        })
                                    }
                                    <ul className="filter-select-ele" onClick={() => onQuantityClick("")}>cancel</ul>
                                </div>
                                :
                                <React.Fragment />
                        }
                    </div>
                    <div className="add-product-inpt-container">
                        <div className="add-product-label">Count</div>
                        <input
                            id="count"
                            type="text"
                            className="inpt add-new-product-inpt edit-order-inpt"
                            value={count}
                            onChange={event => setCount(event.target.value)}
                        />
                    </div>
                    {/* <div className="add-product-inpt-container">
                        {!inCorrectName ?
                            <button className="btn add-new-product-btn add-btn" onClick={() => addProduct()}>ADD</button>
                            :
                            <div />
                        }
                    </div> */}
                </div>
                {
                    inCorrectName ? <div className="add-product-inpt-container name-warning">InCorrectName</div> : <div />
                }

                <div className="quantity-bg">
                    {
                        props.order.cart.products.map(product => {
                            return (
                                <div>
                                    <div className="add-product-inpt-container">
                                        <div className="add-product-label">Product</div>
                                        <input
                                            type="text"
                                            className="inpt add-new-product-inpt edit-order-inpt"
                                            value={productNameMapper[product.productId]}
                                        />
                                    </div>
                                    <div className="add-product-inpt-container">
                                        <div className="add-product-label">Quantity</div>
                                        <input
                                            type="text"
                                            className="inpt add-new-product-inpt edit-order-inpt"
                                            value={product.quantity}
                                        />
                                    </div>
                                    <div className="add-product-inpt-container">
                                        <div className="add-product-label">Count</div>
                                        <input
                                            type="text"
                                            className="inpt add-new-product-inpt edit-order-inpt"
                                            value={product.count}
                                        />
                                    </div>
                                    {/* <div className="add-product-inpt-container">
                                        <button className="btn add-new-product-btn add-btn" onClick={() => deleteProduct(key, qty)}>DEL</button>
                                    </div> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="add-product-inpt-container">
                <button onClick={() => onClickCancel()} className="btn add-new-product-btn">Cancel</button>
            </div>
            <div className="add-product-inpt-container">
                <button onClick={() => onSave()} className="btn add-new-product-btn">Save</button>
            </div>
        </div>
    );
};

export default EditOrder;
