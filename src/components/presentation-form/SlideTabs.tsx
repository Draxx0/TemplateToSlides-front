import { Box, Button, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import useGetTemplate from "../../hooks/useGetTemplate";
import { PresentationData, Slide } from "../../types/presentation";
import { useEffect, useState } from "react";
import SlideTab from "./SlideTab";
import { generateTemplate } from "../../services/template.service";
import TemplateCode from "../TemplateCode";
import { renderToStaticMarkup } from 'react-dom/server';
import PresentationService from "../../services/presentation.service";
import { queryClient } from "../../main";
import UserService from "../../services/user.service";


type Props = {
  presentationData: PresentationData | null;
  presentationName: string | null;
  setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const SlideTabs = ({ presentationData, setPresentationData, presentationName }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const { data: template, isLoading } = useGetTemplate({
    id: presentationData?.templateId ?? null
  })
  const user = UserService.getUserFromLocalStorage()
  const toast = useToast()

  const areAllSlidesValid = (slides: Slide[]): boolean => {
    return slides.every(slide => {
      return Object.values(slide).every(item => item)
    })
  }

  const generateAndDownloadHTML = async () => {
    const currentPresentationCode = localStorage.getItem("presentation_code")

    if (currentPresentationCode) {
      const htmlContent = `
      <!DOCTYPE html>
       <html lang="en">
         <head>
         <link
         rel="stylesheet"
         href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/reveal.min.css"
        />
        <link
         rel="stylesheet"
         href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/theme/solarized.min.css"
        />
        <link
         rel="stylesheet"
         href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/plugin/highlight/monokai.min.css"
        />
         </head>
            <body>
              ${renderToStaticMarkup(<TemplateCode presentationCode={currentPresentationCode} />)}
              <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/reveal.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.6.1/plugin/highlight/highlight.min.js"></script>
              <script>
                Reveal.initialize({
                  plugins: [RevealHighlight],
                });
              </script>
            </body>   
          </html>
        `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'presentation-reveal.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      try {
        if (presentationName) {
          await PresentationService.savePresentation({
            presentationCode: htmlContent,
            presentationName: presentationName
          }).then(() => {
            if (user) {
              queryClient.invalidateQueries({
                queryKey: ["presentations", user.id],
                exact: true,
              })
            }
          })
            .then(() => {
              toast({
                title: "Présentation crée",
                description: `La présentation : ${presentationName} a bien était crée`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            })
        }
      } catch (error) {
        throw new Error("An error occured during presentation save")
      }
    }
  };

  useEffect(() => {
    if (presentationData?.templateData) {
      const isFormFilled = areAllSlidesValid(presentationData?.templateData)

      if (isFormFilled && presentationName) {
        setIsButtonDisabled(true)
      } else {
        setIsButtonDisabled(false)
      }
    }
  }, [presentationData?.templateData, presentationName])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (presentationData) {
        const response = await generateTemplate(presentationData)
        localStorage.setItem("presentation_code", response)
        generateAndDownloadHTML()
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

          <Box as="form" onSubmit={handleSubmit}>
            <TabPanels>
              {template.templateSchema.map((slide, index) => (
                <TabPanel key={index}>
                  <SlideTab slide={slide} index={index} setPresentationData={setPresentationData} presentationData={presentationData} />
                </TabPanel>
              ))}
            </TabPanels>

            <Button isDisabled={!isButtonDisabled} variant={"outline"} margin={"10px 0 auto auto"} display={"flex"} type="submit" >Générer et télécharger ma présentation</Button>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"} mt={4}>
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