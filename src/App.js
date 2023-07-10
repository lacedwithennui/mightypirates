import logo from './logo.svg';
import "./assets/styles/universal.scss";
import Header from "./components/Header";
import Home from "./pages";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import About from "./pages/about";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
