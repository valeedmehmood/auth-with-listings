import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Dashboard from './components/Layout';
import './App.css';
import Login from 'pages/login';
import Listing from 'pages/listing';
import Details from 'pages/details';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<Listing />} />
        <Route path="details/:code" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
