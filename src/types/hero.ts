/** Only configure media whose ownership/usage rights have been approved. */
interface HeroMediaBase {
  caption: string;
  desktopPosition: string;
  mobilePosition: string;
}
export type HeroMediaConfig = HeroMediaBase & (
  | { kind: 'placeholder'; src: string }
  | { kind: 'image'; src: string; mobileSrc?: string; approval: string }
  | { kind: 'video'; src: string; poster: string; mobilePoster: string; approval: string }
);
