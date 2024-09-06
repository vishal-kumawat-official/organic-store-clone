import { useContext, useMemo } from "react";
import { MyContext } from "../libs/MyContext";
import { Link } from "react-router-dom";

const BestSelling = () => {
  const { products } = useContext(MyContext);
  const bestSellingProducts = useMemo(() => {
    return products.filter((p) => p.bestSelling);
  }, [products]);

  const leafImg =
    "https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/logo-leaf-new.png";

  return (
    <>
      <div className="my-28 max-w-7xl mx-auto p-3">
        <h1 className="text-center text-4xl font-bold">
          Best Selling Products
        </h1>
        <div className="relative min-h-16 my-3">
          <img
            src={leafImg}
            alt="leaf-img"
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {bestSellingProducts.map((p) => {
            return (
              <div key={p.id} className="relative flex flex-col text-center">
                <Link
                  to={`/product/${p.name.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="w-full h-full">
                    <img src={p.img} alt="img" className="w-full" />
                  </div>
                </Link>
                <p className="text-gray-600">{p.category}</p>
                <Link
                  to={`/product/${p.name.replace(/\s+/g, "-").toLowerCase()}`}
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
    </>
  );
};

export default BestSelling;
