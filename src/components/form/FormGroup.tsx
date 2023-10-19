import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { SlideSchema, SlideSchemaParams } from "../../types/template";
import { PresentationData } from "../../types/presentation";
import { useEffect, useMemo } from "react";

type Props = {
 slide: SlideSchema;
 presentationData: PresentationData | null;
 index: number;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const FormGroup = ({ slide, presentationData, setPresentationData, index }: Props) => {

 const slidePresentInput = useMemo(() => {
  const presentInput: Record<string, SlideSchemaParams> = {};
  for (const [key, value] of Object.entries(slide)) {
   if (value.isPresent) {
    presentInput[key] = value;
   }
  }
  return presentInput;
 }, [slide])


 const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  const slideId = slide.slideId;

  setPresentationData(prevState => {
   if (prevState) {
    if (!prevState.templateData) {
     // console.log("NO DATA IN TEMPLATE DATE YET")

     return {
      ...prevState,
      templateData: [
       {
        [key]: value
       }
      ]
     }
    }

    // console.log("THERE IS SOME DATA IN TEMPLATE DATA")

    // console.log("INDEX!!!", index)

    const updatedTemplateData = prevState.templateData.map((slide) => {
     console.log("CURRENT SLIDE", slide)

     const currentSlide = prevState.templateData && prevState.templateData[index]

     console.log("CURRENT SLIDE :", currentSlide)

     if (!currentSlide) {
      return {
       [key]: value
      };
     }

     // console.log("OK !")
     return {
      ...slide,
      [key]: value
     };

    });

    return {
     ...prevState,
     templateData: updatedTemplateData
    };
   }
   return prevState;
  });
 };

 useEffect(() => {
  if (presentationData) console.log("PRESENTATION DATA", presentationData)
 }, [presentationData])


 const formControls = Object.entries(slidePresentInput).map(([key, value]) => (
  <FormControl key={key}>
   <FormLabel>{value.text}</FormLabel>
   <Input
    type="text"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(key, event)}
   />
  </FormControl>
 ));

 return (
  <Box display={"flex"} flexDirection={"column"} gap={10}>
   {formControls}
  </Box>
 );
}

export default FormGroup;