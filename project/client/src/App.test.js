import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from 'react-testing-library';
import App from './App';

describe('App Test', function () {
  it('renders without crashing', () => {
    shallow(<App />);
  });

})
