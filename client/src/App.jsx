import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import Footer from './components/Footer';
import { GlobalStateProvider } from './hooks/useGlobalState';
import HomePage from './pages/HomePage';
import { useState } from "react";

function App() {

  const [globalState, setGlobalState] = useState({
    user: {
      name: "Fabiane",
      isAdmin: true,
    },
  });

  return (
    <GlobalStateProvider value={[globalState, setGlobalState]}>
      <Navbar />

      <PageWrapper>
        <HomePage />
      </PageWrapper>

      <Footer />
    </GlobalStateProvider>
  );
}

export default App;
