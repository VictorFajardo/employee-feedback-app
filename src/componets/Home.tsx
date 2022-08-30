import { Outlet } from 'react-router-dom';
import Footer from './footer/footer';

function Home(): JSX.Element {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
