import "./assets/styles/universal.scss";
import Header from "./components/Header";
import Home from "./pages";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DesignHistory from "./pages/designHistoryNew";
import Contact from "./pages/contact";
import NotFound from "./pages/error";
import Submission from "./pages/submission";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/design-history" element={<DesignHistory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submit" element={<Submission />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
