import { Component } from "react";
import Aux from '../../hoc/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../../src/axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Spinner from "../../components/UI/Spinner/Spinner";
import { useNavigate, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions';
// import { useNavigate } from 'react-router-dom';


class BurgerBuilder extends Component{

    state = {
        purchaseable: false, 
        purchasing: false,
        loading: false,
        error: null
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceAddition = INGREDIENTS_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if(oldCount <= 0){
    //         return
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceAddition = INGREDIENTS_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceAddition
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // const history = useNavigate();
        console.log(this.props)
        this.props.history.push('/checkout');
        // history('/checkout');
    }

    componentDidMount () {
        // axios.get('https://burger-builder-cf81f-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })

        // console.log("Component did mount")
        // console.log(this.props)
    }

    

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if(this.props.ings){
            burger =( 
                <Aux>
                    <Burger ingredients = {this.props.ings} />
                    <BuildControls 
                        ingredientsAdded={this.props.onIngredientsAdded}
                        ingredientsRemoved={this.props.onIngredientsRemoved}
                        disabled = {disabledInfo}
                        totalPrice = {this.props.price}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}  
                totalPrice = {this.props.price}  
            />
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => {
            dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName})          
        },
        onIngredientsRemoved: (ingName) => {
            dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})          
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
