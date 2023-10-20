export interface PresentationData {
  templateId: string;
  templateData: Array<Slide> | null;
}

export interface Slide {
  slideTitle: string;
  slideDescription?: string;
  slideSmallText?: string;
  slideTransition: Transition;
  image?: string;
}

type Transition =
  | ""
  | "zoom"
  | "fast"
  | "slide"
  | "convex"
  | "concave"
  | "fade";

export type Stack = "r-stack" | "r-stretch" | "r-fit-text";

export interface PresentationSave {
  presentationName: string;
  presentationCode: string;
}

export interface Presentation extends PresentationSave {
  id: string;
  createdAt: string;
}
