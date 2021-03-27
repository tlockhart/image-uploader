import React, { Component } from "react";
import { urlParser } from "../utils/urlParser";

// Import Components
import Home from "../components/home";
import { urlBtnUpdates } from "utils/urlBtnUpdates";


class HomeContainer extends Component<HomePropType, HomeStateType> {
    state: HomeStateType;
    constructor(props: HomePropType) {
        super(props);
        this.state = {};
    } // constructor

    componentDidMount() {
        urlBtnUpdates();
    }
    
    onClick() {
        this.setState(
            {
                collapse: !this.state.collapse,
            }
        );
    } // onClick

    render() {
        return (
            <React.Fragment>
                <Home />
            </React.Fragment>
        )
    }
} // class

export default HomeContainer;