import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProductDetailDialog = ({ product }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-white w-full text-black border-2 border-gray rounded-full  px-4 py-3 hover:border-black">
        View Product Details
      </DialogTrigger>

      <DialogContent className="h-[550px] px-16 pt-14 md:rounded-[30px] w-[750px] rounded-xl text-black overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            <div className="flex mb-5 flex-row justify-start items-center gap-2">
              <img
                className="w-[60px] object-cover rounded-md h-[60px]"
                src={product.imageUrl[0]}
                alt=""
                srcset=""
              />
              <div className="text-base font-[200]">
                <div>{product.name}</div>
                <div>${product.price}</div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-black mb-5 text-[16px]">
            <p className="mt-2  text-black text-justify">
              {product.description}
            </p>
            <h2 className="mt-4 text-xl ">Key features</h2>
            <ul className=" list-disc pl-5 mt-2 text-justify">
              {product.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* <h2 className="mt-4 text-lg font-semibold">Product details</h2>
            <p className="mt-2">
              Reflective design Swoosh logo, heel patch logo, and laces.
            </p>
            <p>Weight: 320 grams approx. (women's UK 5.5)</p>
            <p>Heel-to-toe drop: 9mm</p>
            <p>Not intended for use as personal protective equipment (PPE).</p>
            <h2 className="mt-4 text-lg font-semibold">Additional Info</h2>
            <p className="mt-2">
              Colour Shown: Vintage Green/Dark Raisin/Green Frost/Bright Crimson
            </p>
            <p>Style: HQ3128-300</p> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
