import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
};

const Products = () => {
  const [imagesLoading, setImagesLoading] = useState({});

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-50">
        <Loader2 className="animate-spin w-16 h-16 text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
  const handleImageLoad = (id) => {
    setImagesLoading((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                {imagesLoading[product.id] !== false && (
                  <div className="flex items-center justify-center w-full h-full">
                    <Loader2 className="animate-spin w-10 h-10" />
                  </div>
                )}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={`h-full w-full object-cover object-center lg:h-full lg:w-full ${
                    imagesLoading[product.id] !== false ? "hidden" : ""
                  }`}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => handleImageLoad(product.id)}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
