import Header from '../Header/Header';
import Inventory from '../Inventory/Inventory';
import Order from '../Order/Order';
import React from 'react';
import sampleFishes from '../../sample-fishes';
import Fish from '../Fish/Fish';

export default class App extends React.Component {
    constructor() {
        super();

        // Set initial state.
        this.state = {
            fishes: {},
            order: {}
        };

        // Bind component to custom component functions.
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
    }

    addFish(fish) {
        // Grab copy of current app state.
        let fishes = {...this.state.fishes};

        // Add new fish (use timestamp as key).
        let timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        // Set state.
        this.setState({ fishes: fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        );
    }
}