import { FormControl, FormHelperText, FormLabel, Select, Skeleton, Stack } from "@chakra-ui/react";
import { PresentationData, Slide } from "../../types/presentation";
import useGetTemplates from "../../hooks/useGetTemplates";
import useGetTemplate from "../../hooks/useGetTemplate";
import { useCallback, useEffect } from "react";

type Props = {
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const ChooseTemplateInput = ({ presentationData, setPresentationData }: Props) => {

 const { data: templates, isLoading } = useGetTemplates()

 const { data: template } = useGetTemplate({
  id: presentationData?.templateId ?? null
 })

 const createSlidesSchema = useCallback(() => {
  if (template) {
   const slidesSchema: Slide[] = template.templateSchema.map((slide) => {
    return {
     slideTitle: "",
     slideDescription: "",
     ...(slide.slideSmallText.isPresent ? { slideSmallText: "" } : {}),
     slideTransition: "",
     ...(slide.image.isPresent ? { image: "" } : {})
    }
   })

   setPresentationData(prevState => {
    if (prevState) {
     return {
      ...prevState,
      templateData: slidesSchema
     }
    }

    return null
   })
  }
 }, [setPresentationData, template])

 useEffect(() => {
  createSlidesSchema()
 }, [createSlidesSchema])

 const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  if (presentationData) {
   setPresentationData(prevState => {
    if (prevState) {
     return {
      ...prevState,
      templateId: event.target.value
     }
    }
    return null
   })
  }

  setPresentationData({
   templateId: event.target.value,
   templateData: null
  })
 }

 return (
  <>
   {isLoading ? (
    <Stack>
     <Skeleton height='15px' />
     <Skeleton height='30px' />
    </Stack>
   ) : templates ? (
    <FormControl>
     <FormLabel>Choisissez un thème</FormLabel>
     <Select placeholder='Veuillez choisir un thème' onChange={handleChange}>
      {templates.map((template) => (
       <option key={template.id} value={template.id}>{template.templateName}</option>
      ))}
     </Select>
     <FormHelperText>Choisissez un thème parmis ce disponible.</FormHelperText>
    </FormControl>
   ) : (
    <>Error !</>
   )}
  </>
 );
}

export default ChooseTemplateInput;