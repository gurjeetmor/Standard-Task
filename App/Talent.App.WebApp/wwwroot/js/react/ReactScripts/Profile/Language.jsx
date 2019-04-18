/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon, Button, Dropdown } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props)
       
        const details = props.languageData            
                
        this.state = {
            showEditSection: false,
            showAddSection: false,
            newLanguageData: details,
            id:"",
            language: "",
            level: "",
            updateRowId:""
        }

        this.openAdd = this.openAdd.bind(this)
        this.close = this.close.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openAdd() {
        const details = this.props.languageData
        this.setState({
            showAddSection: true,
            newLanguageData: details
        })
    }

    addLanguage() {
        console.log(this.state.newLanguageData)
        let name = this.state.language
        let level = this.state.level
        this.state.newLanguageData.push({ name, level })
        const data = Object.assign([], this.state.newLanguageData)
        this.props.updateProfileData(data)
        this.close()
    }

    openEdit(item) {
        const details = this.props.languageData
        this.setState({
            showEditSection: true,
            newLanguageData: details,
            updateRowId: item.id,
            language: item.name,
            level: item.level
        })
    }

    updateLanguage() {
        let languageDetail = this.state.newLanguageData
        const selectedLanguage = languageDetail.findIndex(obj => obj.id == this.state.updateRowId)
        languageDetail[selectedLanguage].name = this.state.language
        languageDetail[selectedLanguage].level = this.state.level
        this.props.updateProfileData(languageDetail)
        this.close()
    }

    close() {
        this.setState({
            showEditSection: false,
            showAddSection: false
        })
    }

    handleChange(event) {
        if (event.target.name == "name") {
            var data = event.target.value;
            this.setState({
                language: data
            })
        } else {            
            var data = event.target.value;
                    this.setState({
                        level: data
                    })
        }       
    }

    delete(rowId) {
        const details = this.props.languageData
        const deleteRow = details.findIndex(obj => obj.id == rowId)
        details.splice(deleteRow, 1)
        this.props.updateProfileData(details)
    }

    render() {
        return (
            this.state.showAddSection ? this.renderAdd() : this.renderDisplay()
        )
    }

    renderEdit(item) {
       
        const languageOptions = [
            { key: 'basic', text: 'Basic', value: 'basic' },
            { key: 'conversational', text: 'Conversational', value: 'conversational' },
            { key: 'fluent', text: 'Fluent', value: 'fluent' },
            { key: 'native', text: 'Native/Bilingual', value: 'native' }
        ];
        let languageLevelOptions = languageOptions.map(x => <option value={x.value} key={x.key}>{x.text}</option>);
 
        return (

            <tr key={item.id}>
                <td>

                    <ChildSingleInput
                        inputType="text"
                        name="name"
                        value={this.state.language}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Language"
                        errorMessage="Please enter a valid language name"
                    />
                </td>
                <td>
                    <select
                        className="ui dropdown"
                        placeholder="languageLevel"
                        value={this.state.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="0"> Language Level</option>
                        {languageLevelOptions}
                    </select>
                </td>
                <td>
                    <div className="ui buttons">

                        <button type="button" className="ui primary basic button" onClick={this.updateLanguage}>Update</button>

                        <button type="button" className="ui red basic button" onClick={this.close}>Cancel</button>
                    </div>
                </td>
            </tr>
        );
    }
    
    renderAdd() {

        const languageOptions = [
            { key: 'basic', text: 'Basic', value: 'basic' },
            { key: 'conversational', text: 'Conversational', value: 'conversational' },
            { key: 'fluent', text: 'Fluent', value: 'fluent' },
            { key: 'native', text: 'Native/Bilingual', value: 'native' }
        ];
        let languageLevelOptions = languageOptions.map(x => <option value={x.value} key={x.key}>{x.text}</option>);

        return (           
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className="five wide column">
                            <ChildSingleInput
                                inputType="text"
                                name="name"
                                value={this.state.language}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Language"
                                errorMessage="Please enter a valid language name"
                            />
                        </div>

                        <div className="five wide column">
                            <select
                                className="ui dropdown"
                                placeholder="languageLevel"
                                value={this.state.level}
                                onChange={this.handleChange}
                                name="level">
                                <option value="0"> Language Level</option>
                                {languageLevelOptions}
                            </select>
                        </div>
                        <div className="six wide column">
                            <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                            <button type="button" className="ui button" onClick={this.close}>Cancel</button>
                        </div>
                    </div>
                </div>
                <br/>
                {this.renderDisplay()}
            </div>            
        );
    }

    renderDisplay() {
        let languageList = this.props.languageData;
        let tableData = null;
        if (languageList != "") {
            tableData = languageList.map((item) =>
                this.state.showEditSection && this.state.updateRowId == item.id ? this.renderEdit(item) :
                    <tr key={item.id}>
                        <td className="six wide">{item.name}</td>
                        <td className="six wide">{item.level}</td>
                        <td className="four wide">
                            <Icon name='pencil' onClick={this.openEdit.bind(this, item)} />
                            <Icon name='close' onClick={this.delete.bind(this, item.id)} />
                        </td>
                    </tr>                        
            )
        }
                                                
        return (          
            <div className='row'>              
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th className="six wide">Language</th>
                                    <th className="six wide">Level</th>
                                    <th className="four wide">
                                        <Button secondary fluid icon labelPosition='left' onClick={this.openAdd}><Icon name="add" /> Add New</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </React.Fragment>                   
                </div>
            </div>
        );
    }
}