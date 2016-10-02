import './StorePicker.css';
import { getFunName } from '../../helpers';
import React from 'react';

export default class StorePicker extends React.Component {
    constructor() {
        super();

        // Bind component to custom component functions.
        this.goToStore = this.goToStore.bind(this);
    }

    goToStore(event) {
        event.preventDefault();

        // Grab text from input box.
        let storeName = this.storeInput.value;

        // Transition to /store/:storeId.
        this.context.router.transitionTo(`/store/${storeName}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                { /* Weird JSX comment. */ }
                <h2>Please enter a store:</h2>
                <input type="text" required placeholder="Store name" defaultValue={getFunName()}
                    ref={(input) => { this.storeInput = input; }} />
                <button type="submit">Visit store</button>
            </form>
        );
    }
}

// Exposes router to this component.
StorePicker.contextTypes = {
    router: React.PropTypes.object
};