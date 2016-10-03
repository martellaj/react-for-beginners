import { formatPrice } from '../../helpers';
import React from 'react';

export default class Fish extends React.Component {
    render() {
        let {
            details,
            fishId
        } = this.props;

        let isAvailable = details.status === 'available';
        let buttonText = isAvailable ? 'Add to order' : 'Sold out!';

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(fishId)}>{buttonText}</button>
            </li>
        );
    }
}