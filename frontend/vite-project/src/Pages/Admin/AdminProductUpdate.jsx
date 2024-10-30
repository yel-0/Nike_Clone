import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useProductById from "../../Hook/Product/useProductById";
import UpdateGeneralInformation from "@/Design/Admin/UpdateGeneralInformation";
import UpdatePricingInformation from "@/Design/Admin/UpdatePricingInformation";
import UpdateKeyFeatureInput from "@/Design/Admin/UpdateKeyFeatureInput";
import UpdateCategorySelector from "@/Design/Admin/UpdateCategorySelector";
import UpdateUseForSelector from "@/Design/Admin/UpdateUseForSelector";
import UpdateUploadImages from "@/Design/Admin/UpdateUploadImages";
import UpdateSizeColorStockInput from "@/Design/Admin/UpdateSizeColorStockInput";
import useUpdateProduct from "@/Hook/Product/useUpdateProduct";

const UpdateProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading: isProductLoading } = useProductById(id);
  const { mutate: updateProduct } = useUpdateProduct();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const basePriceRef = useRef();
  const discountPercentageRef = useRef();
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [useFor, setUseFor] = useState("");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [stockInput, setStockInput] = useState(0);

  useEffect(() => {
    if (product) {
      nameRef.current.value = product.name || "";
      descriptionRef.current.value = product.description || "";
      basePriceRef.current.value = product.price || "";
      discountPercentageRef.current.value = product.discountPercentage || "";
      setKeyFeatures(product.keyFeatures || []);
      setImages(product.imageUrl || []);
      setPreviewUrls(product.imageUrl || []);
      setSelectedCategory(product.category || "");
      setSelectedTags(product.tags || []);
      setUseFor(product.useFor || "");
      setGender(product.gender || "");
      setAgeGroup(product.ageGroup || "");
      setSizeInput(product.sizes ? product.sizes.join(", ") : "");
      setColorInput(product.colors ? product.colors.join(", ") : "");
      setStockInput(product.stock || 0);
    }
  }, [product]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleTagChange = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index) => {
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    const newImages = images.filter((_, i) => i !== index);
    setPreviewUrls(newPreviewUrls);
    setImages(newImages);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("price", basePriceRef.current.value);
    formData.append("discountPercentage", discountPercentageRef.current.value);
    formData.append("category", selectedCategory);
    formData.append("useFor", useFor);
    formData.append("gender", gender);
    formData.append("ageGroup", ageGroup);

    // Append each key feature individually
    keyFeatures.forEach((feature, index) => {
      formData.append(`keyFeatures[${index}]`, feature);
    });

    // Append each tag individually
    selectedTags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    // Append each size individually
    sizeInput.split(",").forEach((size, index) => {
      formData.append(`sizes[${index}]`, size.trim());
    });

    // Append each color individually
    colorInput.split(",").forEach((color, index) => {
      formData.append(`colors[${index}]`, color.trim());
    });

    // Append each image file individually
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Log all form data for debugging

    // Call the updateProduct mutation directly
    updateProduct({ id, formData });
  };

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-full bg-[#fff] rounded-lg p-6">
      <h2 className="text-gray-800 mb-4">Update Product</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div className="flex gap-3 text-sm flex-wrap xl:flex-nowrap flex-row justify-start items-start">
          <div className="flex flex-col w-full gap-3">
            <UpdateGeneralInformation
              nameRef={nameRef}
              descriptionRef={descriptionRef}
            />
            <UpdatePricingInformation
              basePriceRef={basePriceRef}
              discountPercentageRef={discountPercentageRef}
            />
            <UpdateKeyFeatureInput
              keyFeatures={keyFeatures}
              setKeyFeatures={setKeyFeatures}
            />
            <UpdateSizeColorStockInput
              sizeInput={sizeInput}
              setSizeInput={setSizeInput}
              colorInput={colorInput}
              setColorInput={setColorInput}
              stockInput={stockInput}
              setStockInput={setStockInput}
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full xl:w-[550px] gap-3">
            <UpdateUploadImages
              formData={{ previewUrls }}
              handleImageUpload={handleImageUpload}
              handleImageRemove={handleImageRemove}
            />
            <UpdateCategorySelector
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              selectedTags={selectedTags}
              handleTagChange={handleTagChange}
              handleRemoveTag={handleRemoveTag}
            />
            <UpdateUseForSelector
              currentUseFor={useFor}
              currentGender={gender}
              currentAgeGroup={ageGroup}
              handleUseForChange={setUseFor}
              handleGenderChange={setGender}
              handleAgeGroupChange={setAgeGroup}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
