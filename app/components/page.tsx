import Navbar from "./Navbar";
import HeroSlider from "./HeroSlider";
import { TrendingProducts } from "./TrendingProducts";
import { KeyFeatures } from "./KeyFeatures";
import { Footer } from "./Footer";

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <TrendingProducts />
      <KeyFeatures />
      <Footer />
      <main>
        {/* Add your page content here */}
        <h1>Welcome to Azushop</h1>
      </main>
    </div>
  );
}