import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../store';
import EmployeeList from './EmployeeList';

it('expect render EmployeeList component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    )
  ).toMatchSnapshot();
});
