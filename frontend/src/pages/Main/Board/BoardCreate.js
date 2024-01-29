import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./BoardCreate.css";

const BoardCreate = () => {
  const dispatch = useDispatch();

  const contentInput = useRef();
  const [board, setBoard] = useState({
    writer: "",
    content: "",
  });

  const submit_handler = () => {
    // POST 요청
  };

  const change_content_handler = (e) => {
    setBoard({
      ...board,
      content: e.target.value,
    });
  };

  return (
    <div className="BoardCreate">
      <div>
        <button className="bt-upload" onClick={submit_handler}>
          업로드
        </button>
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={board.content}
          onChange={change_content_handler}
        />
      </div>
    </div>
  );
};

export default BoardCreate;
