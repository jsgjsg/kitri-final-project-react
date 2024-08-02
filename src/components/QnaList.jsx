import React from "react";
import QnaItem from "./QnaItem";
import { AiFillQuestionCircle } from "react-icons/ai";

const QnaList = () => {
  return (
    <div className="flex flex-col items-center w-full mt-6">
      <QnaItem />
      {/* QnaItem을 추가적으로 반복하여 리스트를 구성할 수 있습니다 */}
    </div>
  );
};

export default QnaList;
