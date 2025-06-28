import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light", // Set light mode
        primary: {
            main: "#DC2A54" // Your chosen main color
        },
        secondary: {
            main: "#000000" // Optional: same as primary for uniform branding
        },
        background: {
            default: "#ffffff", // Light background
            paper: "#f5f5f5"    // Slightly darker for cards, dialogs, etc.
        },
        text: {
            main: "#111111",
             // Lighter white-ish for secondary text
        }
    },
    typography: {
        fontFamily: `"Montserrat", sans-serif`
    }
    
});
