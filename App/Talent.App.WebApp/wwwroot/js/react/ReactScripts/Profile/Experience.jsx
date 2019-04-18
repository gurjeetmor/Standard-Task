/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon, Button, Dropdown, Table } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props)

        const details = props.experienceData



        this.state = {
            showEditSection: false,
            showAddSection: false,
            newExperienceData: details,
            id: "",
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
            updateRowId: ""
        }

        this.openAdd = this.openAdd.bind(this)
        this.close = this.close.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.addExperience = this.addExperience.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.convertDate = this.convertDate.bind(this)
    }

    openAdd() {
        const details = this.props.experienceData
        this.setState({
            showAddSection: true,
            newExperienceData: details
        })
    }

    addExperience() {
        console.log(this.state.newExperienceData)
        let company = this.state.company
        let position = this.state.position
        let responsibilities = this.state.responsibilities
        let start = this.convertDate(this.state.start)
        let end = this.state.end
        this.state.newExperienceData.push({ company, position, responsibilities, start, end })
        const data = Object.assign([], this.state.newExperienceData)
        this.props.updateProfileData(data)
        this.close()
    }

    openEdit(item) {
        const details = this.props.experienceData
        this.setState({
            showEditSection: true,
            newExperienceData: details,
            updateRowId: item.id,
            company: item.company,
            position: item.position,
            responsibilities: item.responsibilities,
            start: item.start,
            end: item.end
        })
    }

    updateExperience() {
        let experienceDetail = this.state.newExperienceData
        const selectedExperience = experienceDetail.findIndex(obj => obj.id == this.state.updateRowId)
        experienceDetail[selectedExperience].company = this.state.company
        experienceDetail[selectedExperience].position = this.state.position
        experienceDetail[selectedExperience].responsibilities = this.state.responsibilities
        experienceDetail[selectedExperience].start = this.state.start
        experienceDetail[selectedExperience].end = this.state.end
        this.props.updateProfileData(experienceDetail)
        this.close()
    }

    close() {
        this.setState({
            showEditSection: false,
            showAddSection: false
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    DateConverter(tempdate) {
        let e = null
        var temp = new Date(tempdate);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var day = temp.getDate()
        if (day == 1) {
            e = 'st'
        } else if (day == 2) {
            e = 'nd'
        } else if (day == 3) {
            e = 'rd'
        } else {
            e='th'
        }
        var date = (temp.getDate() + e + " " + monthNames[temp.getMonth()] + ", " + temp.getFullYear());
        return date;

    }

    delete(rowId) {
        const details = this.props.experienceData
        const deleteRow = details.findIndex(obj => obj.id == rowId)
        details.splice(deleteRow, 1)
        this.props.updateProfileData(details)
    }
   convertDate(tempdate) {

        var temp = new Date(tempdate);
       var date = (temp.getDate() + "/" + ((temp.getMonth()) + 1) + "/" + temp.getFullYear());
        return date;

    }

    render() {
        return (
            this.state.showAddSection ? this.renderAdd() : this.renderDisplay()
        )
    }

    renderEdit(item) {
        var startDate = this.convertDate(item.start)
        var endDate = this.convertDate(item.end)
        console.log(startDate)
        return (
            
            <Table.Row key={item.id}>
                <Table.Cell colSpan='6'>
                    <div className='ui sixteen wide column'>
                        <div className="ui grid">
                            <div className="row">
                                <div className="eight wide column">
                                    <ChildSingleInput
                                        inputType="text"
                                        label="Company"
                                        name="company"
                                        value={this.state.company}
                                        controlFunc={this.handleChange}
                                        maxLength={80}
                                        placeholder="Company"
                                        errorMessage="Please enter a valid company name"
                                    />
                                </div>
                                <div className="eight wide column">
                                    <ChildSingleInput
                                        inputType="text"
                                        label="Position"
                                        name="position"
                                        value={this.state.position}
                                        controlFunc={this.handleChange}
                                        maxLength={80}
                                        placeholder="Position"
                                        errorMessage="Please enter a valid position name"
                                    />                                   
                                </div>
                            </div>

                            <div className="row">
                                <div className="eight wide column">
                                    <label><b>Start Date:</b></label>
                                    <input type="date" name="start" defaultValue={startDate} onChange={this.handleChange}/>
                                </div>
                                <div className="eight wide column">
                                    <label><b>End Date:</b></label>
                                    <input type="date" name="end" defaultValue={endDate} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="sixteen wide column">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Responsibilities"
                                    name="responsibilities"
                                    value={this.state.responsibilities}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Responsibilities"
                                    errorMessage="Please enter a valid responsibilities"
                                    />
                                </div>
                            </div>
                                <div className="row">
                                <div className="sixteen wide column">

                                        <button type="button" className="ui teal button" onClick={this.updateExperience}>Update</button>

                                        <button type="button" className="ui button" onClick={this.close}>Cancel</button>
                                    </div>
                                </div>
                            
                        </div>
                    </div>

                  

                </Table.Cell>
            </Table.Row>
        );
    }

    renderAdd() {

        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className="eight wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Company:"
                                name="company"
                                value={this.state.company}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Company"
                                errorMessage="Please enter a valid company name"
                            />
                        </div>

                        <div className="eight wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Position:"
                                name="position"
                                value={this.state.position}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Position"
                                errorMessage="Please enter a valid position name"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="eight wide column">
                            <label><b>Start Date:</b></label>
                            <input type="date" name="start" value={this.state.start} onChange={this.handleChange}/>

                        </div>

                        <div className="eight wide column">
                            <label><b>End Date:</b></label>
                            <input type="date" name="end" value={this.state.end} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="sixteen wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Responsibilities:"
                                name="responsibilities"
                                value={this.state.responsibilities}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Responsibilities"
                                errorMessage="Please enter a valid responsibilities"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="six wide column">
                            <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
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
        let experienceList = this.props.experienceData;
        let tableData = null;
        if (experienceList != "") {
            tableData = experienceList.map((item) =>
                this.state.showEditSection && this.state.updateRowId == item.id ? this.renderEdit(item) :
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.company}</Table.Cell>
                        <Table.Cell>{item.position}</Table.Cell>
                        <Table.Cell>{item.responsibilities}</Table.Cell>
                        <Table.Cell>{this.DateConverter(item.start)}</Table.Cell>
                        <Table.Cell>{this.DateConverter(item.end)}</Table.Cell>
                        <Table.Cell>
                            <Icon name='pencil' onClick={this.openEdit.bind(this, item)} />
                            <Icon name='close' onClick={this.delete.bind(this, item.id)} />
                        </Table.Cell>
                    </Table.Row>
            )
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Table structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>                                   
                                    <Table.HeaderCell>
                                        <Button secondary fluid icon labelPosition='left' onClick={this.openAdd}><Icon name="add" /> Add New</Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {tableData}
                            </Table.Body>
                        </Table>
                    </React.Fragment>
                </div>
            </div>
        );
    }
}


