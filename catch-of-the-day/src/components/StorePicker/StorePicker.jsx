import './StorePicker.css';
import { getFunName } from '../../helpers';
import React from 'react';

export default class StorePicker extends React.Component {
    render() {
        return (
            <form className="store-selector">
                { /* Weird JSX comment. */ }
                <h2>Please enter a store:</h2>
                <input type="text" required placeholder="Store name" defaultValue={getFunName()} />
                <button type="submit">Visit store</button>
            </form>
        );
    }
}