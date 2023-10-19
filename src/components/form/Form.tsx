import { Card, CardBody, Heading } from "@chakra-ui/react";
import ChooseTemplateInput from "./ChooseTemplateInput";
import { useState } from "react";
import { PresentationData } from "../../types/presentation";
import SlideTabs from "./SlideTabs";

const Form = () => {
 const [presentationData, setPresentationData] = useState<PresentationData | null>(null)

 return (
  <Card maxWidth={"50%"}>
   <CardBody display={"flex"} flexDirection={"column"} gap={6}>
    <Heading size={"lg"}>Formulaire de création de slides</Heading>

    <ChooseTemplateInput presentationData={presentationData} setPresentationData={setPresentationData} />

    {presentationData?.templateId && (
     <SlideTabs presentationData={presentationData} setPresentationData={setPresentationData} />
    )}
   </CardBody>
  </Card>
 );
}

export default Form;