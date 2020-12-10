import React, { Component } from "react";
import axios from "axios";
import * as styles from "./FileUpload.module.css";
// var ReactS3Uploader = require('react-s3-uploader');
 

export default class FileUpload extends Component {
    state = {
        filesToUpload: [],
        uploadSuccess: undefined,
        error: undefined,
        bucket: "saileemailassets/logos",
        entity: {
            bucket: "saileemailassets",
            files: [],
            campaign_name: ''
        }
    };

    uploadFile = async () =>{
        console.log("this.state.filesToUpload: ", this.state.filesToUpload)
        console.log("this.state.filesToUpload.length: ", this.state.filesToUpload.length)
        // Getting the signed url
        const results = await Object.values(this.state.filesToUpload).map( fileToUpload =>{
            return axios(
                " https://ks11x9jc67.execute-api.us-west-2.amazonaws.com/Stage?fileName=" +
                `${fileToUpload.name}&bucketName=${this.state.bucket}`
            ).then(async response => {
                // Getting the url from response
                const url = response.data.fileUploadURL;
                console.log("url: ", url)
                
                return axios({
                    method: "PUT",
                    url: url,
                    data: fileToUpload,
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then(async res => {
                        console.log("res: ", res)
                        this.setState({
                            uploadSuccess: "File upload successfull",
                            error: undefined
                        });
                        return res
                    })
                    .catch(err => {
                        console.log("err: ", err)
                        this.setState({
                            error: "Error Occured while uploading the file",
                            uploadSuccess: undefined
                        });
                    });
            });
        });
        // Promise.all(results).then(async (values) => {
        //     console.log("final results: ", values)
        //     const { entity, filesToUpload } = this.state;
        //     console.log("final filesToUpload: ", filesToUpload)
        //     const files_names = Object.values(filesToUpload).map( fileToUpload =>{
        //         return fileToUpload.name;
        //     });
        //     console.log("final files_names: ", files_names)
        //     entity['files'] = files_names
        //     entity['campaign_name'] = this.props.campaign_name
        //     console.log("final entity: ", entity)
        //     const wind_report = await processWindResponse({entity})
        //     console.log("wind_report: ", wind_report)
        // });

        console.log("final results: ", results)
    }
    getSignedUrl = (file, callback) => {
        return axios(
            " https://ks11x9jc67.execute-api.us-west-2.amazonaws.com/Stage?fileName=" +
            `${file.name}&bucketName=${this.state.bucket}`
        ).then(async response => {
            // Getting the url from response
            const url = response.data.fileUploadURL;
            console.log("url: ", url)
            
            return callback({signedUrl: url})
        });
    }

    // hiddenFileInput = React.useRef(null);
    // handleClick = event => {
    //     this.hiddenFileInput.current.click();
    // };

    // handleChange = event => {
    //     const fileUploaded = event.target.files[0];
    // };

    render() {
        return (
            <div className={styles.fileUploadCont}>
                {/* <div className={styles.header}>
                    {this.props.name ? this.props.name : ''}
                </div> */}
                <div>
                    <form style={{margin: 0}}>
                        <div style={{ display: 'flex', flexDirection: 'row', height: '2rem', justifyContent: 'center', alignItems: 'center'}}>
                            <input
                                multiple
                                type="file"
                                style={{ fontSize: 10}}
                                id={`fileUpload_${this.props.id}`}
                                onChange={e => {
                                    this.setState({
                                        filesToUpload: e.target.files,
                                        uploadSuccess: undefined
                                    });
                                }}
                            />
                            {this.state.filesToUpload ? (
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    style={{ fontSize: 10}}
                                    onClick={e => {
                                        this.uploadFile();
                                    }}
                                >
                                    Upload
                                </button>
                            ) : null}

                            <div>
                                <span style={{ fontSize: 10, padding: '1rem'}}>
                                    {this.state.uploadSuccess
                                        ? "Successfull"
                                        : ""}
                                </span>
                            </div>
                        </div>
                        {/* <ReactS3Uploader
                        // className={uploaderClassName}
                        getSignedUrl={this.getSignedUrl}
                        // accept="image/*"
                        onProgress={() => console.log("onProgress ")}
                        onError={(error) => console.log("onError: ", error)}
                        onFinish={() => console.log("onFinish ")}
                        uploadRequestHeaders={{ "Content-Type": "multipart/form-data" }}
                        contentDisposition="auto"
                        /> */}

                    </form>
                </div>
            </div>
        );
    }
}
