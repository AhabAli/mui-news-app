import * as React from "react";
import { ThemeToggle } from "../components/ThemeToggle";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div>
      Home Page <ThemeToggle />
    </div>
  );
}
