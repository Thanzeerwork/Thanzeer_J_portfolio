import { Monogram } from "./Monogram";

export function Preloader() {
  return (
    <div className="preloader" data-preloader aria-hidden="true">
      <div className="preloader__meta note">
        <span>Plotting thanzeer.dev</span>
        <span>rev. 2026</span>
      </div>
      <Monogram className="preloader__mark is-plotting" />
      <div className="preloader__meta note">
        <span>Thanzeer J · Full-Stack Dev</span>
        <span className="preloader__count" />
      </div>
    </div>
  );
}
