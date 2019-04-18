/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon, Button, Dropdown } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props)

        const details = props.skillData



        this.state = {
            showEditSection: false,
            showAddSection: false,
            newSkillData: details,
            id: "",
            skill: "",
            level: "",
            updateRowId: ""
        }

        this.openAdd = this.openAdd.bind(this)
        this.close = this.close.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.addSkill = this.addSkill.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openAdd() {
        const details = this.props.skillData
        this.setState({
            showAddSection: true,
            newSkillData: details
        })
    }

    addSkill() {
        console.log(this.state.newSkillData)
        let name = this.state.skill
        let level = this.state.level
        this.state.newSkillData.push({ name, level })
        const data = Object.assign([], this.state.newSkillData)
        this.props.updateProfileData(data)
        this.close()
    }

    openEdit(item) {
        const details = this.props.skillData
        this.setState({
            showEditSection: true,
            newSkillData: details,
            updateRowId: item.id,
            skill: item.name,
            level: item.level
        })
    }

    updateSkill() {
        let skillDetail = this.state.newSkillData
        const selectedSkill = skillDetail.findIndex(obj => obj.id == this.state.updateRowId)
        skillDetail[selectedSkill].name = this.state.skill
        skillDetail[selectedSkill].level = this.state.level
        this.props.updateProfileData(skillDetail)
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
                skill: data
            })
        } else {
            var data = event.target.value;
            this.setState({
                level: data
            })
        }
    }

    delete(rowId) {
        const details = this.props.skillData
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

        const skillOptions = [
            { key: 'Beginner', text: 'Beginner', value: 'Beginner' },
            { key: 'Intermediate', text: 'Intermediate', value: 'Intermediate' },
            { key: 'Expert', text: 'Expert', value: 'Expert' },
           
        ];
        let skillLevelOptions = skillOptions.map(x => <option value={x.value} key={x.key}>{x.text}</option>);

        return (

            <tr key={item.id}>
                <td>

                    <ChildSingleInput
                        inputType="text"
                        name="name"
                        value={this.state.skill}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Skill"
                        errorMessage="Please enter a valid Skill"
                    />
                </td>
                <td>
                    <select
                        className="ui dropdown"
                        placeholder="languageLevel"
                        value={this.state.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="0"> Skill Level</option>
                        {skillLevelOptions}
                    </select>
                </td>
                <td>
                    <div className="ui buttons">

                        <button type="button" className="ui primary basic button" onClick={this.updateSkill}>Update</button>

                        <button type="button" className="ui red basic button" onClick={this.close}>Cancel</button>
                    </div>
                </td>
            </tr>
        );
    }

    renderAdd() {

        const skillOptions = [
            { key: 'Beginner', text: 'Beginner', value: 'Beginner' },
            { key: 'Intermediate', text: 'Intermediate', value: 'Intermediate' },
            { key: 'Expert', text: 'Expert', value: 'Expert' },

        ];
        let skillLevelOptions = skillOptions.map(x => <option value={x.value} key={x.key}>{x.text}</option>);

        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className="five wide column">
                            <ChildSingleInput
                                inputType="text"
                                name="name"
                                value={this.state.skill}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Skill"
                                errorMessage="Please enter a valid Skill"
                            />
                        </div>

                        <div className="five wide column">
                            <select
                                className="ui dropdown"
                                placeholder="languageLevel"
                                value={this.state.level}
                                onChange={this.handleChange}
                                name="level">
                                <option value="0"> Skill Level</option>
                                {skillLevelOptions}
                            </select>
                        </div>
                        <div className="six wide column">
                            <button type="button" className="ui teal button" onClick={this.addSkill}>Add</button>
                            <button type="button" className="ui button" onClick={this.close}>Cancel</button>
                        </div>
                    </div>
                </div>
                <br />
                {this.renderDisplay()}
            </div>
        );
    }

    renderDisplay() {
        let skillList = this.props.skillData;
        let tableData = null;
        if (skillList != "") {
            tableData = skillList.map((item) =>
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
                                    <th className="six wide">Skill</th>
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

