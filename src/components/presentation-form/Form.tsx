import { Box, Card, CardBody, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import ChooseTemplateInput from "./ChooseTemplateInput";
import { useState } from "react";
import { PresentationData } from "../../types/presentation";
import SlideTabs from "./SlideTabs";

const Form = () => {
 const [presentationData, setPresentationData] = useState<PresentationData | null>(null);

 const [presentationName, setPresentationName] = useState<string | null>(null);

 return (
  <>
   <Box
    position={"absolute"} inset={0} zIndex={0} backgroundImage={`url('./assets/bg.jpg')`} backgroundPosition={"center"} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}
   ></Box>
   <Box position={"absolute"} inset={0} opacity={0.3} w={"100%"} h={"100%"} backgroundColor={"black"} zIndex={1}></Box>
   <Card minW={"80%"} overflow={"hidden"} zIndex={2} borderRadius={20}
    style={{
     transition: "min-height 0.4s ease-in-out, max-height 1s ease-in-out",
     maxHeight: presentationData?.templateId ? "2000px" : "200px",
     minHeight: presentationData?.templateId ? "600px" : "200px"
    }}>
    <CardBody display={"flex"} flexDirection={"column"} gap={6}>
     <Heading size={"lg"}>Créer votre présentation <Box as="span" textDecoration={"underline"}>Reveal.JS</Box></Heading>

     <ChooseTemplateInput
      presentationData={presentationData}
      setPresentationData={setPresentationData}
     />

     <FormControl>
      <FormLabel>Nom de votre présentation</FormLabel>
      <Input type="text" required placeholder="ESD-Présentation" onChange={(e) => setPresentationName(e.target.value)} />
     </FormControl>

     {presentationData?.templateId && (
      <SlideTabs presentationName={presentationName} presentationData={presentationData} setPresentationData={setPresentationData} />
     )}
    </CardBody>
   </Card>
  </>
 );
};

export default Form;