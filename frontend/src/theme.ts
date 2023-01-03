import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3f50b5",
        },
        secondary: {
            main: "#f44336",
        },
    },
});

declare module "@mui/material/styles" {
    // interface Theme {
    //   status: {
    //     danger: React.CSSProperties['color'];
    //   };
    // }
    // interface Palette {
    //   neutral: Palette['primary'];
    // }
    // interface Palette {
    //   neutral: Palette['primary'];
    // }
    // interface PaletteOptions {
    //   neutral: PaletteOptions['primary'];
    // }
    // interface PaletteColor {
    //   darker?: string;
    // }
    // interface SimplePaletteColorOptions {
    //   darker?: string;
    // }
    // interface ThemeOptions {
    //   status: {
    //     danger: React.CSSProperties['color'];
    //   };
    // }
}

export default theme;
