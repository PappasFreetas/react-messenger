import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import RegisterOrLogin from './components/registerOrLogin';
import Chat from './components/chat';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<NxWelcome title="react-messenger" />} />

        {/* Route for the registration page */}
        <Route path="/auth" element={<RegisterOrLogin />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
