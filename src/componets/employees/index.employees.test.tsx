import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../store';
import IndexEmployees from './index.employees';
import { ModalType } from '../../data';

it('expect render IndexEmployees component', () => {
  const mockProps = {
    modal: ModalType.VIEW,
    closeMethod: () => {},
    clickMethod: () => {},
  };
  expect(
    shallow(
      <Provider store={store}>
        <IndexEmployees {...mockProps} />
      </Provider>
    )
  ).toMatchSnapshot();
});
