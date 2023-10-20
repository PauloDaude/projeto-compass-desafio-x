import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NewPassPage from './pages/NewPassPage';
import RecoverPassPage from './pages/RecoverPassPage';
import EditInformationPage from './pages/EditInformationPage';
import SecondRegisterPage from './pages/SecondRegisterPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/second-register" element={<SecondRegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/edit-information"
            element={<EditInformationPage />}
          />
          <Route path="/recover-pass" element={<RecoverPassPage />} />
          <Route path="/new-pass" element={<NewPassPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
