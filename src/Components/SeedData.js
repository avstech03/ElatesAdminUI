import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
const _ = require("lodash");

const SeedData = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const seeddataApis = apis.seedataApis();

  const [loader, setLoader] = useState(false);
  const [parseFailed, setParseFailed] = useState(false);
  const [membership, setMembership] = useState({});
  const [FAQ, setFAQ] = useState({});
  const [validpincodes, setValidPinCodes] = useState([]);
  const [minimumcartvaluetouse, setMinimumcartvaluetouse] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [pincode, setPinCode] = useState("");
  const [termsandconditions, setTermsAndConditions] = useState("");
  const [aboutus, setAboutUs] = useState("");
  const [privacypolicy, setPrivacyPolicy] = useState("");

  useEffect(() => {
    fetchSeedData();
  }, []);

  const fetchSeedData = () => {
    setLoader(true);
    seeddataApis.getSeedData(auth.userId, auth.token).then((response) => {
      setLoader(false);
      if (response) {
        setMembership(JSON.stringify(response.membership, undefined, 4));
        setFAQ(JSON.stringify(response.FAQ, undefined, 4));
        setValidPinCodes(response.validpincodes);
        setMinimumcartvaluetouse(
          JSON.stringify(response.minimumcartvaluetouse)
        );
        setDeliveryCharges(JSON.stringify(response.deliveryCharges));
        setAboutUs(JSON.stringify(response.aboutus, undefined, 4));
        // setSupportInfo(JSON.stringify(response.supportinfo));
        setPrivacyPolicy(JSON.stringify(response.privacypolicy, undefined, 4));
        setTermsAndConditions(
          JSON.stringify(response.termsandconditions, undefined, 4)
        );
      }
    });
  };

  const editSeedData = () => {
    let body = {};
    try {
      body = {
        membership: JSON.parse(membership),
        FAQ: JSON.parse(FAQ),
        validpincodes: validpincodes,
        minimumcartvaluetouse: JSON.parse(minimumcartvaluetouse),
        deliveryCharges: JSON.parse(deliveryCharges),
        aboutus: JSON.parse(aboutus),
        privacypolicy: JSON.parse(privacypolicy),
        termsandconditions: JSON.parse(termsandconditions),
        // supportinfo: JSON.parse(supportinfo),
      };
    } catch (err) {
      setParseFailed(true);
    }
    seeddataApis.editSeedData(auth.userId, auth.token, body).then((res) => {
      window.alert("Seed Data Saved Successfully");
    });
  };

  const onMembershipChange = (event) => {
    setMembership(event.target.value);
  };

  const onFAQChange = (event) => {
    let obj;
    setFAQ(event.target.value);
  };

  const onDeliveryChargesChange = (event) => {
    let obj;
    setDeliveryCharges(event.target.value);
  };

  const onMinimumCartValueToUseChange = (event) => {
    let obj;
    setMinimumcartvaluetouse(event.target.value);
  };

  const onPinCodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const onChangeAboutUs = (event) => {
    setAboutUs(event.target.value);
  };

  const onChangePrivacyPolicy = (event) => {
    setPrivacyPolicy(event.target.value);
  };

  //   const onChangeSupportInfo = (event) => {
  //     setSupportInfo(event.target.value);
  //   };

  const onChangeTermsAndConditions = (event) => {
    setTermsAndConditions(event.target.value);
  };

  const onCodChanged = (event, index) => {
    let pincodes = _.clone(validpincodes);
    pincodes[index].cod = !pincodes[index].cod;
    setValidPinCodes(pincodes);
  };

  const addPinCode = () => {
    let pincodes = _.clone(validpincodes);
    let p = _.find(validpincodes, { pincode: pincode });
    if (!p) {
      pincodes.push({
        pincode,
        cod: false,
      });
      setValidPinCodes(pincodes);
    }
  };

  const deletePinCode = (index) => {
    let pincodes = _.clone(validpincodes);
    _.remove(pincodes, { pincode: validpincodes[index].pincode });
    setValidPinCodes(pincodes);
  };

  return (
    <React.Fragment>
      {loader ? (
        <p className="loader">LOADING...</p>
      ) : (
        <div className="seeddata-bg">
          <div className="seeddata-bg-1">
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">
                Membership Prices
              </div>
              <textarea
                className="inpt add-new-product-inpt textarea"
                value={membership}
                onChange={onMembershipChange}
              />
            </div>
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">
                DeliveryCharges
              </div>
              <textarea
                className="inpt add-new-product-inpt textarea"
                value={deliveryCharges}
                onChange={onDeliveryChargesChange}
              />
            </div>
            {/* <hr className="line"/> */}
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">FAQ's</div>
              <textarea
                className="inpt add-new-product-inpt textarea"
                value={FAQ}
                onChange={onFAQChange}
              />
            </div>
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">
                Minimum Wallet Amount to use
              </div>
              <textarea
                className="inpt add-new-product-inpt textarea"
                value={minimumcartvaluetouse}
                onChange={onMinimumCartValueToUseChange}
              />
            </div>
            {/* <div className="seeddata-container">
              <div className="add-product-label seeddata-label">
                Support Information
              </div>
              <textarea
                className="inpt add-new-product-inpt seeddata-textarea"
                value={supportinfo}
                onChange={onChangeSupportInfo}
              />
            </div> */}
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">
                Terms and Conditions
              </div>
              <textarea
                className="inpt add-new-product-inpt seeddata-textarea"
                value={termsandconditions}
                onChange={onChangeTermsAndConditions}
              />
            </div>
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">About us</div>
              <textarea
                className="inpt add-new-product-inpt seeddata-textarea"
                value={aboutus}
                onChange={onChangeAboutUs}
              />
            </div>

            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">
                Privacy Policy
              </div>
              <textarea
                className="inpt add-new-product-inpt seeddata-textarea"
                value={privacypolicy}
                onChange={onChangePrivacyPolicy}
              />
            </div>

            <div className="seeddata-container">
              <button
                onClick={() => editSeedData()}
                className="btn add-new-product-btn"
              >
                Save
              </button>
            </div>
          </div>

          <div className="seeddata-bg-2">
            <div className="seeddata-container">
              <div className="add-product-label seeddata-label">PinCode</div>
              <input
                type="text"
                value={pincode}
                placeholder="pincode"
                className="inpt add-new-product-inpt add-pin-code-inpt"
                onChange={onPinCodeChange}
              />
              <button
                className="btn add-new-product-btn add-pin-code-btn"
                onClick={() => {
                  addPinCode();
                }}
              >
                ADD
              </button>
            </div>

            {(() => {
              if (Array.isArray(validpincodes) && validpincodes.length) {
                return (
                  <div className="cod-pincode-bg">
                    <div className="cod-pincode-heading-bg">
                      <div className="cod-pincode-heading">PINCODE</div>
                      <div className="cod-pincode-heading cod-heading">
                        Cash On Delivery
                      </div>
                    </div>
                    <hr />
                    {validpincodes.map((validpincode, index) => {
                      return (
                        <div className="cod-data-bg">
                          <div className="cod-pincode-data">
                            {validpincode.pincode}
                          </div>
                          <button
                            className="btn add-new-product-btn del-pin-code-btn"
                            onClick={() => deletePinCode(index)}
                          >
                            DEL
                          </button>
                          <input
                            type="checkbox"
                            checked={validpincode.cod}
                            className="switch"
                            onChange={(event) => onCodChanged(event, index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })()}
          </div>

          {/* <div className="seeddata-container">
                            <div className="add-product-label seeddata-label">Pincodes valid for Delivery</div>
                            <textarea
                                className="inpt add-new-product-inpt seeddata-textarea"
                                value={validpincodes}
                                onChange={onValidPinCodeChange}
                            />
                        </div> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default SeedData;
