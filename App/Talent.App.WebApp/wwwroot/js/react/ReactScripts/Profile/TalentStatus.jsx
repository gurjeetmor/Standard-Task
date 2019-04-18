import React from 'react'


export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props)
        const details = props.status ?
            Object.assign({}, props.status)
            : {
                status: "",
                availableDate: ""
            }

        this.state = {
            newJobDetails: details,

        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        var data = Object.assign({}, this.state.newJobDetails);
        data[event.target.id] = event.target.name
        console.log(data)
        this.setState({
            newJobDetails: data
        })
        this.props.controlFunc(this.props.componentId, data)       
    }

    render() {
       
        return (
            <div className='ui sixteen wide column'>
                <label><b>Current Status</b></label><br /><br />
                <div className="ui radio checkbox">
                    <input name="Actively looking for a job" type="radio" id="status"
                        onChange={this.handleChange}
                    />
                    <label>Actively looking for a job</label>
                </div>
                <br /><br />
                <div className="ui radio checkbox">
                    <input name="Not looking for a job at the moment" type="radio" id="status"
                        onChange={this.handleChange}
                    />
                    <label>Not looking for a job at the moment</label>
                </div>
                <br /><br />
                <div className="ui radio checkbox">
                    <input name="Currently employed but open to offers" type="radio" id="status"
                        onChange={this.handleChange}
                    />
                    <label>Currently employed but open to offers</label>
                </div>
                <br /><br />
                <div className="ui radio checkbox">
                    <input name="Will be available on later date" type="radio" id="status"
                        onChange={this.handleChange}
                    />
                    <label>Will be available on later date</label>
                </div>                            
            </div>
        );
    }
}

