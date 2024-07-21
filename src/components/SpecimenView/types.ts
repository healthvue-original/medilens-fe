export interface Context {
  "@context": string | string[];
}

export interface Identifiable {
  id?: string;
  type?: string;
}

export interface Body extends Identifiable {
  value?: string;
  purpose?: string;
  format?: string;
  language?: string;
}

export interface Target extends Identifiable {
  source?: string;
  selector?: Selector;
  state?: State;
  styleClass?: string;
  rendering?: Rendering;
}

export interface Selector extends Identifiable {
  value?: string;
  refinedBy?: Selector;
}

export interface State extends Identifiable {
  value?: string;
  sourceDateStart?: string;
  sourceDateEnd?: string;
}

export interface Rendering extends Identifiable {
  label?: string;
  format?: string;
}

export interface Annotation extends Context, Identifiable {
  motivation?: string | string[];
  body?: Body[];
  target: Target | Target[];
  creator?: Agent | Agent[];
  generated?: string;
  generatedBy?: Agent;
  modified?: string;
  partOf?: Identifiable;
  audience?: Identifiable;
  stylesheet?: Stylesheet;
  rights?: string;
}

interface Stylesheet extends Identifiable {
  value: string;
  type: "CssStylesheet";
}

interface Agent extends Identifiable {
  name?: string;
  nickname?: string;
  email?: string;
  homepage?: string;
}

export interface AnnotoriousOpenSeadragon {
  addAnnotation(annotation: Annotation): void;
  removeAnnotation(annotationId: string): void;
  getAnnotations(): Annotation[];
  setAnnotations(annotations: Annotation[]): void;
  on(event: string, callback: (annotation: Annotation) => void): void;
  off(event: string, callback: (annotation: Annotation) => void): void;
  setVisible(visible: boolean): void;
}

export interface OpenSeadragonAnnotatorOptions {
  image: string; // ID or element of the OpenSeadragon viewer
  readOnly?: boolean;
  formatter?: (annotation: Annotation) => string;
}
