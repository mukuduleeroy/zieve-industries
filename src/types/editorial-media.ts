interface EditorialMediaBase {
  src: string;
  alt: string;
  caption: string;
  desktopPosition: string;
  mobilePosition: string;
}
export type EditorialMediaConfig = EditorialMediaBase & (
  | { kind: 'placeholder' }
  | { kind: 'image'; approval: string }
);
