import React, { useState, useEffect } from "react";
import apis from "../APICalls";
import { useDispatch, useSelector } from "react-redux";
const _ = require("lodash");
const uploadApis = apis.uploadApis();

const HomeScreenTemplate = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const homeScreenTemplateApis = apis.seedataApis();
    const [template, setTemplate] = useState([]);
    const [fileName, setFileName] = useState("");
    const [pic, setPic] = useState("");

    const onChangePic = event => {
        event.preventDefault();
        let data = new FormData();
        setFileName(event.target.value);
        data.append("image", event.target.files[0]);
        uploadApis.uploadFile(auth.userId, auth.token, data)
            .then(response => {
                if (response) {
                    setPic(response.Location);
                }
            })
    }

    useEffect(() => {
        fetchHomeScreenTemplate();
    }, []);

    const fetchHomeScreenTemplate = () => {
        homeScreenTemplateApis.getHomeScreenTemplate(auth.userId, auth.token)
        .then(temp => {
            if(temp) setTemplate(temp.template);
        });
    };

    const saveTemplate = () => {
        homeScreenTemplateApis.editHomeScreenTemplate(auth.userId, auth.token, {template});
    };

    return (
        <React.Fragment>
            <div className="hometemplate-bg">
                <div className="template-bg">
                    <textarea
                        type="textarea"
                        value={JSON.stringify(template, undefined, 4)}
                        className="inpt add-new-product-inpt hometemplate-textarea"
                        onChange={(event) => setTemplate(event.target.value)}
                    />
                    <button className="btn add-new-product-btn" onClick={() => saveTemplate()}>SAVE</button>
                </div>
                <div className="upload-pic-bg">
                    <label for="file-upload" class="custom-file-upload">
                        Upload Pic
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={onChangePic}
                    />
                    <textarea
                        type="text"
                        className="inpt add-new-product-inpt file-inpt1"
                        value={pic}
                    />
                    {
                        pic && pic.length > 0? 
                            <img className="product-img uploaded-img" src={pic} />
                        :
                            <div/>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default HomeScreenTemplate;