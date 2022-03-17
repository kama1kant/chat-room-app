import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { isSignIn } from './utils/auth';

function App() {
  if (!isSignIn()) {
    <Redirect to="/signin" />
  }
  return (
    <BrowserRouter><title>Chat Room App</title>
      <div className="App">
        {
          <div>
            {/* <Navbar /> */}
            <Main />
          </div>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
