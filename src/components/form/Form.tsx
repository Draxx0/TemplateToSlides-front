import { Card, CardBody, Heading } from "@chakra-ui/react";
import ChooseTemplateInput from "./ChooseTemplateInput";
import { useEffect, useState } from "react";
import { PresentationData } from "../../types/presentation";
import SlideTabs from "./SlideTabs";

const Form = () => {
 const [presentationData, setPresentationData] = useState<PresentationData | null>(null)

 useEffect(() => {
  if (presentationData) console.log("PRESENTATION DATA", presentationData)
 }, [presentationData])

 return (
  <Card maxWidth={"50%"}>
   <CardBody display={"flex"} flexDirection={"column"} gap={6}>
    <Heading size={"lg"}>Formulaire de création de slides</Heading>

    <ChooseTemplateInput presentationData={presentationData} setPresentationData={setPresentationData} />

    <SlideTabs presentationData={presentationData} setPresentationData={setPresentationData} />

    {/* <Tabs>
     <TabList>
      <Tab>One</Tab>
      <Tab>Two</Tab>
      <Tab>Three</Tab>
     </TabList>

     <TabPanels>
      <TabPanel>
       <p>one!</p>
      </TabPanel>
      <TabPanel>
       <p>two!</p>
      </TabPanel>
      <TabPanel>
       <p>three!</p>
      </TabPanel>
     </TabPanels>
    </Tabs> */}
   </CardBody>
  </Card>
 );
}

export default Form;