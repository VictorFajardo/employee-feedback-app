import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../store';
import ReviewsList from './ReviewsList';

it('expect render ReviewsList component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    )
  ).toMatchSnapshot();
});
