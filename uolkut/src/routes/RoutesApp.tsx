import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import NewPassPage from '../pages/NewPassPage';
import RecoverPassPage from '../pages/RecoverPassPage';
import EditInformationPage from '../pages/EditInformationPage';
import SecondRegisterPage from '../pages/SecondRegisterPage';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/second-register" element={<SecondRegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/profile" />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/profile/edit-information"
          element={<EditInformationPage />}
        />
        <Route path="/recover-pass" element={<RecoverPassPage />} />
        <Route path="/new-pass" element={<NewPassPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesApp;
