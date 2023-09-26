// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Log from './Log_sign/Log';
import P_page from './profPage/Profpage';
import Dashboard from "./components/Screens/Dashboard";


function App() {

  return (
    <Router>
      <div className="App add">
        <Routes>
          <Route path="/Profil/*" element={<P_page />} />
          <Route exact path="/" element={<Log />} />
          {/* ======================================= */}
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/session:idClass' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
