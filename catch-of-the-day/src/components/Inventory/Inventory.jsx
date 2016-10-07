import AddFishForm from '../AddFishForm/AddFishForm';
import React from 'react';

export default class Inventory extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.renderInventory = this.renderInventory.bind(this);
    }

    handleChange(e, key) {
        let fish = this.props.fishes[key];
        let updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) {
        let fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish name" onChange={(e) => { this.handleChange(e, key); }} />
                <input type="text" name="price" value={fish.price} placeholder="Fish price" onChange={(e) => { this.handleChange(e, key); }} />
                <select type="text" name="status" value={fish.status} placeholder="Fish status" onChange={(e) => { this.handleChange(e, key); }}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish desc" onChange={(e) => { this.handleChange(e, key); }} />
                <input type="text" name="image" value={fish.image} placeholder="Fish image" onChange={(e) => { this.handleChange(e, key); }} />
                <button onClick={() => this.props.removeFish(key)}>Remove fish</button>
            </div>
        );
    }

    render() {
        return (
            <div className="inventory-div">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load sample data</button>
            </div>
        );
    }
}