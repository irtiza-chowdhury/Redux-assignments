import { Provider } from 'react-redux';
import Mainbody from './component/Mainbody';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Mainbody />
    </Provider>
  );
}

export default App;
