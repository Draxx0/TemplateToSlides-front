import { Box, Button, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useGetTemplate from "../../hooks/useGetTemplate";
import { PresentationData, Slide } from "../../types/presentation";
import { useEffect, useState } from "react";
import SlideTab from "./SlideTab";
import { generateTemplate } from "../../services/template.service";

type Props = {
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const SlideTabs = ({ presentationData, setPresentationData }: Props) => {
 const [tabIndex, setTabIndex] = useState(0);
 const [isButtonDisabled, setIsButtonDisabled] = useState(false)
 const { data: template, isLoading } = useGetTemplate({
  id: presentationData?.templateId ?? null
 })

 const areAllSlidesValid = (slides: Slide[]): boolean => {
  return slides.every(slide => {
   return Object.values(slide).every(item => item)
  })
 }

 useEffect(() => {
  if (presentationData?.templateData) {
   setIsButtonDisabled(areAllSlidesValid(presentationData?.templateData))
  }
 }, [presentationData?.templateData])

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
   if (presentationData) {
    const response = await generateTemplate(presentationData)
    //! CHECK WRITE FILE TO INSERT REVEAL CODE & ADD TOAST || MODAL ?
   }
  } catch (error) {
   throw new Error("An error occured during template generation")
  }
 }

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

     <Box as="form" onSubmit={handleSubmit} mb={10}>
      <TabPanels>
       {template.templateSchema.map((slide, index) => (
        <TabPanel key={index}>
         <SlideTab slide={slide} index={index} setPresentationData={setPresentationData} presentationData={presentationData} />
        </TabPanel>
       ))}
      </TabPanels>

      <Button isDisabled={!isButtonDisabled} variant={"outline"} margin={"10px 0 auto auto"} display={"flex"} type="submit" >Générer ma présentation</Button>
     </Box>

     <Box display={"flex"} justifyContent={"space-between"}>
      <Button isDisabled={tabIndex === 0} onClick={() => setTabIndex(tabIndex - 1)}>Slide Précédente</Button>
      <Button isDisabled={tabIndex === template.templateSchema.length - 1} onClick={() => setTabIndex(tabIndex + 1)}>Slide Suivant</Button>
     </Box>
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