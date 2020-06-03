import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from 'react-testing-library';
import StudentDashboard from './StudentDashboard';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
describe('Student dashboard Test', function () {
  it('renders without crashing', () => {
    shallow(<StudentDashboard />);
  });
});
