import * as _var from "../styles/variables";

import Hero from "@/components/Hero";
import Grid from "@/components/home/Grid";

import defaultImage from "../../public/images/categories/default.jpg";
import london2024 from "../../public/images/categories/london2024.jpg";
import capitalism from "../../public/images/categories/capitalism.png";
import universeSimulation from "../../public/images/categories/universeSimulation.jpg";
import theThinBlueLie from "../../public/images/categories/theThinBlueLie.jpg";
import venezia from "../../public/images/categories/venezia.jpg";
import breche2023 from "../../public/images/categories/breche2023.jpg";
import nevache2023 from "../../public/images/categories/nevache2023.jpg";
import neouvielle2022 from "../../public/images/categories/neouvielle2022.jpg";
import summer2022 from "../../public/images/categories/summer2022.jpg";
import twoBodiesColliding from "../../public/images/categories/twoBodiesColliding.png";
import electricity from "../../public/images/categories/electricity.jpg";
import glassBox from "../../public/images/categories/glassBox.jpg";
import temporalDrift from "../../public/images/categories/temporalDrift.jpg";

const staticPosts = [
  {
    slug: "temporal-drift",
    title: "Temporal Drift",
    href: temporalDrift,
  },
  {
    slug: "glass-box",
    title: "Glass box",
    href: glassBox,
  },
  {
    slug: "electricity",
    title: "electricity",
    href: electricity,
  },
  {
    slug: "london-2024",
    title: "London 2024",
    href: london2024,
  },
  {
    slug: "moving-through-space-and-time",
    title: "Moving through space and time",
    href: universeSimulation,
  },
  {
    slug: "venezia-2023",
    title: "Venezia 2023",
    href: venezia,
  },
  {
    slug: "breche-2023",
    title: "La Brèche de Roland & Estaubé 2023",
    href: breche2023,
  },
  {
    slug: "nevache-2023",
    title: "Nevache & summer 2023",
    href: nevache2023,
  },
  {
    slug: "neouvielle-2022",
    title: "Neouvielle 2022",
    href: neouvielle2022,
  },
  {
    slug: "police-brutality",
    title: "A thin blue lie",
    href: theThinBlueLie,
  },
  {
    slug: "summer-2022",
    title: "Summer 2022",
    href: summer2022,
  },
  {
    slug: "capitalism",
    title: "Live, life, love, laugh, capitalism",
    href: capitalism,
  },
  {
    slug: "all-films",
    title: "All films",
    href: defaultImage,
  },
  {
    slug: "two-bodies-colliding",
    title: "Two bodies colliding",
    href: twoBodiesColliding,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Grid posts={staticPosts} />
    </>
  );
}
