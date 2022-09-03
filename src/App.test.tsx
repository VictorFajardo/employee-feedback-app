import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

it('expect render App component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    )
  ).toMatchSnapshot();
});
