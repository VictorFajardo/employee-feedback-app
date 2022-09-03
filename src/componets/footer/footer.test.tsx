import { shallow } from 'enzyme';
import Footer from './footer';

it('expect render Footer component', () => {
  expect(shallow(<Footer />)).toMatchSnapshot();
});
