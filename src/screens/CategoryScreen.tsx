import { Link, useParams } from "react-router-dom";
import { ProductType } from "../libs/types";
import { MyContext } from "../libs/MyContext";
import { useContext } from "react";
import ProductComponent from "../components/ProductComponent";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoryScreen = () => {
  const { categoryType } = useParams();
  const { products } = useContext(MyContext);

  const productCategoryList =
    categoryType === "shop"
      ? products
      : products?.filter((ele: ProductType) => {
          return ele.category.toLowerCase() === categoryType;
        });

  const saleProducts = products?.filter((ele: ProductType) => {
    return ele?.sale === true;
  });

  return (
    <>
      <div className="bg-gray-100">
        <div className="lg:max-w-7xl px-10 xl:px-auto md:mx-auto">
          <div className="grid lg:grid-cols-3 py-12">
            <div className="lg:block hidden border-r border-gray-600 border-opacity-25 py-5 px-16">
              <div className="gap-3 flex items-center">
                <div>
                  <input
                    type="text"
                    placeholder="Search Products..."
                    className="border p-2 max-w-[300px] w-full"
                  />
                </div>
                <div>
                  <button className="p-2 bg-[#6a9739] rounded">
                    <ChevronRight color="#fff" />
                  </button>
                </div>
              </div>
              <div className=" mt-20">
                {saleProducts?.slice(0, 3)?.map((ele) => {
                  return (
                    <div key={ele?.id} className="mb-8">
                      <ProductComponent data={ele} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 py-5 lg:px-10">
              <div className="text-gray-500">
                <Link to={"/"}>Home</Link> / {categoryType}
              </div>
              <div>
                <h3 className="text-[#8ec44e] text-6xl mt-5 font-bold capitalize">
                  {categoryType}
                </h3>
              </div>
              <div className="flex justify-between mt-10">
                <div>Showing all results</div>
                <div>
                  <select className="seleect bg-transparent">
                    <option>Default Sort</option>
                    <option>Sort by popularity</option>
                    <option>Sort by price low to high</option>
                    <option>Sort by price high to low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {productCategoryList?.map((ele) => {
                  return <ProductComponent key={ele?.id} data={ele} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryScreen;
