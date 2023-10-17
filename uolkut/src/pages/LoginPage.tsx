import Login from '../components/Login';
import HeaderRegister from '../components/Header/HeaderRegister';
import Footer from '../components/Footer/Footer';

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <HeaderRegister />
      <Login />
      <Footer />
    </div>
  );
};
export default LoginPage;
