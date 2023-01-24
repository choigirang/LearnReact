import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1>home</h1>;
}

function MyPage() {
  return <h1>MyPage</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/mypage">MyPage</Link>
            <Link to="/dashboard">Dashboard</Link>
            {/* Link 컴포넌트를 이용하여 경로를 연결한다.
            ReactDOM으로 렌더를 하면 Link 컴포넌트는 a태그로 바뀐다.
            React에서 a가 아닌 Link를 사용하는 이유는, a는 페이지를 전환하는 과정에서
            페이지를 불러오고 처음부터 렌더링 시킨다 => 새로고침 시킨다.
            Link는 페이지를 전환을 방지하는 기능이 내장되어 있다. */}
          </ul>
        </nav>
        <Routes>
          {/* Routes 컴포넌트는 여러 Route 컴포넌트를 감싸서 그 중 경로가 일치하는 단 하나의
          라우터만 렌더링을 시켜주는 역할을 하며, Routes를 사용하지 않으면 매칭되는 모든 요소를 렌더링한다.
          Route 컴포넌트는 path 속성을 지정하여 해당 path에서 어떤 컴포넌트를 보여줄지 정한다.
          Link 컴포넌트가 정해주는 URL 경로와 일치하는 경우에만 작동된다.
          *만약 사용자가 지정된 주소인 /,/mypage,/dashboard 이외의 주소로 접근하게 되면 의도한 화면이
          보이지 않을 수 있다. 이럴 때 사용할 수 있는 속성이 path="*" 이다.
          지정되지 않은 주소로 접근할 시에는 이 속성이 설정되어 있는 컴포넌트를 보여주게 된다. */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
