import Header from "./components/Header";
import Main from "./components/Main";
import PageChart from "./components/PageChart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <>
    //   <Header />
    //   <Main />
    // </>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="page" element={<PageChart />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
