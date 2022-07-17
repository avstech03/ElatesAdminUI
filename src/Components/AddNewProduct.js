import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleAddProductModal } from "../ReduxStore/Actions";
import apis from "../APICalls";
import { addNewProduct } from "../ReduxStore/Actions";
const _ = require("lodash");

const productApis = apis.productApis();
const uploadApis = apis.uploadApis();

const AddNewProduct = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [pic, setPic] = useState("");
    const [quantities, setQuantities] = useState([]);
    const [mrp, setMrp] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [membershipPrice, setMemberShipPrice] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [units, setUnits] = useState("");
    const [showCategories, setShowCategories] = useState(false);
    const [maxQuantity, setMaxQuantity] = useState(5);
    const [isFileLoaded, setIsFileLoaded] = useState(true);
    const [fileName, setFileName] = useState("");

    const inputs = ["mrp", "sellingprice", "specialprice", "availablequantity", "units", "quantity"];
    const onNameChange = event => setName(event.target.value);
    const onBrandChange = event => setBrand(event.target.value);
    const onCategoryChange = event => setCategory(event.target.value);
    const onPicChange = event => setPic(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onMrpChange = event => setMrp(event.target.value);
    const onMaxQuantityChange = event => setMaxQuantity(event.target.value);
    const onChangePic = event => {
        setIsFileLoaded(false);
        event.preventDefault();
        let data = new FormData();
        setFileName(event.target.value);
        data.append("image", event.target.files[0]);
        uploadApis.uploadFile(auth.userId, auth.token, data)
            .then(response => {
                if (response) {
                    setIsFileLoaded(true);
                    setPic(response.Location);
                }
            })
    }

    const onSellingPriceChange = event => setSellingPrice(event.target.value)
    const onMembershipPriceChange = event => setMemberShipPrice(event.target.value);
    const onUnitsChange = event => setUnits(event.target.value);
    const onQuantityChange = event => setQuantity(event.target.value);
    const onChangeAvailableQuantity = event => setAvailableQuantity(event.target.value);

    let categories = useSelector(state => state.categories.categories);

    const getCategoryId = (name) => {
        let id = "";
        categories.forEach(cat => {
            if (cat.name === name) {
                id = cat._id;
            }
        });
        return id;
    };

    const addQuantity = () => {
        setUnits("");
        setAvailableQuantity(0);
        setMrp(0);
        setSellingPrice(0);
        setQuantity(0);
        setMemberShipPrice(0);
        setQuantities([...quantities, { sellingPrice, mrp, membershipPrice, availableQuantity, units, value: quantity }])
    };

    const delQuantity = (obj) => {
        let _quantities = _.cloneDeep(quantities);
        _.remove(_quantities, { _id: obj._id });
        _.remove(_quantities, { value: obj.value, units: obj.units });
        setQuantities(_quantities);
    };

    const onCategoryClick = (cat) => {
        setCategory(cat);
        setShowCategories(false);
    }

    const onSubmit = () => {
        const json = {
            name,
            brand,
            category: getCategoryId(category),
            description,
            pic,
            quantity: quantities,
            maxQuantity,
        };
        return productApis.addNewProduct(auth.userId, auth.token, json)
            .then(response => {
                document.getElementById("page").style.pointerEvents = "auto";
                document.getElementById("page").style.opacity = "1";
                dispatch(addNewProduct(response));
                dispatch(toggleAddProductModal());
            });
    }

    const onClickCancel = () => {
        document.getElementById("page").style.pointerEvents = "auto";
        document.getElementById("page").style.opacity = "1";
        return dispatch(toggleAddProductModal());
    }

    return (
        <React.Fragment>
            {
                isFileLoaded ?
                    <React.Fragment>
                        {/* MAIN FIELDS */}
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

                        {/* <div className="add-product-inpt-container">
                    <div className="add-product-label">Pic</div>
                    <input
                        type="text"
                        className="inpt add-new-product-inpt"
                        value={pic}
                        onChange={onPicChange}
                    />
                </div> */}

                        <div className="add-product-inpt-container">
                            <div className="add-product-label">MaxQuantity</div>
                            <input
                                type="text"
                                className="inpt add-new-product-inpt"
                                value={maxQuantity}
                                onChange={onMaxQuantityChange}
                            />
                        </div>

                        <div className="add-product-inpt-container file-container">
                            <div className="add-product-label"></div>
                            <label for="file-upload" class="custom-file-upload">
                                Upload Pic
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                onChange={onChangePic}
                            />
                            <input
                                type="text"
                                className="inpt file-upload-inpt"
                                value={fileName}
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
                    </React.Fragment>
                    :
                    <div className="add-product-loading">
                        LOADING....
            </div>
            }
        </React.Fragment>
    )
};

export default AddNewProduct;