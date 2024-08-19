import React from "react";
import QnaItem from "./QnaItem";

const QnaList = ({ user, Qnas, handleDelete }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {Qnas.length === 0 ? (
        <p>No Qnas available.</p>
      ) : (
        Qnas.map((Qna) => (
          <QnaItem
            key={Qna.id}
            user={user}
            Qna={Qna}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default QnaList;
