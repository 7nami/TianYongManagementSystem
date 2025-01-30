// import logo from './logo.svg';
import './App.css';
import router from './router'
import { RouterProvider } from 'react-router-dom';


function App() {
  return (
    <div className='app'>
        <RouterProvider router={router}>
            {/* <div className='app-header'>
            <img src={logo} className='app-logo' alt='logo' />
            <h1>Welcome to React</h1>
            </div>
            <div className='app-content'>
            <router.Component />
            </div> */}
        </RouterProvider>
    </div>
  );
}

export default App;
