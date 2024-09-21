import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<RegisterPage />} />
              <Route path="/dashboard" element={<><Header /><Dashboard /></>} />
              <Route path="/settings" element={<><Header /><Setting /></>} />
              <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
