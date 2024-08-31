/* eslint-disable no-unused-vars */
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Axe, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${params.productId}`,
        newProduct
      );
    },
  });

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${params.productId}`
    );
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    isError,
    data: product,
  } = useQuery({
    queryKey: ["product", params.productId],
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

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{isError.message}</p>
      </div>
    );
  }

  if (mutation.isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-50">
        <Loader2 className="animate-spin w-16 h-16 text-gray-600" />
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{mutation.error.message}</p>
      </div>
    );
  }
  return (
    <div>
      Products:{product.title}
      <button
        onClick={() => {
          mutation.mutate({ title: "Do Laundry" });
        }}
      >
        Create Todo
      </button>
    </div>
  );
};

export default Product;
