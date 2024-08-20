function InquiryItem({inquiry, handleInquiryClick}) {
  return(
    <li
      key={inquiry.id}
      onClick={() => handleInquiryClick(inquiry.id)}
      className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
    >
      <h2 className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out">
        {inquiry.title}
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(inquiry.createdAt).toLocaleDateString()}
      </p>
    </li>
  )
}

export default InquiryItem;