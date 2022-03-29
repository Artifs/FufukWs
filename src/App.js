import React,{ useState, createContext } from 'react'
import Routes from './Routes';
import { positions, Provider,transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.FADE,
  containerStyle: {
    width:'100%'
  }
};

const initialState = {
  isLoggedIn: false,
  email: '',
  cart: [],
  filesPortret:[],
  CashPortret: []
};

export const UserContext = createContext(initialState);

function App() {
  const [userState, setUserState] = useState(initialState);
  const [userEmail, setEmailState] = useState(initialState);
  const [userCart, setUserCart] = useState(initialState);
  const [filesPortret, setFilesPortret] = useState(initialState);
  const [portretCash, setPortretCash] = useState(initialState);

  return (
    <Provider template={AlertTemplate} {...options}>
        <UserContext.Provider value={{ userState, setUserState, userEmail, setEmailState, userCart, setUserCart,filesPortret, setFilesPortret, portretCash, setPortretCash}}>
          <Routes />
        </UserContext.Provider>
      </Provider>
  );
}

export default App;