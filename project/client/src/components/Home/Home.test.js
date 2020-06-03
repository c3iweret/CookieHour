import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from 'react-testing-library';
import Home from './Home';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
describe('Home Pass Test', function () {
  it('renders without crashing', () => {
    shallow(<Home />);
  });

  it('"Who are you" text exists', () => {
    const {getByTestId, getByText} = render(
      <Home />
    );
    expect(getByText('Who are you?')).not.toBeNull();
  });

  it('two buttons exist for selection', () => {
    const {getByDisplayValue, getAllByTestId} = render(
      <Home />
    );

    expect(getAllByTestId('profile-option')).toHaveLength(2);

  });

  it('a button exists for Student', () => {
    const {getByDisplayValue} = render(
      <Home />
    );

    const student_btn = getByDisplayValue('Student');
    expect(student_btn).not.toBeNull();

  });

  it('a button exists for Teaching Staff', () => {
    const {getByDisplayValue} = render(
      <Home />
    );

    const teacher_btn = getByDisplayValue('Teaching Staff');
    expect(teacher_btn).not.toBeNull();

  });
});
