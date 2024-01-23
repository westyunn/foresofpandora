import KakaoLogin from "./api/KakaoOauth/KakaoLogin";
import { Route, Routes } from "react-router-dom";
import KakaoOauth from "./api/KakaoOauth/KakaoOauth";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<KakaoOauth />} />
           <Route path="/login" element={<KakaoLogin/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
