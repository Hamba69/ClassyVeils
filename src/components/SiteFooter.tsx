import FabricFold from "./FabricFold";
import FooterAdminTrigger from "./FooterAdminTrigger";

export default function SiteFooter() {
  return (
    <footer className="mt-12">
      <div className="hidden sm:block">
        <FabricFold />
      </div>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-8 text-center text-xs text-ink/50 sm:px-6 sm:text-sm">
        <FooterAdminTrigger />
        <p className="mt-3">Classyveils.ug — Anisha B Yusurah</p>
      </div>
    </footer>
  );
}
