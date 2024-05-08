import Landingpage from "@/components/LandingPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-2/5 border border-black"> {children}</div>

      <div className="w-3/5 border border-black">
        <Landingpage />
      </div>
    </div>
  );
}
