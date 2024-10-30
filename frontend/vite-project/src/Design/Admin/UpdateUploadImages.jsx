// src/components/UpdateUploadImages.js
import React from "react";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

const UpdateUploadImages = ({
  formData,
  handleImageUpload,
  handleImageRemove,
}) => {
  return (
    <div className="grid w-full p-5 rounded-lg bg-white border border-gray-300 shadow-sm max-w-sm items-center gap-1.5">
      <Label htmlFor="updatePicture">Update Images</Label>

      <input
        id="updatePicture"
        type="file"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="mt-2">
        {formData.previewUrls.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {/* Main image */}
            <div className="w-full relative">
              <img
                src={formData.previewUrls[0]}
                alt="Main preview"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(0)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Additional images */}
            <div className="grid grid-cols-4 gap-4 w-full">
              {formData.previewUrls.slice(1).map((img, index) => (
                <div key={index + 1} className="relative">
                  <img
                    src={img}
                    alt={`Updated preview ${index + 2}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index + 1)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex justify-start items-center mt-4">
          <button
            type="button"
            onClick={() => document.getElementById("updatePicture").click()}
            className="flex items-center justify-center border-dotted text-black w-full p-4 rounded-lg border-2 border-gray-400 hover:bg-gray-100 transition-colors duration-200"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUploadImages;
