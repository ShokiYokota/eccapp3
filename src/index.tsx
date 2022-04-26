import React from 'react';
import { render }from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import {createStore} from './reducks/store/store';
import * as serviceWorker from './serviceWorker';
import './assets/reset.css'
import './assets/style.css'
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './assets/theme'
import {App} from './App';
import { BrowserRouter } from 'react-router-dom';

const history = History.createBrowserHistory();
export const store = createStore(history);
console.log("router");
render(
  
    <Provider store={store}>
        <ConnectedRouter history={history} >
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)

serviceWorker.unregister();
// import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from './reducks/store/store'
// import { App } from './App'
// import reportWebVitals from './reportWebVitals'
// import { ConnectedRouter } from 'connected-react-router'
// import * as Hsitory from 'history'
// import { BrowserRouter } from 'react-router-dom'
// import { MuiThemeProvider } from '@material-ui/core'
// import {theme} from './assets/theme'



// const history = Hsitory.createBrowserHistory();
// export const store = createStore(history);

// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <MuiThemeProvider theme={theme}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </MuiThemeProvider>
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root')
// )

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()