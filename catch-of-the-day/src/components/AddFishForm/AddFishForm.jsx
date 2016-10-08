import React from 'react';

export default class AddFishForm extends React.Component {
    constructor() {
        super();

        // Bind component to custom component functions.
        this.createFish = this.createFish.bind(this);
    }

    createFish(event) {
        event.preventDefault();

        // Create fish object by grabbing values from form.
        let fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        };

        // Add the fish to our App state using function that's been passed down.
        this.props.addFish(fish);

        // Clear the form.
        this.fishForm.reset();
    }

    render() {
        return(
            <form ref={(input) => {this.fishForm = input;}} className="fish-edit" onSubmit={this.createFish}>
                <input type="text" placeholder="Fish name" ref={(input) => {this.name = input;}} />
                <input type="text" placeholder="Fish price" ref={(input) => {this.price = input;}} />
                <select ref={(input) => {this.status = input;}}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea type="text" placeholder="Fish description" ref={(input) => {this.desc = input;}} />
                <input type="text" placeholder="Fish imgage URl" ref={(input) => {this.image = input;}} />
                <button type="submit">+ Add Item</button>
            </form>
        );
    }
}

AddFishForm.propTypes = {
    AddFishForm: React.PropTypes.func.isRequired
};