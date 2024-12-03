import { createSlice } from "@reduxjs/toolkit";

// Get the initial theme from localStorage or default to "light"
const initialTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    setLightTheme: (state) => "light",
    setDarkTheme: (state) => "dark",
    toggleTheme: (state) => (state === "light" ? "dark" : "light"),
  },
});

export const { setLightTheme, setDarkTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;