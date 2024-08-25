
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Setting from './components/Setting';
import Logout from './components/Logout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
