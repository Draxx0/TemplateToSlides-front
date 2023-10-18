export interface PresentationData {
  templateName: string;
  templateData: Array<Slide>;
}

interface Slide {
  slideTitle: string;
  slideDescription?: string;
  slideSmallText?: string;
  slideTransition: Transition;
  image?: string;
}

type Transition = "zoom" | "fast" | "slide" | "convex" | "concave" | "fade";

export type Stack = "r-stack" | "r-stretch" | "r-fit-text";
