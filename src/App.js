import { Provider } from 'react-redux';
import FullBody from './component/FullBody';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <FullBody />
    </Provider>
  );
}

export default App;
