import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap';
import Home from './screens/Home'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'

function App() {
  return (
    <Router >
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' Component={Home} exact />
            <Route path='/product/:id' Component={ProductScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/register' Component={RegisterScreen} />
            <Route path='/profile' Component={ProfileScreen} />
          </Routes>
        </Container>
        
      </main>
     
      <Footer />
    </Router>
  );
}

export default App;
