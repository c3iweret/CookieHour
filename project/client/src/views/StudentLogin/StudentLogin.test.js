import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from 'react-testing-library';
import StudentLogin from './StudentLogin';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('Student Login Test', function () {

  it('renders without crashing', () => {
    shallow(<StudentLogin />);
  });

  it('username field exists', () => {
    const {getByTestId} = render(
      <StudentLogin />
    );
    expect(getByTestId('email')).not.toBeNull();
  });

  it('password field exists', () => {
    const {getByTestId} = render(
      <StudentLogin />
    );
    expect(getByTestId('password')).not.toBeNull();
  });

})
