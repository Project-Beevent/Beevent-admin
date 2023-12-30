import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const composeProviders = (...Providers) => (Child) => (props) => (
  Providers.reduce((acc, Provider) => (
    <Provider>
      {acc}
    </Provider>
  ), <Child {...props} />)
)

const WrappedApp = composeProviders(

)(App)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WrappedApp></WrappedApp>
  </React.StrictMode>,
)
