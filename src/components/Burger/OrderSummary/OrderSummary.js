import React from "react";
import Aux from "../../../hoc/Auxi";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return ( 
            <li key={igKey}> 
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
            ); 
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Following ingredients ordered: </p>

            <ul>
                {ingredientSummary}
            </ul>

            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>

            <p> Continue Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;
