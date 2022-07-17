import React, { useEffect, useState } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  toggleAddProductModal,
  toggleEditProductModal,
  filterProducts,
  getAllCategories,
} from "../ReduxStore/Actions";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";

const Promise = require("bluebird");

const productApis = apis.productApis();
const categoryApis = apis.categoryApis();

const Products = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [loader, setLoader] = useState(true);
  const [productId, setProductId] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const changeName = (event) => {
    setName(event.target.value);
    setIsFiltered(false);
  };

  const changeBrand = (event) => {
    setBrand(event.target.value);
    setIsFiltered(false);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
    setIsFiltered(false);
  };

  let products;
  useEffect(() => {
    const getProductsP = productApis
      .getAllProducts(props.auth.userId, props.auth.token)
      .then((response) => {
        dispatch(setProducts(response));
        console.log("Sunny@@     PRODUCTS!!!!!!   ", response);
      })
      .then(() => setLoader(false));
    const getCategoriesP = categoryApis
      .getAllCategories(props.auth.userId, props.auth.token)
      .then((response) => {
        dispatch(getAllCategories(response));
      });
    return Promise.join(getProductsP, getCategoriesP).tap(() => {
      setLoader(false);
    });
  }, []);

  let filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  let allProducts = useSelector((state) => state.products.products);
  let categories = useSelector((state) => state.categories.categories);

  if (isFiltered) products = filteredProducts;
  else products = allProducts;

  const addProductModalOpen = useSelector(
    (state) => state.toggler.addProductModal
  );
  const editProductModalOpen = useSelector(
    (state) => state.toggler.editProductModal
  );

  const getCategoryId = (name) => {
    let id = "";
    categories.forEach((cat) => {
      if (cat.name === name) {
        id = cat._id;
      }
    });
    return id;
  };

  const onClickProduct = (productId) => {
    setProductId(productId);
    document.getElementById("page").style.pointerEvents = "none";
    document.getElementById("page").style.opacity = "0.2";
    return dispatch(toggleEditProductModal());
  };

  const onFilterClick = () => {
    setIsFiltered(true);
    return dispatch(filterProducts(name, getCategoryId(category), brand));
  };

  const onClickNewAdd = () => {
    document.getElementById("page").style.pointerEvents = "none";
    document.getElementById("page").style.opacity = 0.2;
    return dispatch(toggleAddProductModal());
  };

  const onCategoryClick = (cat) => {
    setCategory(cat);
    setShowCategories(false);
  };

  return (
    <React.Fragment>
      {loader ? (
        <p className="loader">LOADING...</p>
      ) : (
        <React.Fragment>
          {(() => {
            if (addProductModalOpen) {
              return (
                <div className="add-product-modal w3-animate-zoom">
                  <div className="add-new-product-bg">
                    <div className="add-product-title-bg">
                      <p className="modal-title">ADD PRODUCT</p>
                    </div>
                    <AddNewProduct />
                  </div>
                </div>
              );
            } else if (editProductModalOpen) {
              return (
                <div className="add-product-modal w3-animate-zoom">
                  <div className="add-new-product-bg">
                    <div className="add-product-title-bg">
                      <p className="modal-title">EDIT PRODUCT</p>
                    </div>
                    <EditProduct productId={productId} />
                  </div>
                </div>
              );
            } else {
              return <React.Fragment />;
            }
          })()}
          <div id="page">
            {
              <div className="table-bg">
                {products.length === 0 ? (
                  <h3 className="no-products">OOPS! NO PRODUCTS</h3>
                ) : (
                  products.map((product) => {
                    return (
                      <div
                        className="product-card"
                        onClick={() => onClickProduct(product._id)}
                      >
                        <img className="product-img" src={product.pic} />
                        <div className="container">
                          <p className="product-title">
                            {product.brand} {product.name} (
                            {product.quantity[0].value}
                            {product.quantity[0].units})
                          </p>
                          <p className="mrp">
                            <s>{product.quantity[0].mrp}&#x20B9;</s>{" "}
                            {product.quantity[0].sellingPrice}&#x20B9;
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            }
            <div className="actions-bg">
              <button class="add-product-btn" onClick={() => onClickNewAdd()}>
                Add New
              </button>
              <br />
              {/* <div className="filter-form"> */}
              <div className="filter-label">Name</div>
              <input
                type="text"
                value={name}
                className="inpt filter-inpt"
                onChange={changeName}
              />
              <div className="filter-label">Category</div>
              <div>
                <input
                  type="text"
                  className="inpt filter-inpt"
                  value={category}
                  onChange={changeCategory}
                  onFocus={() => setShowCategories(true)}
                />
                {showCategories && categories.length > 0 ? (
                  <div className="filter-select-bg">
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
              <div className="filter-label">Brand</div>
              <input
                type="text"
                value={brand}
                className="inpt filter-inpt"
                onChange={changeBrand}
              />
              <br />
              <br />
              {!isFiltered ? (
                <button class="filter-btn" onClick={() => onFilterClick()}>
                  Filter
                </button>
              ) : (
                <button class="filter-btn" onClick={() => setIsFiltered(false)}>
                  Cancel
                </button>
              )}
              {/* </div> */}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Products;
