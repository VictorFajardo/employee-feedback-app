import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../store';
import Dashboard from './Dashboard';

it('expect render Dashboard component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
  ).toMatchSnapshot();
});
