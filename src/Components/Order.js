import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditOrderModal, setOrders } from "../ReduxStore/Actions";
import EditOrder from "./EditOrder";

const moment = require("moment");
const orderApis = apis.orderApis();

const Orders = props => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [seletedOrder, setSelectedOrder] = useState({});
    const [filter, setFilter] = useState({
        status: "",
        from: "",
        to: "",
        type: "",
        userId: ""
    });
    const [showStatus, setShowStatus] = useState(false);
    const [showType, setShowType] = useState(false);
    const orders = useSelector(state => state.orders.orders);

    const editOrderModalOpen = useSelector(state => state.toggler.editOrderModal);

    const fetchOrders = () => {
        setLoader(true);
        orderApis.getOrders(auth.userId, auth.token, filter)
            .then((res) => {
                setLoader(false);
                dispatch(setOrders(res));
            });
    };

    const onClickOrder = (order) => {
        document.getElementById("orders-page").style.pointerEvents = "none";
        document.getElementById("orders-page").style.opacity = "0.2";
        setSelectedOrder(order);
        dispatch(toggleEditOrderModal());
    };

    const onFromChange = event => {
        setFilter({
            ...filter,
            from: event.target.value
        });
    }

    const onToChange = event => {
        setFilter({
            ...filter,
            to: event.target.value
        });
    }

    const onTypeChange = event => {
        setFilter({
            ...filter,
            type: event.target.value
        });
    }

    const onStatusChange = event => {
        setFilter({
            ...filter,
            status: event.target.value
        });
    }

    const onUserIdChange = event => {
        setFilter({
            ...filter,
            userId: event.target.value
        });
    };

    const onClickStatus = (sts) => {
        setFilter({
            ...filter,
            status: sts
        });
        setShowStatus(false);
    }

    const onClickType = (type) => {
        setFilter({
            ...filter,
            type: type
        });
        setShowType(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <React.Fragment>
            <div className="orders-bg">
                {
                    loader ? <p className="loader">LOADING...</p>
                        :
                        orders && orders.length > 0
                            ?
                            <div>
                                {
                                    (() => {
                                        if (editOrderModalOpen) {
                                            return <EditOrder order={seletedOrder} />
                                        }
                                    })()
                                }
                                <div id="orders-page">
                                    {
                                        orders.map(order => {
                                            return (
                                                <div className="order-card" onClick={() => onClickOrder(order)}>
                                                    <div className="order-text">{order._id.toUpperCase()}</div>
                                                    {
                                                        (() => {
                                                            if (order.status === "placed") {
                                                                return (
                                                                    <div>
                                                                        <div className="order-text status-text-placed">{order.status.toUpperCase()}</div>
                                                                        <progress className="order-status" max="100" value="25"></progress>
                                                                    </div>
                                                                )
                                                            } else if (order.status === "dispatched") {
                                                                return (
                                                                    <div>
                                                                        <div className="order-text status-text-dispatched">{order.status.toUpperCase()}</div>
                                                                        <progress className="order-status" max="100" value="50"></progress>
                                                                    </div>
                                                                )
                                                            } else if (order.status === "shipped") {
                                                                return (
                                                                    <div>
                                                                        <div className="order-text status-text-shipped">{order.status.toUpperCase()}</div>
                                                                        <progress className="order-status" max="100" value="75"></progress>
                                                                    </div>
                                                                )
                                                            } else if (order.status === "delivered") {
                                                                return (
                                                                    <div>
                                                                        <div className="order-text status-text-delivered">{order.status.toUpperCase()}</div>
                                                                        <progress className="order-status" max="100" value="100"></progress>
                                                                    </div>
                                                                )
                                                            } else if (order.status === "cancelled") {
                                                                return (
                                                                    <div>
                                                                        <div className="order-text status-text-cancelled">{order.status.toUpperCase()}</div>
                                                                        <progress className="order-status" max="100" value="0"></progress>
                                                                    </div>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                    <div className="order-text order-status-text-time">{moment(order.time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div> NO ORDERS </div>
                }
            </div>
            <div className="actions-bg-order">
                <div className="filter-label">From</div>
                <input
                    type="Date"
                    value={filter.from}
                    className="inpt filter-inpt order-filter-inpt"
                    onChange={onFromChange}
                />

                <div className="filter-label">To</div>
                <input
                    type="Date"
                    value={filter.to}
                    className="inpt filter-inpt order-filter-inpt"
                    onChange={onToChange}
                />

                <div className="filter-label">Status</div>
                <input
                    type="text"
                    value={filter.status}
                    className="inpt filter-inpt order-filter-inpt"
                    onFocus={() => setShowStatus(true)}
                />
                {
                    showStatus ?
                        <div className="filter-select-bg add-quantity-select-bg">
                            {
                                ["placed", "dispatched", "shipped", "delivered", "cancelled", "all"].map(sts => {
                                    return <ul className="filter-select-ele" onClick={() => onClickStatus(sts)}>{sts}</ul>
                                })
                            }
                            <ul className="filter-select-ele" onClick={() => setShowStatus(false)}>cancel</ul>
                        </div>
                        :
                        <React.Fragment />
                }

                <div className="filter-label">UserId</div>
                <input
                    type="text"
                    value={filter.userId}
                    className="inpt filter-inpt order-filter-inpt"
                    onChange={onUserIdChange}
                />

                <div className="filter-label">Type</div>
                <input
                    type="text"
                    value={filter.type}
                    className="inpt filter-inpt order-filter-inpt"
                    onFocus={() => setShowType(true)}
                />
                {
                    showType ?
                    <div className="filter-select-bg add-quantity-select-bg">
                        {
                            ["multiple", "single", "both"].map(sts => {
                                return <ul className="filter-select-ele" onClick={() => onClickType(sts)}>{sts}</ul>
                            })
                        }
                        <ul className="filter-select-ele" onClick={() => setShowType(false)}>cancel</ul>
                    </div>
                    :
                    <React.Fragment />
                }

                <button className="filter-btn order-filter-btn" onClick={() => fetchOrders()}>
                    Filter
                    </button>
            </div>
        </React.Fragment>
    )
};

export default Orders;