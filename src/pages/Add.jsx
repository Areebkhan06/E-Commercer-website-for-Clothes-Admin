import React, { useState } from "react";
import { Upload, Plus } from "lucide-react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [bestseller, setbestseller] = useState(false);
  const [size, setsize] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(size));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const resp = await axios.post(backendURL + "/api/product/add", formData, {
        headers: { token },
      });

      if (resp.data.success) {
        toast.success(resp.data.message);
        setname("");
        setdescription("");
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setprice("");
        setsize([])
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  p-2 sm:p-4 lg:p-6">
      <form onSubmit={onSubmitHandler} className=" max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Add New Product
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill in the details below to add a new product to your store
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Upload Images */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Product Images
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Upload up to 4 high-quality images
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[image1, image2, image3, image4].map((img, idx) => (
                  <label
                    key={idx}
                    htmlFor={`image${idx + 1}`}
                    className="group cursor-pointer border-2 border-dashed border-gray-300 bg-white rounded-lg sm:rounded-xl overflow-hidden hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 aspect-square flex items-center justify-center relative"
                  >
                    {!img ? (
                      <div className="text-center p-2">
                        <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-1 sm:mb-2 group-hover:text-blue-500 transition-colors" />
                        <p className="text-xs text-gray-500 group-hover:text-blue-600">
                          Add Image
                        </p>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <input
                      onChange={(e) =>
                        [setimage1, setimage2, setimage3, setimage4][idx](
                          e.target.files[0]
                        )
                      }
                      type="file"
                      id={`image${idx + 1}`}
                      hidden
                      accept="image/*"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Product Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Product Name
                </label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter product name"
                  required
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-800 text-sm sm:text-base"
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Product Description
                </label>
                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  placeholder="Describe your product in detail..."
                  required
                  rows={4}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-800 text-sm sm:text-base"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Category
                </label>
                <select
                  onChange={(e) => setcategory(e.target.value)}
                  value={category}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-800 bg-white text-sm sm:text-base"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Subcategory
                </label>
                <select
                  onChange={(e) => setsubCategory(e.target.value)}
                  value={subCategory}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-800 bg-white text-sm sm:text-base"
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>

              {/* Price */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Price (₹)
                </label>
                <input
                  onChange={(e) => setprice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="Enter price"
                  min="0"
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-800 text-sm sm:text-base"
                />
              </div>

              {/* Sizes */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setsize((prev) =>
                          prev.includes(s)
                            ? prev.filter((item) => item !== s)
                            : [...prev, s]
                        )
                      }
                      className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 text-sm font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        size.includes(s)
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50 shadow-sm"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bestseller */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl border border-amber-200">
                  <input
                    type="checkbox"
                    id="bestseller"
                    checked={bestseller}
                    onChange={() => setbestseller((prev) => !prev)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 focus:ring-amber-500 accent-amber-600 rounded flex-shrink-0"
                  />
                  <label
                    htmlFor="bestseller"
                    className="text-sm font-semibold text-amber-800 cursor-pointer"
                  >
                    ⭐ Mark as Bestseller
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;

// 8:57
