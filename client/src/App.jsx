import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import Footer from './components/Footer';
import { GlobalStateProvider } from './hooks/useGlobalState';
import HomePage from './pages/HomePage';
import { useState } from "react";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [globalState, setGlobalState] = useState({
    user: {
      name: "Fabiane",
      isAdmin: true,
    },
  });

  return (
    
      <GlobalStateProvider value={[globalState, setGlobalState]}>
        <BrowserRouter>
          <Navbar />
            <PageWrapper>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/course/:id" element={<CourseDetailsPage />} />
                <Route path="*" element={<div>Página não encontrada</div>} />
              </Routes>
            </PageWrapper>
          <Footer />
        </BrowserRouter>
      </GlobalStateProvider>
  );
}

export default App;
