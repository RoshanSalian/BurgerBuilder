import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1, 
            meat: 1, 
            cheese: 1,
            bacon: 1
        }
    }

    componentWillMount() {
        // to handle actual ingredients passed form the BurgerBuilder.js to this page from the url
        // Video is using history.

        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};

        // this.setState({ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // Again does not work in v6
        // this.props.history.replace('./checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                />
                {/* // To use v6 versions
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
            </div>
        )
    }
}

export default Checkout;
