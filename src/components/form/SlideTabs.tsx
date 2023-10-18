import { PresentationData } from "../../types/presentation";

type Props = {
 presentationData: PresentationData | null;
 setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
}

const SlideTabs = ({ presentationData, setPresentationData }: Props) => {


 return ( 

  );
}

export default SlideTabs;