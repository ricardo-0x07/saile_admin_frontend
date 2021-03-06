import React, { Component } from "react";
import axios from "axios";
import * as styles from "./FileUpload.module.css";
// import { fallbackExchangeIO } from "urql";
import { sendWindRequest } from "../../utils/rest_api";
const template = `
<pre>
Team,

Kindly assist with the attached wind request

Regards,
Clive
</pre>
`;
export default class FileUpload extends Component {
    state = {
        filesToUpload: [],
        uploadSuccess: undefined,
        error: undefined,
        bucket: "sailewindrequests",
        entity: {
            bucket: "sailewindrequests",
            files: [],
            subject: "Wind Request",
            body: template,
            from_email: "clive@saile.ai",
            to_email: "support@saile.ai",
            cc_email: "nick@saile.ai",
            bcc_email: "ricardo.0x07@gmail.com"
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
        Promise.all(results).then(async (values) => {
            console.log("final results: ", values)
            const { entity, filesToUpload } = this.state;
            console.log("final filesToUpload: ", filesToUpload)
            const files_names = Object.values(filesToUpload).map( fileToUpload =>{
                return fileToUpload.name;
            });
            console.log("final files_names: ", files_names)
            entity['files'] = files_names
            entity['subject'] = this.props.name ? this.props.name : entity['subject']
            console.log("final entity: ", entity)
            await sendWindRequest({entity})
        });

        console.log("final results: ", results)
    }

    render() {
        return (
            <div className={styles.fileUploadCont}>
                <div className={styles.header}>
                    {this.props.name ? this.props.name : ''}
                </div>
                <div>
                    <form>
                        <div style={{ display: 'flex' }}>
                            <input
                                multiple
                                type="file"
                                style={{ fontSize: 12}}
                                id="fileUpload"
                                onChange={e => {
                                    this.setState({
                                        filesToUpload: e.target.files
                                    });
                                }}
                            />
                            {this.state.filesToUpload ? (
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    style={{ fontSize: 12}}
                                    onClick={e => {
                                        this.uploadFile();
                                    }}
                                >
                                    Upload
                                </button>
                            ) : null}

                            <div>
                                <span style={{ fontSize: 12, padding: '1rem'}}>
                                    {this.state.uploadSuccess
                                        ? "Successfull"
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
