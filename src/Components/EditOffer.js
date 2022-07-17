import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditOfferModal } from "../ReduxStore/Actions";
import apis from "../APICalls";

const uploadApis = apis.uploadApis();
const offerApis = apis.offerApis();

const EditOffer = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const categories = useSelector(state => state.categories.categories);

    const getCategoryName = (id) => {
        let name = "";
        categories.forEach(cat => {
            if (cat._id === id) name = cat.name;
        });
        return name;
    };

    const [name, setName] = useState(props.offer.name);
    const [isExpired, setIsExpired] = useState(props.offer.isExpired);
    const [category, setCategory] = useState(getCategoryName(props.offer.category));
    const [showCategories, setShowCategories] = useState(false);
    const [pic, setPic] = useState(props.offer.pic);
    const [offerValue, setOfferValue] = useState(props.offer.offerValue);
    const [isFileLoaded, setIsFileLoaded] = useState(true);
    const [fileName, setFileName] = useState("");

    const onClickCancel = () => {
        document.getElementById("offer-page").style.pointerEvents = "auto";
        document.getElementById("offer-page").style.opacity = 1;
        dispatch(toggleEditOfferModal());
    };

    const deleteOffer = () => {
        offerApis.deleteOffer(auth.userId, auth.token, props.offer._id)
        .then(() => {
            onClickCancel();
        })
    }

    const getCategoryId = (name) => {
        let id = "";
        categories.forEach(cat => {
            if (cat.name === name) {
                id = cat._id;
            }
        });
        return id;
    };

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

    const onCategoryClick = (cat) => {
        setCategory(cat);
        setShowCategories(false);
    };

    const onSubmit = () => {
        let body = {
            name,
            offerValue,
            isExpired,
            pic,
            category: getCategoryId(category)
        };

        offerApis.editOffer(auth.userId, auth.token, props.offer._id, body)
        .then(() => {
            onClickCancel();
        })
     };


    return (
        <React.Fragment>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Name</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container file-container">
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
            <div className="add-product-inpt-container">
                <div className="add-product-label">IsExpired</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={isExpired}
                    onChange={event => setIsExpired(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">OfferValue</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={offerValue}
                    onChange={event => setOfferValue(event.target.value)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Category</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={category}
                    onFocus={() => setShowCategories(true)}
                />
                {
                    showCategories && categories && categories.length > 0 ?
                        <div className="filter-select-bg add-category-select-bg">
                            <ul className="filter-select-ele" onClick={() => setShowCategories(false)}>none</ul>
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
                <button onClick={() => onClickCancel()} className="btn add-new-product-btn">Cancel</button>
            </div>

            <div className="add-product-inpt-container">
                <button onClick={() => onSubmit()} className="btn add-new-product-btn">Save</button>
            </div>

            <div className="add-product-inpt-container">
                <button onClick={() => deleteOffer()} className="btn add-new-product-btn">Delete</button>
            </div>
        </React.Fragment>
    )
};

export default EditOffer;