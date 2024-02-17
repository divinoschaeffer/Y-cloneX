import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Setup from "./pages/Setup"
import Home from './pages/Home';
import Post from './pages/Post';

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Setup}></Route>
          <Route path='/home' Component={Home}></Route>
          <Route path='/post/:id' element={<Post></Post>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider> 
  );
}

export default App;
