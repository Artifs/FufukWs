import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ZakazPortreta from './pages/ZakazPortreta';
import FastRegistration from './pages/FastRegistration';
import ZakazPortretaSecond from './pages/ZakazPortretaSecond';
import ZakazPortretaResult from './pages/ZakazPortretaResult';
import Account from './pages/Account';
import Tovar from './pages/Tovar';
import FAQ from './pages/FAQ';
import Cart from './pages/Cart';
import { withRouter} from 'react-router-dom';
import TechSupp from './pages/TechSupp';
import ZakazPortretaOformlenie from './pages/ZakazPortretaOformlenie'

function Routes() {
  return (
    <BrowserRouter>
    <div className= 'page-container'>
    <div className = 'content-wrap'>
     <Switch>
        <Route exact path = "/" component = {Home}/> 
        <Route  path = "/Catalog" component = {Catalog}/> 
        <Route  path = "/ZakazPortreta" component = {ZakazPortreta}/> 
        <Route  path = "/FAQ" component = {FAQ}/> 
        <Route  path = "/ZakazPortretaSecond" component = {ZakazPortretaSecond} /> 
        <Route  path = "/ZakazPortretaResult" component = {ZakazPortretaResult} /> 
        <Route  path = "/ZakazPortretaOformlenie" component = {ZakazPortretaOformlenie} /> 
        <Route  path = "/FastRegistration" component = {FastRegistration}/> 
        <Route  path = "/Account" component = {Account}/> 
        <Route  path = "/Cart" component = {Cart}/> 
        <Route  path = "/TechicalSupport" component = {TechSupp}/> 
        <Route  path = '/Tovar/:id' component={Tovar} /> 
      </Switch>
      <Header />
    </div>
    <Footer />
    </div>
    </BrowserRouter> 
  );
}

export default  withRouter(Routes);
