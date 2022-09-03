import { shallow } from 'enzyme';
import Home from './Home';

it('expect render Home component', () => {
  expect(shallow(<Home />)).toMatchSnapshot();
});
