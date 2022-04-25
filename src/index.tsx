import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore} from "./reducks/store/store";
import {App} from './App';
import {createBrowserHistory} from "history";
import  {ConnectedRouter}  from 'connected-react-router' ;
import { MuiThemeProvider } from '@material-ui/core';
import {theme} from "./assets/theme"

const default function
const history = createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
    // <React.StrictMode> //historyに何が入るか？
    <Provider store={store}>
     <ConnectedRouter history={history}>
       <MuiThemeProvider theme={theme}>
        <App/>
       </MuiThemeProvider>
     </ConnectedRouter>
    </Provider>,
  document.getElementById('root')// </React.StrictMode>,
);