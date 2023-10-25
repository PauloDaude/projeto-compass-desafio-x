import { Link } from 'react-router-dom';
import './HeaderRegister.css';

const HeaderRegister = (): JSX.Element => {
  return (
    <header id="header-register">
      <div className="content-header-register">
        <Link to="/">
          <h1 className="title-header-register">UOLkut</h1>
        </Link>
        <p className="header-p">Centro de segurança</p>
      </div>
    </header>
  );
};

export default HeaderRegister;
