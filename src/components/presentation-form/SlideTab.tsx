import { Heading } from "@chakra-ui/react";
import { SlideSchema } from "../../types/template";
import FormGroup from "./FormGroup";
import { PresentationData } from "../../types/presentation";

type Props = {
 slide: SlideSchema;
 presentationData: PresentationData | null;
 index: number;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const SlideTab = ({ slide, presentationData, setPresentationData, index }: Props) => {
 return (
  <>
   <Heading size={"lg"} my={2}>Slide {index + 1} Configuration</Heading>
   <FormGroup slide={slide} presentationData={presentationData} setPresentationData={setPresentationData} />
  </>
 );
}

export default SlideTab;