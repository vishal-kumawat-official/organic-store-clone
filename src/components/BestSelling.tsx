import { useEffect, useMemo } from "react";
import ProductComponent from "./ProductComponent";
import { leafImg } from "../libs/mock";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ProductType } from "../libs/types";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/products/actions";

const BestSelling = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    error,
    loading,
  } = useSelector((state: RootState) => state.products);
  const bestSellingProducts = useMemo(() => {
    return products.filter((p: ProductType) => p.bestSelling);
  }, [products]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <div className="my-28 max-w-7xl mx-auto p-3">
            <h1 className="text-center text-4xl font-bold">Loading...</h1>
          </div>
        </>
      ) : error ? (
        <div>
          <h1 className="text-center text-4xl font-bold">
            Error fetching data : {error}
          </h1>
        </div>
      ) : (
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
              {bestSellingProducts.map((p: ProductType) => {
                return <ProductComponent key={p.id} data={p} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BestSelling;
