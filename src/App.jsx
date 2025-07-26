import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
} from "lucide-react";

// --- MOCK API DATA (Used as a fallback) ---
const mockApiData = [
  {
    product_id: 1001,
    product_name: "1HP Induction Motor",
    category: "Electrical Motors",
    price: 4200,
    status: "Active",
  },
  {
    product_id: 1002,
    product_name: "25mm Ball Valve - Brass",
    category: "Plumbing Hardware",
    price: 185,
    status: "Active",
  },
  {
    product_id: 1003,
    product_name: "M12 High-Tensile Bolt (50 pcs)",
    category: "Fasteners",
    price: 460,
    status: "Active",
  },
  {
    product_id: 1004,
    product_name: '4" Cutting Wheel (Metal)',
    category: "Abrasives",
    price: 22,
    status: "Active",
  },
  {
    product_id: 1005,
    product_name: "Mild Steel L-Angle (3m)",
    category: "Structural Material",
    price: 780,
    status: "Inactive",
  },
  {
    product_id: 1006,
    product_name: "Heavy-Duty Caster Wheel (4 pcs)",
    category: "Material Handling",
    price: 1250,
    status: "Active",
  },
  {
    product_id: 1007,
    product_name: "63A 4-Pole MCB - Schneider",
    category: "Electrical Components",
    price: 1950,
    status: "Active",
  },
  {
    product_id: 1008,
    product_name: "Industrial Safety Helmet - Yellow",
    category: "Safety Gear",
    price: 160,
    status: "Active",
  },
  {
    product_id: 1009,
    product_name: 'HDPE Pipe - 2" x 30m',
    category: "Plumbing Hardware",
    price: 2150,
    status: "Inactive",
  },
  {
    product_id: 1010,
    product_name: "Electric Angle Grinder 750W",
    category: "Power Tools",
    price: 2999,
    status: "Active",
  },
];

// Helper function to format currency in INR
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Child Component: Status Pill for colored status labels
const StatusPill = ({ status }) => {
  const isActive = status === "Active";
  const stockStatus = isActive ? "Active" : "Inactive";
  const bgColor = isActive ? "bg-red-100" : "bg-orange-100";
  const textColor = isActive ? "text-red-800" : "text-orange-800";
  const dotColor = isActive ? "bg-red-500" : "bg-orange-500";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}
    >
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`}></span>
      {stockStatus}
    </span>
  );
};

// Child Component: A reusable dropdown for filters
const FilterDropdown = ({ label, options, value, onChange, icon }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-red-500 transition-colors">
      {icon}
    </div>
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full bg-transparent border border-gray-300 rounded-lg py-2 pl-10 pr-8 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 ease-in-out hover:border-gray-400"
    >
      <option value="all">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <ChevronDown size={16} />
    </div>
  </div>
);

// Child Component: Search input filter
const SearchInput = ({ value, onChange }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
      <Search size={16} />
    </div>
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 ease-in-out hover:border-gray-400"
    />
  </div>
);

// Child Component: A toggle switch for the stock filter
const StockToggle = ({ checked, onChange }) => (
  <label
    htmlFor="stock-toggle"
    className="flex items-center cursor-pointer select-none text-gray-700"
  >
    <span className="mr-3 font-medium text-sm">Active Only</span>
    <div className="relative">
      <input
        id="stock-toggle"
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`block w-12 h-7 rounded-full transition-colors ${
          checked ? "bg-red-500" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform ${
          checked ? "transform translate-x-5" : ""
        }`}
      ></div>
    </div>
  </label>
);

// Child Component: Clickable table header for sorting
const SortableHeader = ({ children, columnKey, sortConfig, onSort }) => {
  const isSorting = sortConfig.key === columnKey;
  const directionIcon = isSorting ? (
    sortConfig.direction === "ascending" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    )
  ) : (
    <ArrowUpDown size={16} className="text-gray-400" />
  );

  return (
    <th
      scope="col"
      className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100/50 transition-colors"
      onClick={() => onSort(columnKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {directionIcon}
      </div>
    </th>
  );
};

// Main Component: The entire product table application
const ProductTable = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "all",
    price: "all",
    isActive: false,
  });

  const [sortConfig, setSortConfig] = useState({
    key: "product_name",
    direction: "ascending",
  });

  // --- API DATA FETCHING with MOCK DATA FALLBACK ---
  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const response = await fetch("https://api.udhhyog.com/v1/test");
        if (!response.ok)
          throw new Error(`API call failed with status: ${response.status}`);
        const apiData = await response.json();
        const productsData =
          apiData.data && apiData.data[0]?.product_id ? apiData.data : apiData;
        setProducts(productsData);
        setStatus("succeeded");
        console.log("Successfully fetched data from the live API.");
      } catch (error) {
        console.warn(
          "Live API fetch failed:",
          error.message,
          ". Falling back to local mock data."
        );
        setProducts(mockApiData);
        setStatus("succeeded");
      }
    };
    fetchProducts();
  }, []);

  // --- FILTERING AND SORTING LOGIC ---
  const filteredAndSortedProducts = useMemo(() => {
    let processableProducts = [...products];

    // Apply filters
    processableProducts = processableProducts.filter((product) => {
      if (
        filters.searchQuery &&
        !product.product_name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      )
        return false;
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (filters.price !== "all") {
        const [min, max] = filters.price.split("-").map(Number);
        if (product.price < min || (max && product.price > max)) return false;
      }
      if (filters.isActive && product.status !== "Active") return false;
      return true;
    });

    // Apply sorting
    if (sortConfig.key !== null) {
      processableProducts.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return processableProducts;
  }, [products, filters, sortConfig]);

  // --- EVENT HANDLERS ---
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending")
      direction = "descending";
    setSortConfig({ key, direction });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = filteredAndSortedProducts.map((p) => p.product_id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  // --- RENDER LOGIC ---
  const categoryOptions = useMemo(
    () =>
      [...new Set(products.map((p) => p.category))].map((c) => ({
        value: c,
        label: c,
      })),
    [products]
  );

  const priceOptions = [
    { value: "0-500", label: "₹0 - ₹500" },
    { value: "501-1500", label: "₹501 - ₹1500" },
    { value: "1501-3000", label: "₹1501 - ₹3000" },
    { value: "3001", label: "Over ₹3000" },
  ];

  const isAllSelected =
    selectedProducts.length > 0 &&
    selectedProducts.length === filteredAndSortedProducts.length;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-red-100/60 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Industrial Supplies
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Your one-stop product directory.
          </p>
        </header>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 transition-shadow duration-300 hover:shadow-2xl">
          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center mb-6 pb-6 border-b border-gray-200/80">
            <FilterDropdown
              label="Category"
              options={categoryOptions}
              value={filters.category}
              onChange={(value) => handleFilterChange("category", value)}
              icon={<SlidersHorizontal size={16} />}
            />
            <FilterDropdown
              label="Price Range"
              options={priceOptions}
              value={filters.price}
              onChange={(value) => handleFilterChange("price", value)}
              icon={<Tag size={16} />}
            />
            <SearchInput
              value={filters.searchQuery}
              onChange={(value) => handleFilterChange("searchQuery", value)}
            />
            <div className="flex items-center justify-start sm:justify-center">
              <StockToggle
                checked={filters.isActive}
                onChange={(value) => handleFilterChange("isActive", value)}
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/80">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all products"
                    />
                  </th>
                  <SortableHeader
                    columnKey="product_name"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  >
                    Product Name
                  </SortableHeader>
                  <SortableHeader
                    columnKey="category"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  >
                    Category
                  </SortableHeader>
                  <SortableHeader
                    columnKey="price"
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  >
                    Price
                  </SortableHeader>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/80">
                {status === "loading" && (
                  <tr>
                    <td colSpan="5" className="text-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                      <p className="mt-4 text-gray-500 font-medium">
                        Fetching Latest Products...
                      </p>
                    </td>
                  </tr>
                )}
                {status === "failed" && (
                  <tr>
                    <td colSpan="5" className="text-center py-20">
                      <p className="text-red-500 font-semibold">
                        Could not load any product data.
                      </p>
                    </td>
                  </tr>
                )}
                {status === "succeeded" &&
                  filteredAndSortedProducts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        <p className="text-gray-500 font-semibold text-lg">
                          No products match the current filters.
                        </p>
                      </td>
                    </tr>
                  )}
                {status === "succeeded" &&
                  filteredAndSortedProducts.map((product) => {
                    const isSelected = selectedProducts.includes(
                      product.product_id
                    );
                    return (
                      <tr
                        key={product.product_id}
                        className={`transition-all duration-200 ease-in-out relative ${
                          isSelected ? "bg-red-100" : "hover:bg-red-50/70"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            checked={isSelected}
                            onChange={() =>
                              handleSelectProduct(product.product_id)
                            }
                            aria-label={`Select ${product.product_name}`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {product.product_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {product.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-800 font-bold">
                            {formatCurrency(product.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusPill status={product.status} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
