import Header from '../Header/Header';
import Inventory from '../Inventory/Inventory';
import Order from '../Order/Order';
import base from '../../base';
import Fish from '../Fish/Fish';
import React from 'react';
import sampleFishes from '../../sample-fishes';

export default class App extends React.Component {
    constructor() {
        super();

        // Get initial state.
        this.state = {
            fishes: {},
            order: {}
        };

        // Bind component to custom component functions.
        this.addFish = this.addFish.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.updateFish = this.updateFish.bind(this);
    }

    componentWillMount() {
        this.ORDER_KEY = `order.${this.props.params.storeId}`;

        // Syncs current store before it's rendered to the DOM.
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // Get order state from local storage.
        let orderState = localStorage.getItem(this.ORDER_KEY);
        if (orderState) {
            this.setState({
                order: JSON.parse(orderState)
            });
        }
    }

    // Remove connection to current store before navigating away.
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(this.ORDER_KEY, JSON.stringify(nextState.order));
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

    updateFish(key, updatedFish) {
        let fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes: fishes });
    }

    addToOrder(key) {
        let order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order: order });
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
                                .map(key => <Fish key={key} fishId={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} fishes={this.state.fishes} loadSamples={this.loadSamples} updateFish={this.updateFish} />
            </div>
        );
    }
}