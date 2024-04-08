import GlobalApi from "@/app/_utils/GlobalApi";
import TopCategoryList from "../../_componenet/TopCategoryList";
import Product from "@/app/_components/Product";

async function ProductName({ params }) {
  const productList = await GlobalApi.getProductByCategory(params.productname);
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-4 bg-primary text-white text-3xl text-center ">
        {params.productname}
      </h2>
      <TopCategoryList list={categoryList} />
      <div className="p-5 ">
        <h3 className="text-[#fb8e00] font-bold text-2xl my-8">Products Lists</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 ">
          {productList.map(
            (productDetails, index) =>
              index < 8 && (
                <Product productDetails={productDetails} key={index} />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductName;
