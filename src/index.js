import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.min.js';
import './sass/index.scss'
import './library/fontawesome'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Layout />
);
