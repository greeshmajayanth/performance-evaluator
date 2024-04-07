import React, { Component } from 'react';
import '../../dashboard.css'; // Import your CSS file

class ContactComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            modalVisible: false
        };

    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    showPopup = () => {
        this.setState({
            modalVisible: true
        });
    };
    
    hidePopup = () => {
        this.setState({
            modalVisible: false
        });
    };    

    render() {
        return (
            <div id="contact" className="page">
                <div id="contact_body">
                    <div id="contact_container">
                        <h1>Contact us</h1>
                        <p>Let's get this conversation started. Tell us a bit about yourself, and we will get in touch with you as soon as possible</p>
                        <form id="contactForm" onSubmit={this.showPopup}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} required />
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} required />
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.handleInputChange} required />
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" cols="30" rows="10" value={this.state.message} onChange={this.handleInputChange} required></textarea>
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                    {this.state.modalVisible && (
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <p>Thanks for contacting us! We will get back to you as soon as possible.</p>
                                <button className="close" onClick={this.hidePopup}>close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ContactComponent;
