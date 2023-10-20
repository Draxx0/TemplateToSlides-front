import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { SlideSchema, SlideSchemaParams } from "../../types/template";
import { PresentationData } from "../../types/presentation";
import { useMemo } from "react";
import { transitions } from "../../data/transitions";

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

 const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  handleChange("slideTransition", event);
 };


 const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  const { value } = event.target;
  const slideId = slide.slideId;

  if (presentationData?.templateData) {

   const updatedTemplateData = presentationData.templateData.map((slide, index) => {
    if (index === slideId - 1) {
     return {
      ...slide,
      [key]: value
     }
    }

    return slide
   })

   setPresentationData(prevState => {
    if (prevState) {
     return {
      ...prevState,
      templateData: updatedTemplateData
     }
    }

    return prevState
   })
  }
 };


 const formControls = Object.entries(slidePresentInput).map(([key, value], index) => (
  <FormControl key={key}>
   <FormLabel>{value.text}</FormLabel>
   {key === "slideTransition" ? (
    <Select placeholder='Veuillez choisir une transition' onChange={handleSelectChange}>
     {transitions.map((transition, index) => (
      <option key={index} value={transition}>{transition}</option>
     ))}
    </Select>
   ) : (
    <Input
     type="text"
     required
     name={`${key}${index}`}
     onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(key, event)}
    />
   )}
  </FormControl>
 ));

 return (
  <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gap={10}>
   {formControls}
  </Box>
 );
}

export default FormGroup;