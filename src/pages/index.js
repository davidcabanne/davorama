import * as _var from "../styles/variables";

import Hero from "@/components/sections/Hero";
import GridHome from "@/components/sections/GridHome";

import defaultImage from "../../public/images/categories/default.jpg";
import capitalism from "../../public/images/categories/capitalism.png";
import universeSimulation from "../../public/images/categories/universeSimulation.jpg";
import theThinBlueLie from "../../public/images/categories/theThinBlueLie.jpg";
import venezia from "../../public/images/categories/venezia.jpg";
import breche2023 from "../../public/images/categories/breche2023.jpg";
import nevache2023 from "../../public/images/categories/nevache2023.jpg";
import neouvielle2022 from "../../public/images/categories/neouvielle2022.jpg";
import summer2022 from "../../public/images/categories/summer2022.jpg";

const staticPosts = [
  {
    slug: "moving-through-space-and-time",
    title: "Moving through space and time",
    href: universeSimulation,
  },
  {
    slug: "venezia",
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
];

export default function Home() {
  return (
    <>
      <Hero />
      <GridHome posts={staticPosts} />
    </>
  );
}
