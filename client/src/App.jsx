import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CourseDetailsPage from "./pages/CourseDetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
          <PageWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/course/:id" element={<CourseDetailsPage />} />
              <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
          </PageWrapper>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
