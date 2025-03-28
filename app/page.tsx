import HeroSlider from "./components/Homepage/HeroSlider";
import { TrendingProducts } from "./components/Homepage/TrendingProducts";
import { KeyFeatures } from "./components/Homepage/KeyFeatures";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrendingProducts />
      <KeyFeatures />
    </>
  );
}