import QnaDetailItem from "./QnaDetailItem";

const QnaDetailList = ({ user, questions, handleDelete }) => {
  
  return(
    <div className="">
        {questions.map((question) => (
          <div>
            <QnaDetailItem key={question.id} question={question} user={user} handleDelete={handleDelete}/>
          </div>
          
        ))}
      </div>
  )
}

export default QnaDetailList;