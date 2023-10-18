import { Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useGetTemplate from "../../hooks/useGetTemplate";
import { PresentationData } from "../../types/presentation";
import { useState } from "react";
import SlideTab from "./SlideTab";

type Props = {
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const SlideTabs = ({ presentationData, setPresentationData }: Props) => {
 const [tabIndex, setTabIndex] = useState(0);
 const { data: template, isLoading } = useGetTemplate({
  id: presentationData?.templateId ?? null
 })

 console.log("TEMPLATE", template)


 return (
  <>
   {template ? (
    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
     <TabList>
      {template.templateSchema.map((_, index) => (
       <Tab key={index}>
        Slide {index + 1}
       </Tab>
      ))}
     </TabList>

     <TabPanels>
      {template.templateSchema.map((slide, index) => (

       < TabPanel key={index} >
        Slide {JSON.stringify(slide)}
        <SlideTab slide={slide} setPresentationData={setPresentationData} presentationData={presentationData} />
       </TabPanel>
      ))}
     </TabPanels>
    </Tabs >
   ) : isLoading ? (
    <Spinner />
   ) : (
    <p>Error</p >
   )}
  </>
 );
}

export default SlideTabs;