import { shallow } from 'enzyme';
import Login from './Login';

it('expect render Login component', () => {
  expect(shallow(<Login />)).toMatchSnapshot();
});
