import { useEffect } from "react";
import Team from "../components/Team";
import FinalCTA from "../components/FinalCTA";

export default function TeamPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Team hideCTA />
      <FinalCTA />
    </>
  );
}
