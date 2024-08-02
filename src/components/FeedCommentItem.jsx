const FeedCommentItem = ({comment, onDelete}) => {

  return (
    <div>
      <div>작성자 : {comment.nickname}</div>
      <div>내용 : {comment.content}</div>
      <div>작성 시간 : {comment.createdAt}</div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onDelete(comment.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  )
}

export default FeedCommentItem;