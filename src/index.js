// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
// import { AuthProvider } from './AuthContext';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <AuthProvider>
//     <Router>
//       <App />
//     </Router>
//   </AuthProvider>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
// import App from './App';
import { AuthProvider } from './context/AuthContext';
import client from './graphql/apolloClient';
// import './styles/styles.css';
// import { AuthProvider } from './AuthContext';



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
