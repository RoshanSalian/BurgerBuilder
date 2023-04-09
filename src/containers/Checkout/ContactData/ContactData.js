import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from "../../../../src/axios-order";
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {  
            name: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Name'
                },
                value: ''
            },
            zipCode: {    
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: ''
            },
            country: {    
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {    
                elementType: 'input', 
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {    
                elementType: 'select', 
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]
        }
        const order = {
            ingredients: this.state.ingredients, 
            price: this.state.totalPrice,
            orderData: formData
        }
        axios.post('/orders.pson', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
          
        console.log(this.props.ingredients);
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updateFormElement;
        this.setState({orderForm:updatedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key, 
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                <Input elementType="..." elementConfig="..." value="..."/>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        changed = {(event) => this.inputChangeHandler(event, formElement.id)} 
                        value = {formElement.config.value} />
                ))}           
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

            </form>
        )
        return (
            <div  className={classes.ContactData}>
                <h4>Enter your Contact Details</h4>
                
            </div>
        )
    }
}

export default ContactData;
