import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import Register from './components/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<NxWelcome title="react-messenger" />} />

        {/* Route for the registration page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
