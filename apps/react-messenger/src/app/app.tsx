import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import RegisterOrLogin from './components/registerOrLogin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<NxWelcome title="react-messenger" />} />

        {/* Route for the registration page */}
        <Route path="/auth" element={<RegisterOrLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
