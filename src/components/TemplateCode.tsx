const TemplateCode = ({ presentationCode }: { presentationCode: string; }) => {
 // const presentationCode = localStorage.getItem("presentation_code")
 if (presentationCode) {
  return (
   <div className="reveal" dangerouslySetInnerHTML={{
    __html: presentationCode
   }}>
   </div>
  );
 }
}

export default TemplateCode;