import { Card, CardBody, Heading } from "@chakra-ui/react";
import ChooseTemplateInput from "./ChooseTemplateInput";
import { useState, useEffect } from "react";
import { PresentationData } from "../../types/presentation";
import SlideTabs from "./SlideTabs";

const Form = () => {
  const [presentationData, setPresentationData] = useState<PresentationData | null>();
  const [isESDSelected, setIsESDSelected] = useState(false);

  const handleTemplateChange = (templateId) => {
    setIsESDSelected(templateId === "ESD");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('aperture-vintage-HF1IO60tQdc-unsplash.jpg')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "opacity(0.5)",
        }}
      ></div>
      <Card maxHeight={presentationData?.templateId ? 3000 : 200} maxWidth={"50%"} overflow={"hidden"} transition={"ease-in-out 0.5s all"}
        style={{
          zIndex: 1,
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "20px",
          marginTop: isESDSelected ? "20px" : "0",
          overflow: "hidden",
          maxHeight: isESDSelected ? "80vh" : "auto",
          transition: "max-height 3s ease-out",
        }}
      >
        <CardBody display={"flex"} flexDirection={"column"} gap={6}>
          <Heading size={"lg"}>Formulaire de création de slides</Heading>

          <ChooseTemplateInput
            presentationData={presentationData}
            setPresentationData={setPresentationData}
            onTemplateChange={handleTemplateChange}
          />

          {presentationData?.templateId && (
            <SlideTabs presentationData={presentationData} setPresentationData={presentationData} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Form;