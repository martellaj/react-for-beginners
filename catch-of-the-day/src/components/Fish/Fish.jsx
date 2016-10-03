import { formatPrice } from '../../helpers';
import React from 'react';

export default class Fish extends React.Component {
    render() {
        let { details } = this.props;
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button>Add to order</button>
            </li>
        );
    }
}