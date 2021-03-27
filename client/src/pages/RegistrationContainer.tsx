import React, { Component } from "react";
import {ChangeEvent} from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import RegistrationForm from "../forms/registration";

class RegistrationContainer extends Component<RegContainerPropType> {
    state: RegContainerStateType;

    constructor(props: RegContainerPropType) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: '',
            existingUserError: "Request failed with status code 409",
            existingUserMsg: "User exists"
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    } // constructor
 
    /**
     * Changes handler - Sets state on all input values
     * @param event 
     */
    changeHandler(event: ChangeEvent<HTMLInputElement>) {
        // First disable default behavior
        event.preventDefault();

        const {
            name,
            value
        } = event.target;

        if (name && typeof value === 'string') {
            this.setState(
                {
                    // set name computed property to the name of the element clicked, 
                    // and set the corresponding state property to the element's value
                    [name]: value,
                }
            );  // setState
        }

    } // changeHandler

    clickHandler(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log(`User Name: ${this.state.email}, Password: ${this.state.password}`);

        // Package Data to be sent in the Post Request Body
        let regData = {
            email: this.state.email,
            password: this.state.password
        };

        // Define Call to Server Side utils to post body to the backend server and set states, using register method:
        let register = (regData: RegDataType) => {
            console.log('IN REGISTER CALL');
            API.register(regData)
                .then(regResponse => {
                    console.log("regResponse:", regResponse);
                      this.setState( { message: regResponse.data.message}); 
                })
                .catch(err => {
                    console.log("ERROR:", err, "Message:", err.message);
                    if (err.message === this.state.existingUserError){
                        this.setState({ message: this.state.existingUserMsg});
                    } 
                    else {
                        this.setState({ message: err.message});
                    }
                });
        };

        // Execute register
        register(regData);

        // Reset state variables after submit
        this.setState({
            email: '',
            password: ''
        });
    } // clickHandler

    render() {
        return (
            <React.Fragment>
                <RegistrationForm
                    changeHandler={this.changeHandler}
                    clickHandler={this.clickHandler}
                    email={this.state.email}
                    password={this.state.password} 
                    message={this.state.message}/>
            </React.Fragment>
        )
    }
} // class

export default RegistrationContainer;