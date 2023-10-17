import Footer from '../components/Footer/Footer';
import HeaderRegister from '../components/Header/HeaderRegister';
import NewPass from '../components/NewPass';

const NewPassPage = (): JSX.Element => {
  return (
    <div>
      <HeaderRegister />
      <NewPass />
      <Footer />
    </div>
  );
};
export default NewPassPage;
