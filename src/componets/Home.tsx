import { Outlet } from 'react-router-dom';
import Footer from './footer/footer';

const Home = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
