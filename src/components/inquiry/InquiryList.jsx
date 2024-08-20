import InquiryItem from "./InquiryItem";

function InquiryList({inquiries, handleInquiryClick}) {
  return (
    <ul className="space-y-4">
      {inquiries.map((inquiry) => (
        <InquiryItem inquiry={inquiry} handleInquiryClick={handleInquiryClick} />
      ))}
    </ul>
  );

}

export default InquiryList;