import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const details = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                city: "",
                country: "",
                number: "",
                postCode: 0,
                street: "",
                suburb:"",
            }

        this.state = {
            showEditSection: false,
            newAddressData: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddressData: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddressData)
        data[event.target.name] = event.target.value       
        this.setState({
            newAddressData: data
        })
    }   

    saveAddress() {
        console.log(this.props.componentId)
        console.log(this.state.newAddressData)
        const data = Object.assign({}, this.state.newAddressData)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }

    render() {
       
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newAddressData.country;
        const selectedCity = this.state.newAddressData.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}>{x}</option>);

            citiesOptions = <div className="six wide column">
                <label>City</label>
                <select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select></div>
        }
        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">

                        <div className="four wide column">  
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={this.state.newAddressData.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your street number"
                                errorMessage="Please enter a valid street number"
                            />               
                        </div>

                        <div className="eight wide column">  
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.newAddressData.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your street name"
                                errorMessage="Please enter a valid street name"
                            />              
                        </div>

                        <div className="four wide column">  
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.newAddressData.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your suburb"
                                errorMessage="Please enter a valid suburb name"
                            />               
                        </div>
                        <br />

                        <div className="six wide column">
                            <label>Country</label>
                            <select className="ui right labeled dropdown"

                                placeholder="Country"
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country">

                                <option value="">Select a country</option>
                                {countriesOptions}
                            </select>                          
                        </div>
                       
                            {citiesOptions}
                        
                        <div className="four wide column"> 
                            <ChildSingleInput
                                inputType="text"
                                label="Post Code"
                                name="postCode"
                                value={this.state.newAddressData.postCode}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your post code"
                                errorMessage="Please enter a valid post code"
                            />             
                        </div>
                        
                    </div>
                </div>
                <br />
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let fullAddress = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {fullAddress}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        );
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        const details = props.nationalityData ?
            Object.assign({}, props.nationalityData)
            : {
                nationality: "",
            }

        this.state = {

            newNationalityData: details
        }

        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newNationalityData)
        data[event.target.name] = event.target.value
        this.props.saveProfileData(data)
    }

    render() {
        let countriesOptions = [];
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            <div className='ui sixteen wide column'>

                <select className="ui right labeled dropdown"
                    placeholder="Select your nationality"
                    value={this.props.nationalityData}
                    onChange={this.handleChange}
                    name="nationality">
                    <option value="">Select your nationality</option>
                    {countriesOptions}
                </select>
                
            </div>
        );
    }
}