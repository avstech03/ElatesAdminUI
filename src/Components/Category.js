import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCategories,
    toggleAddCategoryModal,
    toggleEditCategoryModal,
} from "../ReduxStore/Actions";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const categoryApis = apis.categoryApis();

const Category = props => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [category, setCategory] = useState({});

    let categories = [];

    useEffect(() => {
        categoryApis.getAllCategories(auth.userId, auth.token)
        .then(response => {
            dispatch(getAllCategories(response));
            setLoader(false);
        });
    }, []);

    categories = useSelector(state => state.categories.categories);
    
    const addCategoryModal = useSelector(state => state.toggler.addCategoryModal);
    const editCategoryModal = useSelector(state => state.toggler.editCategoryModal);

    const onClickAddCategory = () => {
        document.getElementById("category").style.pointerEvents = "none";
        document.getElementById("category").style.opacity = 0.2;
        return dispatch(toggleAddCategoryModal());
    };

    const onClickCategory = category => {
        setCategory(category);
        document.getElementById("category").style.pointerEvents = "none";
        document.getElementById("category").style.opacity = "0.2";
        return dispatch(toggleEditCategoryModal());
    };

    return (
        <React.Fragment>
            {
                (() => {
                    if(addCategoryModal) {
                        return (
                            <div className="add-category-modal w3-animate-zoom">
                                <div className="add-category-bg">
                                    <div className="add-product-title-bg">
                                        <p className="modal-title">ADD CATEGORY</p>
                                    </div>
                                    <AddCategory/>
                                </div>
                            </div>
                        )
                    } else if(editCategoryModal) {
                        return (
                            <div className="add-category-modal w3-animate-zoom">
                                <div className="add-category-bg">
                                    <div className="add-product-title-bg">
                                        <p className="modal-title">ADD CATEGORY</p>
                                    </div>
                                    <EditCategory category={category}/>
                                </div>
                            </div>
                        )
                    }
                })()
            }
            <div id="category">
                <div className="category-bg">
                    {
                        categories.map(category => {
                            return (
                                <div className="category-card" onClick={() => onClickCategory(category)}>
                                    <div className="category-content">
                                        <div className="category-name">{category.name}</div>
                                        <hr className="line"/>
                                        <div className="category-description">{category.description}</div>
                                    </div>
                                    <img src={category.pic} className="category-img"/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="category-action">
                    <div className="category-action-card">
                        <button className="category-add-btn" onClick={() => onClickAddCategory()}>ADD CATEGORY</button>
                        <br/>
                        <div className="pro-tip">
                            <img className="pro-tip-img" src="https://cdn0.iconfinder.com/data/icons/ui-beast-6/32/UI-19-128.png"/>
                            <div className="category-description pro-tip-text">
                                To create sub category add category to a category.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Category;

