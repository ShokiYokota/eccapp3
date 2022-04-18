import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore} from "./reducks/store/store";
import {App} from './App';
import {createBrowserHistory} from "history";
import  {ConnectedRouter}  from 'connected-react-router' ;

const history = createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
    // <React.StrictMode> //historyに何が入るか？
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')// </React.StrictMode>,
);