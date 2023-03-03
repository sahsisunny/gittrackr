import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/home';
import MyRepos from './components/pages/MyRepos';
import Orgs from './components/pages/orgs';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/myrepos' exact element={<MyRepos/>} />
          <Route path='/orgs' exact element={<Orgs/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
