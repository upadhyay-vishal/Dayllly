import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ API se products fetch karna
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        searchQuery: "", // ✅ Search Query Store Karna
        loading: false,
        error: null,
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredProducts = state.products.filter((product) =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        resetSearch: (state) => {
            state.searchQuery = "";  // ✅ Search reset karna
            state.filteredProducts = state.products;
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSearchQuery, resetSearch } = productSlice.actions;
export default productSlice.reducer;
