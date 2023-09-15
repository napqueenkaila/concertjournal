import Concerts from "./pages/Concerts";
import ConcertDetail from "./pages/ConcertDetail";
import Layout from "./components/Layout";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Concerts />} />
          <Route path="/:id" element={<ConcertDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  // return (<>
  // 	<Header />
  // 	<Home />
  // 	<Footer />
  // </>
  // )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
