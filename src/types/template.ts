export interface Template {
  id: string;
  templateName: string;
  templateCode: string;
  templateSchema: Array<SlideSchema>;
}

export interface SlideSchema {
  slideId: number;
  slideTitle: SlideSchemaParams;
  slideDescription: SlideSchemaParams;
  slideSmallText: SlideSchemaParams;
  slideTransition: SlideSchemaParams;
  image: SlideSchemaParams;
}

export interface SlideSchemaParams {
  text: string;
  isPresent: boolean;
}
