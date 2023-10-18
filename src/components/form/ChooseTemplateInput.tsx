import { FormControl, FormHelperText, FormLabel, Select, Skeleton, Stack } from "@chakra-ui/react";
import useGetTemplate from "../../hooks/useGetTemplates";
import { PresentationData } from "../../types/presentation";

type Props = {
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const ChooseTemplateInput = ({ presentationData, setPresentationData }: Props) => {

 const { data: templates, isLoading } = useGetTemplate()

 const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

  setPresentationData({
   templateId: event.target.value,
   templateData: presentationData?.templateData ?? null
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
     <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
   ) : (
    <>Error !</>
   )}
  </>
 );
}

export default ChooseTemplateInput;