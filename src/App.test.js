import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {getPropSafe} from './helpers.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

