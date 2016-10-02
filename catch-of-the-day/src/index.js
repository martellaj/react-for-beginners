import './css/style.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import { render } from 'react-dom';
import App from './components/App/App';
import NotFound from './components/NotFound/NotFound';
import React from 'react';
import StorePicker from './components/StorePicker/StorePicker';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={StorePicker} />
                <Match pattern="/store/:storeId" component={App} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    );
}

render(<Root />, document.querySelector('#main'));