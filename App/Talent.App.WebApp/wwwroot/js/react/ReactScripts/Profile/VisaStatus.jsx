import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const details = props.visaDetails ?
            Object.assign({}, props.visaDetails)
            : {
                visaStatus: "",
                visaExpiryDate: ""
            }

        this.state = {
            newVisaDetails: details,
            showVisaExpiryDate: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveVisaDetail = this.saveVisaDetail.bind(this)
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newVisaDetails)
        data[event.target.name] = event.target.value       
        this.setState({
            newVisaDetails: data
        })      
        var selectValue = event.target.value
        console.log(selectValue)
        if (selectValue === "Citizen" || selectValue === "Permanent Resident") {
            this.props.saveProfileData(data)
        } else {
            this.setState({
                showVisaExpiryDate:true
            })
        }
    }

    saveVisaDetail() {
        console.log(this.state.newVisaDetails)
        const data = Object.assign({}, this.state.newVisaDetails)
        this.props.saveProfileData(data)
    }

    render() {
        const visaType = [
            { key: 'Citizen', text: 'Citizen', value: 'Citizen' },
            { key: 'Permanent Resident', text: 'Permanent Resident', value: 'Permanent Resident' },
            { key: 'Work Visa', text: 'Work Visa', value: 'Work Visa' },
            { key: 'Student Visa', text: 'Student Visa', value: 'Student Visa' }
        ];
        let visaTypeOptions = visaType.map(x => <option value={x.value} key={x.key}>{x.text}</option>);
        let visa = this.state.newVisaDetails
        let visaExpiry = null
        if (this.state.showVisaExpiryDate) {
            visaExpiry =
                <div className='ui ten wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className="nine wide column">
                            <label><b>Visa expiry date</b></label>
                            <input type="date" name="visaExpiryDate" value={visa.visaExpiryDate} onChange={this.handleChange} />
                        </div>
                        <div className="one wide column">
                            <br />
                            <button type="button" className="ui teal button" onClick={this.saveVisaDetail}>Save</button>
                        </div>
                    </div>
                </div>               
            </div>
        }
        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className="six wide column">
                            <label><b>Visa type</b></label>
                            <select
                                className="ui dropdown"
                                placeholder="visaStatus"
                                value={visa.visaStatus}
                                onChange={this.handleChange}
                                name="visaStatus">
                                <option value="0"> Visa Status</option>
                                {visaTypeOptions}
                            </select>
                        </div>                       
                            {visaExpiry}                       
                    </div>
                </div>               
            </div>
        );
    }
}