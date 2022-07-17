import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleEditProductModal, updateProduct, toggleDeleteProductModal, deleteProduct } from "../ReduxStore/Actions";
import apis from "../APICalls";

const _ = require("lodash");
const productApis = apis.productApis();

const EditProduct = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const deleteToggleOpen = useSelector(state => state.toggler.deleteProductModal);

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [units, setUnits] = useState("");
    const [description, setDescription] = useState("");
    const [pic, setPic] = useState("");
    const [mrp, setMrp] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [membershipPrice, setMembershipPrice] = useState(0);
    const [quantity, setQuantity] = useState();
    const [isMultipleDeliveryAvailable, setIsMultipleDeliveryAvailable] = useState(false);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [quantities, setQuantities] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [maxQuantity, setMaxQuantity] = useState(5);
    const [id, setId] = useState("");

    const onNameChange = event => setName(event.target.value);
    const onBrandChange = event => setBrand(event.target.value);
    const onCategoryChange = event => setCategory(event.target.value);
    const onMrpChange = event => setMrp(event.target.value);
    const onSellingPriceChange = event => setSellingPrice(event.target.value);
    const onMembershipPriceChange = event => setMembershipPrice(event.target.value);
    const onUnitsChange = event => setUnits(event.target.value);
    const onQuantityChange = event => setQuantity(event.target.value);
    const onPicChange = event => setPic(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onChangeIsMultipleDeliveryAvailable = event => setIsMultipleDeliveryAvailable(!isMultipleDeliveryAvailable);
    const onChangeAvailableQuantity = event => setAvailableQuantity(event.target.value);
    const onMaxQuantityChange = event => setMaxQuantity(event.target.value);
    // const onIdChange = event => setId(event.target.value);

    let categories = useSelector(state => state.categories.categories);

    useState(() => {
        productApis.getProduct(auth.userId, auth.token, props.productId)
            .then(response => {
                setId(response._id);
                setName(response.name);
                setBrand(response.brand);
                setCategory(getCategoryName(response.category));
                setDescription(response.description);
                setMembershipPrice(response.membershipPrice);
                setIsMultipleDeliveryAvailable(response.isMultipleDeliveryAvailable);
                setPic(response.pic);
                setQuantities(response.quantity);
                setMaxQuantity(response.maxQuantity);
            })
    }, []);

    const onSubmit = () => {
        const json = {
            name,
            brand,
            category: getCategoryId(category),
            description,
            pic,
            quantity: quantities,
            isMultipleDeliveryAvailable,
            maxQuantity,
        };
        return productApis.updateProduct(auth.userId, auth.token, props.productId, json)
            .then(response => {
                document.getElementById("page").style.pointerEvents = "auto";
                document.getElementById("page").style.opacity = "1";
                dispatch(updateProduct(props.productId, json));
                dispatch(toggleEditProductModal());
            });
    };

    const getCategoryId = (name) => {
        let id = "";
        categories.forEach(cat => {
            if (cat.name === name) {
                id = cat._id;
            }
        });
        return id;
    };

    const getCategoryName = (id) => {
        let name = "";
        categories.forEach(cat => {
            if (cat._id === id) name = cat.name;
        });
        return name;
    };

    const addQuantity = () => {
        setUnits("");
        setAvailableQuantity(0);
        setMrp(0);
        setSellingPrice(0);
        setQuantity(0);
        setMembershipPrice(0);
        setQuantities([...quantities, { sellingPrice, mrp, membershipPrice, availableQuantity, units, value: quantity }])
    };

    const delQuantity = (obj) => {
        let _quantities = _.clone(quantities);
        _.remove(_quantities, { _id: obj._id });
        _.remove(_quantities, { value: obj.value, units: obj.units });
        setQuantities(_quantities);
    };

    const onClickDelete = () => {
        document.getElementById("edit-product-bg").style.pointerEvents = "none";
        document.getElementById("edit-product-bg").style.opacity = "0.2";
        dispatch(toggleDeleteProductModal());
    };

    const onClickCancel = () => {
        document.getElementById("page").style.pointerEvents = "auto";
        document.getElementById("page").style.opacity = "1";
        return dispatch(toggleEditProductModal());
    };

    const onClickDeleteYes = () => {
        document.getElementById("edit-product-bg").style.pointerEvents = "auto";
        document.getElementById("edit-product-bg").style.opacity = "1";
        document.getElementById("page").style.pointerEvents = "auto";
        document.getElementById("page").style.opacity = "1";
        return productApis.deleteProduct(auth.userId, auth.token, props.productId)
            .then(response => dispatch(deleteProduct(props.productId)))
            .then(() => dispatch(toggleDeleteProductModal()))
            .then(() => dispatch(toggleEditProductModal()));
    };

    const onClickDeleteNo = () => {
        document.getElementById("edit-product-bg").style.pointerEvents = "auto";
        document.getElementById("edit-product-bg").style.opacity = "1";
        dispatch(toggleDeleteProductModal());
    };

    const onCategoryClick = (cat) => {
        setCategory(cat);
        setShowCategories(false);
    };

    return (
        <React.Fragment>
            {(() => {
                if (deleteToggleOpen) {
                    return <div className="delete-product-modal w3-animate-zoom">
                        <p className="modal-title delete-modal-title">Are you sure?</p>
                        <div className="btn-bg">
                            <button className="btn add-new-product-btn delete-btn block-btn" onClick={() => onClickDeleteYes()}>Yes</button>
                            <button className="btn add-new-product-btn block-btn" onClick={() => onClickDeleteNo()}>No</button>
                        </div>
                    </div>
                } else {
                    return <React.Fragment />
                }
            })()}
            <div id="edit-product-bg">

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Id</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={id}
                        id="quantityId"
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Name</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={name}
                        onChange={onNameChange}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Brand</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={brand}
                        onChange={onBrandChange}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Category</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={category}
                        onChange={onCategoryChange}
                        onFocus={() => setShowCategories(true)}
                    />
                    {
                        showCategories && categories && categories.length > 0 ?
                            <div className="filter-select-bg add-product-select-bg">
                                <ul className="filter-select-ele" onClick={() => onCategoryClick("")}>none</ul>
                                {
                                    categories.map(cate => {
                                        return <ul className="filter-select-ele" onClick={() => onCategoryClick(cate.name)}>{cate.name}</ul>
                                    })
                                }
                            </div>
                            :
                            <React.Fragment />
                    }
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Description</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={description}
                        onChange={onDescriptionChange}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Picture</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={pic}
                        onChange={onPicChange}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">MaxQuantity</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={maxQuantity}
                        onChange={onMaxQuantityChange}
                    />
                </div>

                <div className="add-product-inpt-container">
                    <div className="add-product-label">Mutliple Day Delivery</div>
                    <input
                        type="checkbox"
                        value={isMultipleDeliveryAvailable}
                        onChange={onChangeIsMultipleDeliveryAvailable}
                        className="checkbox"
                    />
                </div>

                {/* Quantity */}

                <div className="quantity-bg">

                    <div className="add-product-inpt-container">
                        <div className="add-product-label added-quantity-label">Quantity</div>
                        <input
                            type="text"
                            className="inpt add-new-product-inpt added-quantity"
                            value={quantity}
                            onChange={onQuantityChange}
                            id="quantity"
                        />
                    </div>

                    <div className="add-product-inpt-container">
                        <div className="add-product-label added-quantity-label">Units</div>
                        <input
                            type="text"
                            className="inpt add-new-product-inpt added-quantity"
                            value={units}
                            onChange={onUnitsChange}
                            id="units"
                        />
                    </div>
                    <div className="add-product-inpt-container">
                        <div className="add-product-label added-quantity-label">MRP</div>
                        <input
                            type="number"
                            className="inpt add-new-product-inpt added-quantity"
                            value={mrp}
                            onChange={onMrpChange}
                            id="mrp"
                        />
                    </div>

                    <div className="add-product-inpt-container">
                        <div className="add-product-label added-quantity-label">SellingPrice</div>
                        <input
                            type="number"
                            className="inpt add-new-product-inpt added-quantity"
                            value={sellingPrice}
                            onChange={onSellingPriceChange}
                            id="sellingprice"
                        />
                    </div>

                    <div className="add-product-inpt-container">
                        <div className="add-product-label added-quantity-label">SpecialPrice</div>
                        <input
                            type="number"
                            className="inpt add-new-product-inpt added-quantity"
                            value={membershipPrice}
                            onChange={onMembershipPriceChange}
                            id="specialprice"
                        />
                    </div>


                    <div className="add-product-inpt-container">
                        <div className="add-product-label added-quantity-label">Available Quantity</div>
                        <input
                            type="number"
                            value={availableQuantity}
                            onChange={onChangeAvailableQuantity}
                            className="inpt add-new-product-inpt added-quantity"
                            id="availablequantity"
                        />
                    </div>

                    <div className="add-product-inpt-container">
                        <button className="btn add-new-product-btn add-btn" onClick={() => addQuantity()}>ADD</button>
                    </div>
                </div>


                {/* Added Quantity */}
                {
                    quantities && quantities.length > 0 ?
                        <div className="quantity-bg">
                            <div className="added-quantities-ttl">Added Quantities</div>
                            {quantities.map(obj => {
                                return (
                                    <React.Fragment>
                                        <div className="add-product-inpt-container">
                                            <div className="add-product-label added-quantity-label">Quantity</div>
                                            <input
                                                type="string"
                                                className="inpt add-new-product-inpt added-quantity"
                                                value={obj.value}
                                                disabled
                                            />
                                        </div>

                                        <div className="add-product-inpt-container">
                                            <div className="add-product-label added-quantity-label">Units</div>
                                            <input
                                                type="text"
                                                className="inpt add-new-product-inpt added-quantity"
                                                value={obj.units}
                                                disabled
                                            />
                                        </div>
                                        <div className="add-product-inpt-container">
                                            <div className="add-product-label added-quantity-label">MRP</div>
                                            <input
                                                type="number"
                                                className="inpt add-new-product-inpt added-quantity"
                                                value={obj.mrp}
                                                disabled
                                            />
                                        </div>

                                        <div className="add-product-inpt-container">
                                            <div className="add-product-label added-quantity-label">SellingPrice</div>
                                            <input
                                                type="number"
                                                className="inpt add-new-product-inpt added-quantity"
                                                value={obj.sellingPrice}
                                                disabled
                                            />
                                        </div>

                                        <div className="add-product-inpt-container">
                                            <div className="add-product-label added-quantity-label">SpecialPrice</div>
                                            <input
                                                type="number"
                                                className="inpt add-new-product-inpt added-quantity"
                                                value={obj.membershipPrice}
                                                disabled
                                            />
                                        </div>


                                        <div className="add-product-inpt-container">
                                            <div className="add-product-label added-quantity-label">AvailableUnits</div>
                                            <input
                                                type="text"
                                                value={obj.availableQuantity}
                                                className="inpt add-new-product-inpt added-quantity"
                                                disabled
                                            />
                                        </div>
                                        <div className="add-product-inpt-container">
                                            <button className="btn add-new-product-btn add-btn" onClick={() => delQuantity(obj)}>DEL</button>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        :
                        <React.Fragment />
                }

                <div className="add-product-inpt-container">
                    <button onClick={() => onClickCancel()} className="btn add-new-product-btn">Cancel</button>
                </div>

                <div className="add-product-inpt-container">
                    <button onClick={() => onSubmit()} className="btn add-new-product-btn">Save</button>
                </div>

                <div className="add-product-inpt-container">
                    <button onClick={() => onClickDelete()} className="btn add-new-product-btn delete-btn">delete</button>
                </div>
            </div>
        </React.Fragment>
    )
};

export default EditProduct;