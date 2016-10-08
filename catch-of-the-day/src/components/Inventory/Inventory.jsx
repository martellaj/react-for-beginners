import './Inventory.css';
import AddFishForm from '../AddFishForm/AddFishForm';
import base from '../../base';
import React from 'react';

export default class Inventory extends React.Component {
    constructor() {
        super();

        this.state = {
            uid: null,
            owner: null
        };

        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logOut = this.logOut.bind(this);
        this.renderInventory = this.renderInventory.bind(this);
    }

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user });
            }
        });
    }

    authenticate(provider) {
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler(err, authData) {
        if (err) {
            // Handle error.
            console.error(err);
            return;
        }

        let storeRef = base.database().ref(this.props.storeId);
        storeRef.once('value', (snapshot) => {
            let data = snapshot.val() || {};

            // Claim store as own if there's no owner yet.
            if (!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        });
    }

    handleChange(e, key) {
        let fish = this.props.fishes[key];
        let updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    logOut() {
        base.unauth();

        this.setState({
            uid: null
        });
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

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
            </nav>
        );
    }

    render() {
        let logOutButton = <button className="logOutButton" onClick={this.logOut}>Log out</button>;

        if (!this.state.uid) {
            return (
                <div>{this.renderLogin()}</div>
            );
        } else if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you're not the owner of this store.</p>
                    {logOutButton}
                </div>
            );
        } else {
            return (
                <div className="inventory-div">
                    <h2>Inventory</h2>
                    {logOutButton}
                    {Object.keys(this.props.fishes).map(this.renderInventory)}
                    <AddFishForm addFish={this.props.addFish} />
                    <button onClick={this.props.loadSamples}>Load sample data</button>
                </div>
            );
        }

    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired,
    updateFish: React.PropTypes.func.isRequired
};