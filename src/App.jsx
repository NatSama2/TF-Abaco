import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { Login } from './Pages/Login.jsx';
import { Home } from './Pages/Home.jsx';
import { HomeInfo } from './Pages/HomeInfo.jsx';
import { Records } from './Pages/Records.jsx';
import { Certificate } from './Pages/Certificate.jsx';
import { Indicators } from './Pages/Indicators.jsx';
import { PdfView } from './Pages/PdfView.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './firebase.jsx';

function AppRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return authListener;
  }, []);

  const router = useRoutes([
    {
      path: '/',
      element: user ? <Navigate to='/home' /> : <Login />,
    },
    {
      path: '/home',
      element: user ? <Home /> : <Navigate to='/' />,
    },
    {
      path: '/records',
      element: user ? <Records /> : <Navigate to='/' />,
    },
    {
      path: '/certificates',
      element: user ? <Certificate /> : <Navigate to='/' />,
    },
    {
      path: '/indicators',
      element: user ? <Indicators /> : <Navigate to='/' />,
    },
    {
      path: '/pdf-view',
      element: user ? <PdfView /> : <Navigate to='/' />,
    },
    {
      path: '/home-info',
      element: user ? <HomeInfo /> : <Navigate to='/' />,
    },
  ]);
  return router;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;