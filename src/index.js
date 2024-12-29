import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatProvider } from './context/ChatContext';
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider>
    <App />
  </ChatProvider>
);

reportWebVitals();
