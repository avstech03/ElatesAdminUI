import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddCategoryModal, addCategory } from "../ReduxStore/Actions";
import apis from "../APICalls";

const categoryApis = apis.categoryApis();
const uploadApis = apis.uploadApis();

const AddCategory = props => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pic, setPic] = useState("");
    const [category, setCategory] = useState("");
    const [showCategories, setShowCategories] = useState(false);
    const [isFileLoaded, setIsFileLoaded] = useState(true);
    const [fileName, setFileName] = useState("");
    const [isMainCategory, setIsMainCategory] = useState(false);


    const onNameChange = event => setName(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onCategoryChange = event => setCategory(event.target.value);
    const onPicChange = event => setPic(event.target.value);

    const onClickCancel = () => {
        document.getElementById("category").style.pointerEvents = "auto";
        document.getElementById("category").style.opacity = 1;
        return dispatch(toggleAddCategoryModal());
    };

    const getCategoryId = (name) => {
        let id = "";
        categories.forEach(cat => {
            if(cat.name === name) {
                id = cat._id;
            }
        });
        return id;
    };

    const onSubmit = () => {
        const json = {
            name,
            pic,
            category: getCategoryId(category),
            description,
            isMainCategory
        };
        return categoryApis.addCategory(auth.userId, auth.token, json)
            .then(response => {
                document.getElementById("category").style.pointerEvents = "auto";
                document.getElementById("category").style.opacity = "1";
                dispatch(addCategory(response));
                dispatch(toggleAddCategoryModal());
            });
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
    }

    const categories = useSelector(state => state.categories.categories);

    return (
        <React.Fragment>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Name</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={name}
                    onChange={onNameChange}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Description</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={description}
                    onChange={onDescriptionChange}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Is Main Category</div>
                <input
                    type="checkbox"
                    checked={isMainCategory}
                    className=""
                    onChange={() => setIsMainCategory(!isMainCategory)}
                />
            </div>
            <div className="add-product-inpt-container">
                <div className="add-product-label">Category</div>
                <input
                    type="text"
                    className="inpt add-new-product-inpt add-category-inpt"
                    value={category}
                    onChange={onCategoryChange}
                    onFocus={() => setShowCategories(true)}
                />
                {
                    showCategories && categories.length > 0 ?
                        <div className="filter-select-bg add-category-select-bg">
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

            <div className="add-product-inpt-container">
                <button onClick={() => onClickCancel()} className="btn add-new-product-btn">Cancel</button>
            </div>

            <div className="add-product-inpt-container">
                <button onClick={() => onSubmit()} className="btn add-new-product-btn">Save</button>
            </div>
        </React.Fragment>
    );
};

export default AddCategory;