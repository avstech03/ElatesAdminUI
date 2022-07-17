import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddOfferModal, toggleEditOfferModal } from "../ReduxStore/Actions";
import AddOffer from "./AddOffer";
import EditOffer from "./EditOffer";

const offerApis = apis.offerApis();

const Offers = props => {
    const auth = useSelector(state => state.auth);
    const addOfferModal = useSelector(state => state.toggler.addOfferModal);
    const editOfferModal = useSelector(state => state.toggler.editOfferModal);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [offers, setOffers] = useState([]);
    const [offer, setOffer] = useState({});

    const fetchOffers = () => {
        offerApis.getOffers(auth.userId, auth.token)
            .then(response => {
                if (response) setOffers(response);
            });
    };

    const onClickAddOffer = () => {
        document.getElementById("offer-page").style.pointerEvents = "none";
        document.getElementById("offer-page").style.opacity = 0.2;
        dispatch(toggleAddOfferModal());
    };

    const onClickOffer = offer => {
        document.getElementById("offer-page").style.pointerEvents = "none";
        document.getElementById("offer-page").style.opacity = 0.2;
        setOffer(offer);
        dispatch(toggleEditOfferModal());
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    return (
        <React.Fragment>
            {
                loader ? <p className="loader">LOADING...</p>
                    :
                    <React.Fragment>
                        {
                            (() => {
                                if (addOfferModal) {
                                    return (
                                        <div className="add-category-modal add-offer-modal w3-animate-zoom">
                                            <div className="add-category-bg">
                                                <div className="add-product-title-bg">
                                                    <p className="modal-title">ADD OFFER</p>
                                                </div>
                                                <AddOffer/>
                                            </div>
                                        </div>
                                    )
                                } else if(editOfferModal) {
                                    return (
                                        <div className="add-category-modal add-offer-modal w3-animate-zoom">
                                            <div className="add-category-bg">
                                                <div className="add-product-title-bg">
                                                    <p className="modal-title">ADD OFFER</p>
                                                </div>
                                                <EditOffer offer={offer}/>
                                            </div>
                                        </div>
                                    )
                                }
                            })()
                        }
                        <div id="offer-page">
                            <div className="category-bg">
                                {
                                    offers.map(offer => {
                                        return (
                                            <div className="category-card  offer-card" onClick = {() => onClickOffer(offer)}>
                                                <img src={offer.pic} className="category-img offer-img" />
                                                <div className="category-content offer-content">
                                                    <div className="category-name">{offer.name}</div>
                                                    <hr className="line" />
                                                    <div className="category-description">{`${offer.offerValue}% off on the products availed`}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="category-action">
                                <div className="category-action-card">
                                    <button className="category-add-btn" onClick={() => onClickAddOffer()}>ADD OFFER</button>
                                    <br />
                                    <div className="pro-tip">
                                        <img className="pro-tip-img" src="https://cdn0.iconfinder.com/data/icons/ui-beast-6/32/UI-19-128.png" />
                                        <div className="category-description pro-tip-text">
                                            To create sub category add category to a category.
                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Offers;