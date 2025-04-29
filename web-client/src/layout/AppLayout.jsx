import React from 'react'
import App from '../App'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Footer } from '../components';

function AppLayout() {
  return (
    <Router>
      <App />
      <Footer />
    </Router>
  )
}

export default AppLayout