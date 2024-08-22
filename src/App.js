import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './components/mainpage/MainPage';
import Portfolio from "./components/pages/Portfolio";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
