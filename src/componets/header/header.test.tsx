import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Header from './header';

it('expect render Header component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    )
  ).toMatchSnapshot();
});
