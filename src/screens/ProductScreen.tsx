import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useMemo, useState } from "react";
import { MyContext } from "../libs/MyContext";
import { Search } from "lucide-react";
import Footer from "../components/Footer";

const ProductScreen = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2].replace(/-/g, " ");
  const { products } = useContext(MyContext);

  const [count, setCount] = useState(1);

  const product = useMemo(() => {
    return products.find((product) =>
      product.name.toLowerCase().includes(currentPath)
    );
  }, [products, currentPath]);

  return (
    <>
      <Navbar />
      <div className="bg-[#f8f6f3] py-20">
        <div className="max-w-7xl mx-auto p-3">
          <div className="mainGrid grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col1 relative">
              <img src={product?.img} alt="img" />
              <p className="bg-white rounded-full p-2 absolute top-2 right-2">
                <Search />
              </p>
            </div>
            <div className="col2">
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="font-bold text-3xl">{product?.name}</h1>
                </div>
                <div className="flex items-center">
                  <p className="font-bold text-2xl">${product?.price}</p>
                  <p className="text-gray-600">+ Free Shipping</p>
                </div>
                <div>
                  <p className="text-gray-600">{product?.desc}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-3 py-1 border-2 border-gray-200 hover:bg-[#6a9739]"
                    onClick={() => count > 1 && setCount(count - 1)}
                  >
                    -
                  </button>
                  <p className="px-3 py-1 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-200">
                    {count}
                  </p>
                  <button
                    className="px-3 py-1 border-2 border-gray-200 hover:bg-[#6a9739]"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                  <button className="px-10 rounded py-1 bg-[#6a9739] text-white ml-3">
                    Add to Cart
                  </button>
                </div>
                <div className="border-t">
                  <p>Category: {product?.category}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-5 flex flex-col">
            <h4 className="text-xl mt-3">Description</h4>
            <p className="text-gray-600">{product?.desc}</p>
          </div>
          {/* related prod */}
          <div>
            <h1 className="my-5 text-3xl font-bold">Related products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {products
                .filter((p) => p.category === product?.category)
                .slice(0, 3)
                .map((p) => {
                  return (
                    <div
                      key={p.id}
                      className="relative flex flex-col text-center"
                    >
                      <Link
                        to={`/product/${p.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        <div className="w-full h-full">
                          <img src={p.img} alt="img" className="w-full" />
                        </div>
                      </Link>
                      <p className="text-gray-600">{p.category}</p>
                      <Link
                        to={`/product/${p.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        <p className="font-bold">{p.name}</p>
                      </Link>
                      <div>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>☆</span>
                        ))}
                      </div>
                      <p className="text-sm font-bold">£ {p.price}</p>
                      {p.sale && (
                        <div className="absolute bg-[#8cc44b] text-sm rounded-full py-2 px-1 top-[-3px] right-0">
                          <p>Sale!</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductScreen;
