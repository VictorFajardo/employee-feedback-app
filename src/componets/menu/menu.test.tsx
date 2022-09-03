import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Menu from './menu';

it('expect render Menu component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <Menu />
      </Provider>
    )
  ).toMatchSnapshot();
});
