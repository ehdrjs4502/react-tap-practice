import DockLayout from "rc-dock";
import React, { useRef, useState } from "react";
import "./styles/rc-dock-dark.css"; // 다크모드(커스텀)
import Test from "./components/test";
// import "rc-dock/dist/rc-dock.css"; // 기본모드

//dock-content-animated 삭제

// 탭 형식에 맞게 만드는 함수
function getTab(id, component) {
  return {
    id, // 탭의 고유한 ID
    content: component, // 탭 내용
    title: id, // 탭 제목
  };
}

function App() {
  const dockLayoutRef = useRef(null); // DockLayout 컴포넌트에 대한 ref 생성
  const [count, setCount] = useState(2); // 탭의 개수를 관리하기 위한 상태

  // 탭 추가 함수
  const addTab = () => {
    setCount((prevCount) => prevCount + 1); // 탭 개수 증가
    const newTab = getTab(`tab${count + 1}`, <Test />); // 새로운 탭 생성
    dockLayoutRef.current.dockMove(newTab, "my_panel", "middle"); // 생성한 탭을 DockLayout에 추가
  };

  // 초기 레이아웃 설정
  const defaultLayout = {
    dockbox: {
      mode: "vertical", // 수직 모드로 설정
      children: [
        {
          id: "my_panel", // 패널의 고유한 ID
          tabs: [
            // 패널에 초기 탭 설정
            getTab("tab1", 1),
            getTab("tab2", 2),
          ],
        },
      ],
    },
  };

  return (
    <div>
      {/* 탭 추가 버튼 */}
      <button className="btn" onClick={addTab}>
        Add Tab
      </button>

      {/* DockLayout 컴포넌트 */}
      <DockLayout
        ref={dockLayoutRef} // ref 설정
        defaultLayout={defaultLayout} // 초기 레이아웃 설정
        style={{ position: "absolute", left: 10, top: 40, right: 10, bottom: 10 }} // 스타일 설정
      />
    </div>
  );
}

export default App;
