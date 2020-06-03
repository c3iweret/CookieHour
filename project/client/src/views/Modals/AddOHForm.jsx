import React, { Component } from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/modal.css';

class AddOHForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            date: "",
            duration: "",
            startTime: "",
            endTime : ""
        };

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    render() {
        return (
        <Modal
            {...this.props}
            size="lg"
            centered="true"
        >
            <form id='overlayForm' name='createHike' onSubmit={this.handleSubmit} encType="multipart/form-data">
            <Modal.Header closeButton>
                <Modal.Title>
                Create Office Hours
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid fluid>
                <Row className="modalRow">
                    <Col lg={6} sm={6}>
                    <label className="label"> Date: </label>
                    <input className='overlay-field' type='text' placeholder='dd/mm/yyyy' name='date' required
                        onChange={this.handleChange} />
                    </Col>
                    <Col lg={6} sm={6}>
                    <label className="label"> Start Time: </label>
                    <input className='overlay-field' type='text' placeholder='hh:mm' name='startTime' required
                        onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row className="modalRow">
                    <Col lg={6} sm={6}>
                    <label className="label"> Meeting Length: </label>
                    <input className='overlay-field' type='text' placeholder='minutes' name='duration' required
                        onChange={this.handleChange} />
                    </Col>
                    <Col lg={6} sm={6}>
                    <label className="label"> End Time: </label>
                    <input className='overlay-field' type='text' placeholder='hh:mm' name='endTime' required
                        onChange={this.handleChange} />
                    </Col>
                </Row>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button className='overlayFormButton' type='submit'>Create</Button>
                {/* <Button className='closeButton' onClick={this.props.onHide}>Cancel</Button> */}
            </Modal.Footer>
            </form>
        </Modal>
        );

    }

    async getCurrentUser() {
        const user =  await axios.get('/teacher/profile');
        this.setState({ user: user.data });
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
        [name]: target.value
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        const { date, duration, startTime, endTime } = this.state;

        var data = {
            heldBy: this.state.user.email,
            startTime: startTime,
            endTime: endTime,
            lengthOfBookings: duration,
            date: date,
            courseName: this.props.course,
            booking: {"": ""}
        }

        try {
            const response = await axios.post('/teacher/create-office-hours', data);
            console.log(response);
            window.location.reload();
        } catch (err) {
            alert(err );
        }
    }
}

export default AddOHForm;
