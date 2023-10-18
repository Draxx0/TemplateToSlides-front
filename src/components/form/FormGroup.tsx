import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { SlideSchema, SlideSchemaParams } from "../../types/template";
import { PresentationData } from "../../types/presentation";
import { useMemo } from "react";

type Props = {
 slide: SlideSchema;
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const FormGroup = ({ slide, presentationData, setPresentationData }: Props) => {

 const slidePresentInput = useMemo(() => {
  const presentInput: Record<string, SlideSchemaParams> = {};
  for (const [key, value] of Object.entries(slide)) {
   if (value.isPresent) {
    presentInput[key] = value;
   }
  }
  return presentInput;
 }, [slide])

 const handleInputChange = (key: string, newValue: string) => {
  console.log(key)
  if (presentationData) {
   const updatedData: PresentationData = {
    ...presentationData,
    templateData: presentationData.templateData?.map((slide) =>
     slide.slideTitle === key ? { ...slide, slideTitle: newValue } : slide
    ) || null,
   };
   setPresentationData(updatedData);
  }
 };

 const formControls = Object.entries(slidePresentInput).map(([key, value]) => (
  <FormControl key={key}>
   <FormLabel>{value.text}</FormLabel>
   <Input
    type="text"
    value={(presentationData?.templateData?.find((slide) => slide.slideTitle === key)?.slideTitle || "")}
    onChange={(e) => handleInputChange(key, e.target.value)}
   />
  </FormControl>
 ));

 return (
  <Box display={"flex"} flexDirection={"column"} gap={10}>
   {formControls}
   {JSON.stringify(slidePresentInput)}
  </Box>
 );
}

export default FormGroup;