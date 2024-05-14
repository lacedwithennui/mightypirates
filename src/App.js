import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/universal.scss";
import Header from "./components/Header";
import Home from "./pages";
import Contact from "./pages/contact";
import DesignHistory from "./pages/changebackto_designHistory";
import DesignPackage from "./pages/designPackage";
import NotFound from "./pages/error";
import Submission from "./pages/submission";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/design-history" element={<DesignHistory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit" element={<Submission />} />
            <Route path="/design-package" element={<DesignPackage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
