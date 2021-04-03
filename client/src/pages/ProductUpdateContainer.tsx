import React, { ChangeEvent, Component } from "react";

// Import module to get/set variables from/in the LocalStorage
import * as authenticationStore from '../utils/authenticationStore';

// Import Components
import UpdateForm from "../forms/product/update";
import credentialStore from '../utils/credentialStore';
import { updateProduct, performDBAction } from '../utils/productStore';
import { Moment } from "moment";
import { urlBtnUpdates } from "utils/urlBtnUpdates";
import { getProductDetails } from '../utils/productStore';

class ProductUpdateContainer extends Component<ProductUpdatePropType> {
    refreshURL: string;
    baseURL: string;
    _productItemComponent!: JSX.Element;

    state: ProductUpdateStateType;
    constructor(props: ProductUpdatePropType) {
        super(props);
        let pushedProps = props.location.state;
        const name = pushedProps?.name;
        const value = pushedProps?.value;
        this.refreshURL = '/user/login/refresh';
        this.baseURL = '/api/products/product/update/';
        this.state = {
            productItem: {},
            productId: '',
            productName: '',
            productValue: '',
            placeholderName: '',
            placeholderValue: '',
            authToken: '',
            refresh_token: '',
            email: '',
            hasAccessTokenExpired: false,
            isUserAuthorized: true,
            message: '',
        };
        this.setState({ productName: name });
        this.setState({ productValue: value });

        this.changeHandler = this.changeHandler.bind(this);
        this.updateClickHandler = this.updateClickHandler.bind(this);
    } // constructor

    /**
     * Sets product item component
     */
    set productItemComponent(productItem: JSX.Element) {
        this._productItemComponent = productItem;
        // console.log("in get", this._productItemComponent);

        this.setState({ productItem: this._productItemComponent });
        // console.log('productItemComponent', this.state.productItem);
    }

    /**
     * Gets product item component
     */
    get productItemComponent() {
        return this._productItemComponent;
    }

    async setStateVariables(access_token: string, refresh_token: string, expiration: Moment | null, email: string, message: string) {
        /************************************************
         * SET State VARIABLES FROM LocalStorage
         ************************************************/
        let authToken = "Bearer " + access_token;

        console.log("Auth token", authToken);
        this.setState({ authToken });

        console.log("Refresh token", refresh_token);
        this.setState({ refresh_token });

        this.setState({ email });

        let hasAccessTokenExpired = await authenticationStore.hasAccessTokenExpired();

        console.log("Expired?", hasAccessTokenExpired);
        this.setState({ hasAccessTokenExpired });

        this.setState({ isUserAuthorized: true });

        this.setState({ message });
        /************************************************/
    }

    resetStateVariables() {
        this.setState({ authToken: '' });
        this.setState({ access_token: '' });
        this.setState({ refresh_token: '' });
        this.setState({ email: '' });
        this.setState({ hasAccessTokenExpired: false });
    }

    /**
     * Parse url and perform data fetch
     * Set state variables for React
     * Managed component
     */
    async componentDidMount() {
        // Update navbar for address bar changes
        urlBtnUpdates();

        let url = window.location.pathname;
        let urlArray = url.split('/');
        urlArray.splice(3, 1);
        //replace space with app
        urlArray.splice(0, 1, '/api');
        // URL Syntax: /api/products/:id
        urlArray.splice(2, 1);
        const baseUrl = urlArray.join('/');
        // console.log("UPDATEBASEURL:", baseUrl);
        // make product request
        this.productItemComponent = await getProductDetails(baseUrl);
        // object destructring
       const {name, value, id} = this.productItemComponent.props;
        /*******************************************************
         Get data response from http request, after parsing URL
        *******************************************************/
            if (id && name && value) {   

            /*******************************************
             * Pass item info from click button
             ******************************************/
            this.setState({
                productId: id,
                placeholderName: name,
                placeholderValue: `$ ${value}`,
            });
        }
        /***********************************************************/
    }

    changeHandler(event: ChangeEvent) {
        // First disable default behavior
        event.preventDefault();

        const {
            name,
            value
        }: EventTargetType = event.target as HTMLInputElement;

        if (name && typeof value === 'string') {
            // changed from [name]: value
            this.setState(
                {
                    // set name computed property to the name of the element clicked, 
                    // and set the corresponding state property to the element's value
                    [name]: value,
                }
                // as unknown as Pick<UpdateStateType, keyof UpdateStateType>
            );  // setState
        }
    } // changeHandler

    /************************************
    * stageDBActionis an integrator that passes an id and a callback function corresponding to the desired db action to be performed, and retrieves the new data and updates the state variables, to be displayed to screen. 
    ************************************/
    async stageDBAction(
        id: string,
        email: string,
        name: string,
        value: string,
        url: string,
        image = null,
        cb: Function) {
        console.log("Start performDBAction");
        //EXECUTE CALLBACK FUNCTION AND RETURN RESULSTS
        console.log("hasExpired0:", this.state.hasAccessTokenExpired);
        let dBActionResult: DbActionResultType | undefined = await performDBAction(
            id,
            email,
            this.state.refresh_token,
            this.state.authToken,
            this.state.hasAccessTokenExpired,
            name,
            value,
            null,
            url,
            cb);

        console.log("hasExpired1:", this.state.hasAccessTokenExpired);
        /************************************
         * Set placeholder text if data was updated
         ****************************************/
        if (dBActionResult?.message === "Action Completed") {
            if (name) {
                this.setState({ placeholderName: name });
            }
            if (value) {
                this.setState({ placeholderValue: value });
            }
        }
        console.log("Passed performDBAction");

        const {
            message,
            refresh_token,
            isUserAuthorized,
            hasAccessTokenExpired
        }: DbActionResultType = dBActionResult!;

        console.log("hasAccessTokenExpired2:", hasAccessTokenExpired);

        /***************************************************
         * Set State with the results of calling the DB Action
         *****************************************************/
        this.setState({
            message: message,
            refresh_token,
            isUserAuthorized,
            hasAccessTokenExpired,
        });
    }

    async updateClickHandler(event: ChangeEvent) {
        try {
            event.preventDefault();
            let name = this.state.productName;
            let value = this.state.productValue;
            // let email = this.state.email;

            /************************************************************************
             * Reset state variables representing view input after submit
             ************************************************************************/
            this.setState({ productName: '' });
            this.setState({ productValue: '' });
            this.setState({ placeholderName: '' });
            this.setState({ placeholderValue: '' });

            /************************************
             * STEP1: Get Data out of local Storage
             ************************************/
            let { access_token, refresh_token, expiration, email } = await authenticationStore.getLocalStorage();
            /*************************************/

            /******************************************
             * STEP2: SET STATE VARIABLES With data returned from localStorage
             *******************************/
            await this.setStateVariables(access_token, refresh_token, expiration, email, this.state.message);

            console.log("HasAccessTokenExpired", this.state.hasAccessTokenExpired);
            /******************************************
             * STEP3: Determine if Token Refresh is needed
             *******************************/
            if (this.state.hasAccessTokenExpired) {
                console.log("ProductUpdateContainer refresh-token: ", this.state.refresh_token);

                /***************************************
                 * STEP3: RefreshTokens: If tokens have expired
                 * **************************************/
                try {
                    /*********************************
                     * STEP4: Call credendentialStore to get refreshTokens and all other 
                     * credentials from the API, AND SET LOCAL STORAGE WITH RESULTS
                     *********************************/
                    let newUserCredentials = await credentialStore.setLocalCredWNewTokens(this.state.refresh_token, this.refreshURL, this.state.authToken, this.state.email, this.state.hasAccessTokenExpired);
                    /**************************/
                    console.log("newUserCredentials STATUS", newUserCredentials);
                    if (newUserCredentials) {
                        console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED newUserCredentials:", newUserCredentials);

                        /*********************************************
                         * STEP5: SET STATE VARIABLES RECEIVED FROM CREDENTIAL STORE
                         ********************************************/
                        let { access_token,
                            refresh_token,
                            expiration,
                            email,
                            message } = newUserCredentials;

                        // do something with response
                        console.log("ProductionUpdate:response returned", newUserCredentials);

                        this.setStateVariables(access_token, refresh_token, expiration, email, message);

                        console.log("New AUTHTOKEN after Refresh:", this.state.authToken);
                        /********************************************/
                    }
                    else {
                        console.log("I NEVER MADE IT TO IF");
                    }
                }
                catch (err) {
                    // Clear all localStorage, due to invalid Refresh token
                    console.log("ERRORED OUT IN UPDATE CATCH");
                    if (err.response.status === 401) {
                        console.log('401 status received in ProductUpdate');
                        /***********************************************
                         * Reset Local Storage Variables
                         ************************************************/
                        await authenticationStore.resetLocalStorage();

                        /*********************************************
                         * SET STATE VARIABLES FROM Local Storage
                         *********************************************/
                        await this.resetStateVariables();
                        console.log('err', err.response);
                        console.log('error status code', err.response.status);
                        this.setState({ isUserAuthorized: false });
                        console.log("isUserAuthorised = ", this.state.isUserAuthorized);
                        this.setState({ message: err.response.data.message });
                    } // if
                } // catch
            }
            console.log("AUTHORIZED?:", this.state.isUserAuthorized);
            if (this.state.isUserAuthorized) {
                // Refresh_Token should be temporarily set to 'norefresh' in productionAction, as tokens should NOT be refreshed
                // this.setState({ refresh_token: 'norefresh' });

                console.log('ProductUpdateContainer:refresh_token = ', this.state.refresh_token);

                /***********************************************
                 * Step6: PERFORM A DB ACTION IF TOKENS R VALID 
                 **********************************************/
                //id, name, value, url, file = null, imageSrc = null, cb

                await this.stageDBAction(
                    this.state.productId,
                    email,
                    name,
                    value,
                    this.baseURL,
                    null,
                    updateProduct);
            } // if
        } // try
        catch (err) {
            console.log("User is logged out");
            this.setState({ message: "User is logged out" });
        }
    }

    render() {
        /***********************************************/
        // let { id, name, value, userRole } = this.props.location.state;
        const props = this.productItemComponent?.props;
        console.log('props:', props);
        /***********************************************/
        return (
            <React.Fragment>
                <UpdateForm
                    changeHandler={this.changeHandler}
                    updateClickHandler={this.updateClickHandler}
                    productName={this.state.productName}
                    productValue={this.state.productValue}
                    // placeholderName={props?.name}
                    // placeholderValue={props?.value}
                    placeholderName={this.state.placeholderName}
                    placeholderValue={this.state.placeholderValue}
                    message={this.state.message}
                />
            </React.Fragment>
        )
    }
} // class

export default ProductUpdateContainer;