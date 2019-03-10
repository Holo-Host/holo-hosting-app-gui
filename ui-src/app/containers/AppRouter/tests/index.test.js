import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AppRouter from '../index';

describe('<AppRouter />', () => {
  it('should render the header', () => {
    const renderedComponent = shallow(<AppRouter />);
    expect(renderedComponent.find(Header)).toHaveLength(1);
  });

  it('should render some routes', () => {
    const renderedComponent = shallow(<AppRouter />);
    expect(renderedComponent.find(Route)).not.toHaveLength(0);
  });

  it('should render the footer', () => {
    const renderedComponent = shallow(<AppRouter />);
    expect(renderedComponent.find(Footer)).toHaveLength(1);
  });
});
