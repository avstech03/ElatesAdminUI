import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteCategoryModal,
  toggleEditCategoryModal,
  updateCategory,
  deleteCategory,
} from "../ReduxStore/Actions";
import apis from "../APICalls";

const categoryApis = apis.categoryApis();

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const deleteToggleOpen = useSelector(
    (state) => state.toggler.deleteCategoryModal
  );
  const auth = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [id, setId] = useState("");
  const [isMainCategory, setIsMainCategory] = useState(false);

  useEffect(() => {
    setName(props.category.name);
    setDescription(props.category.description);
    setPic(props.category.pic);
    setCategory(getCategoryName(props.category.category));
    setId(props.category._id);
    setIsMainCategory(props.category.isMainCategory);
  }, []);

  const getCategoryName = (id) => {
    let name = "";
    categories.forEach((cat) => {
      if (cat._id === id) name = cat.name;
    });
    return name;
  };

  const onClickDelete = () => {
    document.getElementById("edit-category").style.pointerEvents = "none";
    document.getElementById("edit-category").style.opacity = "0.2";
    dispatch(toggleDeleteCategoryModal());
  };

  const onClickCancel = () => {
    document.getElementById("category").style.pointerEvents = "auto";
    document.getElementById("category").style.opacity = "1";
    return dispatch(toggleEditCategoryModal());
  };

  const getCategoryId = (name) => {
    let id = "";
    categories.forEach((cat) => {
      if (cat.name === name) {
        id = cat._id;
      }
    });
    return id;
  };

  const onClickDeleteYes = () => {
    document.getElementById("category").style.pointerEvents = "auto";
    document.getElementById("category").style.opacity = "1";
    document.getElementById("edit-category").style.pointerEvents = "none";
    document.getElementById("edit-category").style.opacity = "0.2";
    return categoryApis
      .deleteCategory(auth.userId, auth.token, props.category._id)
      .then((response) => {
        dispatch(deleteCategory(props.category._id));
      })
      .then(() => dispatch(toggleDeleteCategoryModal()))
      .then(() => dispatch(toggleEditCategoryModal()));
  };
  const onClickDeleteNo = () => {
    document.getElementById("edit-category").style.pointerEvents = "auto";
    document.getElementById("edit-category").style.opacity = "1";
    dispatch(toggleDeleteCategoryModal());
  };
  const onNameChange = (event) => setName(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onCategoryChange = (event) => setCategory(event.target.value);
  const onCategoryClick = (cat) => {
    setCategory(cat);
    setShowCategories(false);
  };
  const onPicChange = (event) => setPic(event.target.value);
  const onSubmit = () => {
    const json = {
      _id: props.category._id,
      name,
      category: getCategoryId(category),
      pic,
      description,
      isMainCategory,
    };
    return categoryApis
      .updateCategory(auth.userId, auth.token, props.category._id, json)
      .then((response) => {
        document.getElementById("category").style.pointerEvents = "auto";
        document.getElementById("category").style.opacity = "1";
        dispatch(updateCategory(response._id, json));
        dispatch(toggleEditCategoryModal());
      });
  };

  return (
    <React.Fragment>
      {(() => {
        if (deleteToggleOpen) {
          return (
            <div className="delete-product-modal w3-animate-zoom">
              <p className="modal-title delete-modal-title">Are you sure?</p>
              <div className="btn-bg">
                <button
                  className="btn add-new-product-btn delete-btn block-btn"
                  onClick={() => onClickDeleteYes()}
                >
                  Yes
                </button>
                <button
                  className="btn add-new-product-btn block-btn"
                  onClick={() => onClickDeleteNo()}
                >
                  No
                </button>
              </div>
            </div>
          );
        } else {
          return <React.Fragment />;
        }
      })()}
      <div id="edit-category">
        <div className="add-product-inpt-container">
          <div className="add-product-label">Id</div>
          <input
            type="text"
            className="inpt add-new-product-inpt add-category-inpt"
            value={id}
          />
        </div>
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
          {showCategories && categories && categories.length > 0 ? (
            <div className="filter-select-bg add-category-select-bg">
              <ul
                className="filter-select-ele"
                onClick={() => onCategoryClick("")}
              >
                none
              </ul>
              {categories.map((cate) => {
                return (
                  <ul
                    className="filter-select-ele"
                    onClick={() => onCategoryClick(cate.name)}
                  >
                    {cate.name}
                  </ul>
                );
              })}
            </div>
          ) : (
            <React.Fragment />
          )}
        </div>
        <div className="add-product-inpt-container">
          <div className="add-product-label">Pic</div>
          <input
            type="text"
            className="inpt add-new-product-inpt add-category-inpt"
            value={pic}
            onChange={onPicChange}
          />
        </div>

        <div className="add-product-inpt-container">
          <button
            onClick={() => onClickCancel()}
            className="btn add-new-product-btn"
          >
            Cancel
          </button>
        </div>

        <div className="add-product-inpt-container">
          <button
            onClick={() => onSubmit()}
            className="btn add-new-product-btn"
          >
            Save
          </button>
        </div>

        <div className="add-product-inpt-container">
          <button
            onClick={() => onClickDelete()}
            className="btn add-new-product-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditProduct;
