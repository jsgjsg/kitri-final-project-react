import React from "react";
import QnaItem from "./QnaItem";
import { AiFillQuestionCircle } from "react-icons/ai";

const QnaList = ({ user, Qnas }) => {
  return (
    <div className="flex flex-col items-center w-full mt-6">
      {Qnas.length === 0 ? (
        <p>No Qnas available.</p>
      ) : (
        Qnas.map((Qna) => <QnaItem key={Qnas.id} user={user} Qna={Qna} />)
      )}
    </div>
  );
};

export default QnaList;
