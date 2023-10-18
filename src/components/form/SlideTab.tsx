import { Heading } from "@chakra-ui/react";
import { SlideSchema } from "../../types/template";
import FormGroup from "./FormGroup";
import { PresentationData } from "../../types/presentation";

type Props = {
 slide: SlideSchema;
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const SlideTab = ({ slide, presentationData, setPresentationData }: Props) => {
 return (
  <>
   <Heading size={"lg"} my={10}>Slide Configuration</Heading>
   <FormGroup slide={slide} presentationData={presentationData} setPresentationData={setPresentationData} />
  </>
 );
}

export default SlideTab;