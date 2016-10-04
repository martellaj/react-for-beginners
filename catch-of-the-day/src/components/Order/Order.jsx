import { formatPrice } from '../../helpers';
import React from 'react';

export default class Order extends React.Component {
    constructor() {
        super();

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key) {
        let fish = this.props.fishes[key];
        let count = this.props.order[key];

        if (Object.keys(this.props.fishes).length === 0) {
            // Fish data hasn't been received from the database.
        } else if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
        } else {
            return (
                <li key={key}>
                    <span>{count}lb{count > 1 ? 's': ''} {fish.name}</span>
                    <span className="price">{formatPrice(fish.price * count)}</span>
                </li>
            );
        }
    }

    render() {
        let orderIds = Object.keys(this.props.order);
        let total = orderIds.reduce((prevTotal, key) => {
            let fish = this.props.fishes[key];
            let count = this.props.order[key];
            let isAvailable = fish && fish.status === 'available';

            if (isAvailable) {
                return prevTotal + (count * fish.price || 0);
            } else {
                return prevTotal;
            }
        }, 0);

        return (
            <div className="order-wrap">
                <h2 onClick={this.onOrderClick}>Your order</h2>
                <ul className="order">
                    {orderIds.map(key => this.renderOrder(key))}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        );
    }
}