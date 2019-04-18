/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props)
        const details = props.summaryData ?
            Object.assign({}, props.summaryData)
            : {
                summary: "",
                description: ""
            }

        this.state = {
            newSelfIntroductionData: details
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveSelfIntroduction = this.saveSelfIntroduction.bind(this)
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newSelfIntroductionData)
        data[event.target.name] = event.target.value
        this.setState({
            newSelfIntroductionData: data
        })
    }

    saveSelfIntroduction() {
        console.log(this.state.newSelfIntroductionData)
        const data = Object.assign({}, this.state.newSelfIntroductionData)
        this.props.updateProfileData(data)
   
    }

    render() {
       // console.log(this.state.newSelfIntroductionData.summary)
        return (
            <div className='ui sixteen wide column'>

                <ChildSingleInput
                    inputType="text"
                    label=""
                    name="summary"
                    value={this.state.newSelfIntroductionData.summary != undefined ? this.state.newSelfIntroductionData.summary : ""}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Please provide a short summary about yourself"
                    errorMessage="Please enter a valid summary"
                />
                <p>Summary must be no more than 150 characters</p>
                <ChildSingleInput
                    inputType="text"
                    label=""
                    name="description"
                    value={this.state.newSelfIntroductionData.description != undefined ? this.state.newSelfIntroductionData.description : ""}
                    controlFunc={this.handleChange}
                    maxLength={600}
                    placeholder="Please tell us about any hobbies, additional expertise, or anything else you'd like to add"
                    errorMessage="Please enter a valid description"
                />
                <p>Description must be between 150-600 characters</p>
                
                <button type="button" className="ui right floated teal button" onClick={this.saveSelfIntroduction}>Save</button>
            </div>
        );
    }
}



