/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Icon, Image } from 'semantic-ui-react'

export default class PhotoUpload extends Component {

    //constructor(props) {
    //    super(props)
    //    const details = props.imageId ?
    //        Object.assign({}, props.imageId)
    //        : {
    //            profilePhotoUrl: "",

    //        }
    //    this.state = {
    //        newPhotoData: details,
    //        processing: false
    //    }
    //    this.handleFile = this.handleFile.bind(this)
    //    this.handleSubmit = this.handleSubmit.bind(this)
        
    //}

    //handleSubmit(e) {
    //    e.preventDefault();
    //    const _this = this;

    //    this.setState({
    //        processing: true
    //    });

    //    const promise = $.ajax({
    //        url: this.props.savePhotoUrl,
    //        type: "POST",
    //        data: {
    //            data_uri: this.state.data_uri,
    //            filename: this.state.filename,
    //            filetype: this.state.filetype
    //        },
    //        dataType: 'json'
    //    });

    //    promise.done(function (data) {
    //        _this.setState({
    //            processing: false,
    //            uploaded_uri: data.uri
    //        });
    //    });
    //}

    //handleFile(e) {
    //    const reader = new FileReader();
    //    const file = e.target.files[0];

    //    reader.onload = (upload) => {
    //        this.setState({
    //            newPhotoData: upload.target.result,
    //            filename: file.name,
    //            filetype: file.type
    //        });
    //    };

    //    reader.readAsDataURL(file);
    //}

    //render() {
    //    let processing;
    //    let uploaded;

    //    if (this.state.uploaded_uri) {
    //        uploaded = (
    //            <div>
    //                <h4>Image uploaded!</h4>
    //                <img className='image-preview' src={this.state.uploaded_uri} />
    //                <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
    //            </div>
    //        );
    //    }

    //    if (this.state.processing) {
    //        processing = "Processing image, hang tight";
    //    }

    //    return (
    //        <div className='row'>
    //            <div className='ui sixteen wide column'>
    //                <label>Upload an image</label>
    //                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
    //                    <input type="file" onChange={this.handleFile} />
    //                    <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
    //                    {processing}
    //                </form>
    //                {uploaded}
    //            </div>
    //        </div>
    //    );
    //}


    constructor(props) {
        super(props)
        const details = props.imageId ?
            Object.assign({}, props.imageId)
            : {
                profilePhotoUrl: "",
               
            }

        this.state = {
            newPhotoData: details,
            showImage: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        //this.renderImage = this.renderImage.bind(this);
        //this.renderDisplay = this.renderDisplay.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);      
    };

    handleClick() {
        this.refs.file.click();
        
    }

    onChangeFile(e) {
    //    //event.stopPropagation();
    //    //event.preventDefault();
        //var file = e.target.files[0];
        //console.log(file);
        //this.setState({ file }); /// if you want to upload latter
    
          // const reader = new FileReader();
   
   

        this.setState({ showImage: true })
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        this.setState({ file });
        var reader = new FileReader();
        //console.log(file.name)
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);
        
        if (file) {
            reader.readAsDataURL(file);
           
        }
       
    }
    uploadPhoto(file) {
        console.log(file)
        var cookies = Cookies.get('talentAuthToken');
        //var file = this.state.file;
        //var fileName=file.name
        var formData = new FormData();
        formData.append('file', file);
       // console.log(fd)
        $.ajax({

            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                
            },
            
            
            type: "POST",
            data: formData,    
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                if (res.success) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res) {
                console.log("error", res)
            }
        })

    }
    

    render() {
        return (
            <div className='ui sixteen wide column' >
                <div className="add-media" onClick={this.handleClick.bind(this)} >
                    <Icon circular name="camera retro" size="huge" link />
                    
                    <input type="file"
                        id="file"
                        ref="file"
                        style={{ display: "none" }}
                        onChange={this.onChangeFile.bind(this)}
                        accept="image/*" multiple />
                    
                </div>
                <img src="" height="200" alt="Image preview..." /> <br />
                {this.state.showImage ? <button type="button" className="ui teal button" onClick={this.uploadPhoto(this.state.file)}><Icon name='upload' /> Upload</button> : ""}
                
            </div>
        );      
    
    }



    //constructor(props) {
    //    super(props);

    //    this.selectFileToUpload = this.selectFileToUpload.bind(this);
    //    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    //    //this.removeFile = this.removeFile.bind(this);
    //    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    //    this.maxFileSize = 2097152;
    //    this.maxNoOfFiles = 1;
    //    this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

    //    this.state = {
    //        selectedFile: [],
    //        selectedFileName: [],
    //        imageSrc: [],
    //        imageId: [],
    //        selectedRemoveFileId: [],
    //        currentNoOfFiles: 0
    //    }
    //};

   

    //selectFileToUpload() {
    //    document.getElementById('selectFile').click();
    //}

    //fileSelectedHandler(event) {

    //    let localSelectedFile = this.state.selectedFile;
    //    let localSelectedFileName = this.state.selectedFileName;
    //    let localImageSrc = this.state.imageSrc;
    //    let localImageId = this.state.imageId;
    //    let localCurrentNoOfFiles = this.state.currentNoOfFiles;

    //    for (let i = 0; i < event.target.files.length; i++) {

    //        if (event.target.files[i].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[i].type) == -1) {
    //            TalentUtil.notification.show("Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
    //        } else if (localCurrentNoOfFiles >= this.maxNoOfFiles) {
    //            TalentUtil.notification.show("Exceed Maximum number of files allowable to upload", "error", null, null);
    //        } else {
    //            localSelectedFile = localSelectedFile.concat(event.target.files[i]),
    //                localSelectedFileName = localSelectedFileName.concat(event.target.files[i].name),
    //                localImageSrc = localImageSrc.concat(window.URL.createObjectURL(event.target.files[i])),
    //                localImageId = localImageId.concat('0'),
    //                localCurrentNoOfFiles = localCurrentNoOfFiles + 1
    //        }
    //    }

    //    this.setState({
    //        selectedFile: localSelectedFile,
    //        selectedFileName: localSelectedFileName,
    //        imageSrc: localImageSrc,
    //        imageId: localImageId,
    //        currentNoOfFiles: localCurrentNoOfFiles
    //    })
    //}

    
    //fileUploadHandler(Id) {
    //    let data = new FormData();
    //    for (var i = 0; i < this.state.selectedFile.length; i++) {
    //        if (this.state.selectedFile[i] != "") {
    //            data.append('file' + i, this.state.selectedFile[i]);
    //            console.log(this.state.selectedFile[i]);
    //        }
    //    }
    //    console.log(this.state.selectedFile[0])
        
        

    //    var cookies = Cookies.get('talentAuthToken');

    //    $.ajax({
    //        url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
    //        headers: {
    //            'Authorization': 'Bearer ' + cookies
    //        },
    //        type: "POST",
    //        data: data,
           
    //        processData: false,
    //        contentType: false,
    //        success: function (res) {
    //            if (res.success) {
    //                TalentUtil.notification.show("Image upload successfully", "success", null, null);
    //            } else {
    //                TalentUtil.notification.show("Image not upload", "error", null, null);
    //            }
    //        }.bind(this),
    //        error: function (res, status, error) {
    //            //Display error
    //            TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
    //        }
    //    });
    //}

    //render() {
    //    let showProfileImg = [];
    //    //console.log(this)
    //    for (let i = 0; i < this.state.currentNoOfFiles; i++) {
    //        if (this.state.imageSrc[i] != null) {
    //            showProfileImg.push(<span><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui small" src={this.state.imageSrc[i]} alt="Image Not Found" />
                    
    //                <button className="remove sign icon" onClick={this.fileUploadHandler(this.state.imageId[i])}> Upload </button> </span>);
    //        }
    //    }

    //    if (this.state.currentNoOfFiles < this.maxNoOfFiles) {
    //        if (this.props.photoUrl != null) {
    //            showProfileImg.push(<img style={{ height: 112, width: 112, borderRadius: 55 }} src={this.props.photoUrl} alt="Image Not Found" onClick={this.selectFileToUpload}/>);
    //        }
    //        else {
    //            showProfileImg.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
    //        }
            
    //    }

    //    return (
    //        <div className="row">
    //            <div className="four wide column">
    //                <h3></h3>
    //                <div className="tooltip"></div>
    //            </div>
    //            <div className="twelve wide column">
    //                <section>
    //                    <div>
    //                        <label htmlFor="work_sample_uploader" className="profile-photo">
    //                            {showProfileImg}
    //                        </label>
    //                        <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" multiple />
    //                    </div>
    //                </section>
                    
    //            </div>
    //        </div>
    //    )
    //}
}
