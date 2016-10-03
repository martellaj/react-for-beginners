import AddFishForm from '../AddFishForm/AddFishForm';
import React from 'react';

export default class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory-div">
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load sample data</button>
            </div>
        );
    }
}