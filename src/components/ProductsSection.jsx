import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { getAllProducts } from "../DAL/Fetch.js";
import {
  Stack,
  Pagination,
  PaginationItem,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const ProductsSection = ({onDataLoaded }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts(page, rowsPerPage);
        

        setProducts(res?.products.sort(() => Math.random() - 0.5) || []);
        setTotalItems(res?.total || 0); // ✅ use res.total
        setTotalPages(res?.totalPages || 1);
        onDataLoaded?.();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  // ✅ Pagination handlers
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // ✅ Calculate start and end range for display
  const start = products.length > 0 ? (page - 1) * rowsPerPage + 1 : 0;
  const end = Math.min(page * rowsPerPage, totalItems);

  return (
    <div className="w-[84%] m-auto  px-4 mb-16" >
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-10 text-left">
        Featured Art Works
      </h1>

      {/* Grid layout for cards */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item._id} data={item} />)
        ) : (
          <p className="text-gray-500 col-span-full">No artworks available.</p>
        )}
      </div>

      {/* Pagination Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 3, width: "90%", margin: "40px auto" }}
      >
        {/* Left: Showing range */}
        <Typography variant="body2" color="text.secondary">
          {totalItems > 0
            ? `Showing ${start}-${end} of ${totalItems} artworks`
            : "No artworks available"}
        </Typography>

        {/* Middle: Pagination */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          siblingCount={1}
          boundaryCount={0}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              slots={{
                first: BiFirstPage,
                previous: MdChevronLeft,
                next: MdChevronRight,
                last: BiLastPage,
              }}
              {...item}
            />
          )}
          sx={{
            "& .MuiPaginationItem-root": { borderRadius: "6px" },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#0DBB56",
              color: "#fff",
            },
            "& .MuiPaginationItem-root.MuiPaginationItem-previousNext, & .MuiPaginationItem-root.MuiPaginationItem-firstLast":
              {
                backgroundColor: "#0DBB56",
                color: "#fff",
                "&:hover": { backgroundColor: "#d84315" },
              },
          }}
        />

        {/* Right: Items per page */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Select
            size="small"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 60 }}
          >
            {[8, 16, 20, 40].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2" color="text.secondary">
            Items per page
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductsSection;
