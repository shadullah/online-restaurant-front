"use client";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Menus {
  id: number;
  price: number;
  name: string;
  image: string;
  description: string;
  is_available: boolean;
}

const MenuDetails = () => {
  const { menuId } = useParams();
  const [product, setProduct] = useState<Menus | null>(null);
  const [loading, setLoad] = useState(true);
  const { user } = useAuth();
  const navigate = useRouter();
  // const [exist, setExist] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `/api/restaurants/${user?.id}/menu/${menuId}`;
        const res = await axios.get(url);
        console.log(res?.data);
        setProduct(res?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchDetails();
  }, [menuId, user?.id]);

  const add_to_cart = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/carts/user/${menuId}`,
        {
          customer_id: name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accToken")}`,
          },
        }
      );
      navigate.push(`/carts`);
      toast.success("Product added to cart successfully!!", { duration: 3000 });
    } catch (error) {
      const errorMessage = "error";
      // error.response?.data?.error || "an unexpected error occured";
      toast.error(errorMessage, {
        duration: 3000,
      });
      // toast.error(error);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center my-8">Details</h1>

      <div>
        {loading ? (
          <>
            <div className="my-12 text-center">Loading....</div>
          </>
        ) : (
          <>
            <div className="max-w-[1200px] mx-auto">
              <div className="block md:flex justify-between items-center">
                <div className="p-12 w-1/2">
                  <Image
                    className="h-[500px] w-[500px]"
                    src={product?.image || ""}
                    alt=""
                    height={400}
                    width={400}
                  />
                </div>
                <div className="w-1/2 text-start">
                  <h1 className="text-5xl font-bold text-center uppercase">
                    {product?.name}
                  </h1>

                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-bold my-6 text-orange-500">
                      ${product?.price}
                    </h3>
                    <h3 className="text-3xl font-bold my-6 ">
                      Available:{" "}
                      {product?.is_available ? (
                        <>YES</>
                      ) : (
                        <>
                          <p>NO</p>
                        </>
                      )}
                    </h3>
                  </div>
                  <p className="text-gray-600  my-6">{product?.description}</p>
                  <div className="text-center">
                    <button
                      onClick={add_to_cart}
                      className="w-1/4 bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
