export interface Template {
  id: string;
  templateName: string;
  templateCode: string;
  templateSchema: Array<SlideSchema>;
}

export interface SlideSchema {
  slideTitle: SlideSchemaParams;
  slideDescription: SlideSchemaParams;
  slideSmallText: SlideSchemaParams;
  slideTransition: SlideSchemaParams;
  slideImage: SlideSchemaParams;
}

export interface SlideSchemaParams {
  text: string;
  isPresent: boolean;
}
