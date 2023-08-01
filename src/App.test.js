import { render, screen } from '@testing-library/react';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store/store';

const ui = (
  <Provider store={store}>
    <App />
  </Provider>
);

test('renders learn react link', () => {
  render(ui);
  const appTitle = screen.getByText(/Github User Finder/i);
  const input = screen.getByLabelText(/find user/i)
  const sortValueSelect = screen.getByLabelText(/sort By/i)
  expect(appTitle).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(sortValueSelect).toBeInTheDocument();
});
