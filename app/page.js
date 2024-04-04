import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
export default async function Home() {
  const sliderList = await GlobalApi.getBanners();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getProductList();
  return (
    <main className="p-12 ">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />

      {/* Banner */}

      <Image src={'/banner.avif'} width={1000} height={300} alt="banner" className="w-full h-[400px] object-cover" />

      {/* Footer */}
      <Footer />
    </main>
  );
}
