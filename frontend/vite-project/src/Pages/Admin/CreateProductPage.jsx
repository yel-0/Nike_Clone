import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GeneralInformation from "@/Design/Admin/GeneralInformation";
import PricingInformation from "../../Design/Admin/PricingInformation";
import CategorySelector from "../../Design/Admin/CategorySelector";
import UseForSelector from "../../Design/Admin/UseForSelector";
import SizeColorStockInput from "../../Design/Admin/SizeColorStockInput";
import UploadImages from "../../Design/Admin/UploadImages";
import KeyFeaturesInput from "../../Design/Admin/KeyFeaturesInput";
import useCreateProduct from "@/Hook/Product/useCreateProduct";
import { useToast } from "@/hooks/use-toast";

const CreateProductPage = () => {
  const { toast } = useToast();

  const [sizeInput, setSizeInput] = useState([]);
  const [colorInput, setColorInput] = useState([]);

  const [useFor, setUseFor] = useState("");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [stockInput, setStockInput] = useState("");
  const [keyFeatures, setKeyFeatures] = useState([]);

  const { mutate: createProduct, isLoading } = useCreateProduct({
    onSuccess: () => {
      toast({
        title: "Product created successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });

  const refs = useRef({
    productNameRef: null,
    productDescriptionRef: null,
    basePriceRef: null,
    discountPercentageRef: null,
  });

  const setRefs = (newRefs) => {
    Object.assign(refs.current, newRefs);
  };

  const [formData, setFormData] = useState({
    imageUrl: [],
    previewUrls: [],
    name: "",
    description: "",
    keyFeatures: [],
    basePrice: 0,
    discountPercentage: 0,
    category: "",
    useFor: "",
    gender: "",
    ageGroup: "",
    sizes: [],
    colors: [],
    stock: 0,
    tags: [],
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: [...prevData.imageUrl, ...files],
      previewUrls: [...prevData.previewUrls, ...previewUrls],
    }));
  };

  const handleImageRemove = (index) => {
    setFormData((prevData) => {
      const updatedImageUrls = prevData.imageUrl.filter((_, i) => i !== index);
      const updatedPreviewUrls = prevData.previewUrls.filter(
        (_, i) => i !== index
      );

      return {
        ...prevData,
        imageUrl: updatedImageUrls,
        previewUrls: updatedPreviewUrls,
      };
    });
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategoryId(category);
    setFormData((prevData) => ({ ...prevData, category }));
  };

  const handleTagChange = (value) => {
    if (value && !formData.tags.includes(value)) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, value],
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formSubmissionData = new FormData();

    // Append each field
    formSubmissionData.append(
      "name",
      refs.current.productNameRef?.current?.value || ""
    );
    formSubmissionData.append(
      "description",
      refs.current.productDescriptionRef?.current?.value || ""
    );
    formSubmissionData.append(
      "price",
      parseFloat(refs.current.basePriceRef?.current?.value) || 0
    );
    formSubmissionData.append(
      "discountPercentage",
      parseFloat(refs.current.discountPercentageRef?.current?.value) || 0
    );
    formSubmissionData.append("category", selectedCategoryId);
    formSubmissionData.append("useFor", useFor);
    formSubmissionData.append("gender", gender);
    formSubmissionData.append("ageGroup", ageGroup);
    formSubmissionData.append("stock", parseInt(stockInput) || 0);

    // Append key features
    keyFeatures.forEach((feature) => {
      formSubmissionData.append("keyFeatures[]", feature);
    });

    // Append sizes directly as array items
    sizeInput.forEach((size) => {
      formSubmissionData.append("sizes[]", size.trim());
    });

    // Append colors directly as array items
    colorInput.forEach((color) => {
      formSubmissionData.append("colors[]", color.trim());
    });

    // Append tags
    if (formData.tags.length > 0) {
      formData.tags.forEach((tag) => {
        formSubmissionData.append("tags[]", tag);
      });
    }

    // Append images
    if (formData.imageUrl.length > 0) {
      formData.imageUrl.forEach((file) => {
        formSubmissionData.append("images", file);
      });
    }

    // Log FormData entries
    // for (const [key, value] of formSubmissionData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    createProduct(formSubmissionData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="mx-auto w-full bg-[#fff] rounded-lg">
      <form
        onSubmit={handleFormSubmit}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-3 text-sm flex-wrap xl:flex-nowrap flex-row justify-start items-start">
          <div className="flex flex-col w-full gap-3">
            <GeneralInformation setRefs={setRefs} />
            <PricingInformation setRefs={setRefs} />
            <KeyFeaturesInput
              keyFeatures={keyFeatures}
              setKeyFeatures={setKeyFeatures}
            />
            <SizeColorStockInput
              sizeInput={sizeInput}
              setSizeInput={setSizeInput}
              colorInput={colorInput}
              setColorInput={setColorInput}
              stockInput={stockInput}
              setStockInput={setStockInput}
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full xl:w-[550px] gap-3">
            <UploadImages
              formData={formData}
              handleImageUpload={handleImageUpload}
              handleImageRemove={handleImageRemove}
            />
            <CategorySelector
              selectedCategory={selectedCategoryId.name}
              handleCategoryChange={handleCategoryChange}
              selectedTags={formData.tags}
              handleTagChange={handleTagChange}
              handleRemoveTag={handleRemoveTag}
            />
            <UseForSelector
              useFor={useFor}
              gender={gender}
              ageGroup={ageGroup}
              handleUseForChange={setUseFor}
              handleGenderChange={setGender}
              handleAgeGroupChange={setAgeGroup}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-end py-4">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full md:w-auto">
            <Button className="border-red-500 bg-red-500 hover:bg-red-600 text-white ">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
      {/* {isSuccess && (
        <p className="text-green-500 mt-2">Product created successfully!</p>
      )} */}
    </div>
  );
};

export default CreateProductPage;
