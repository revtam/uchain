import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#005CCC",
                    contrastText: "#FFF",
                },
                primaryLight: {
                    main: "#FFF",
                    darkContrastText: "#000",
                    lightContrastText: "3B3B3B",
                },
                secondary: {
                    main: "#E97E00",
                    light: "#9B9B9B",
                    contrastText: "#FFF",
                },
            },
        },
    },
});

export default theme;

declare module "@mui/material/styles" {
    interface Palette {
        primaryLight: Palette["primary"];
    }
    interface PaletteOptions {
        primaryLight: PaletteOptions["primary"];
    }
    interface PaletteColor {
        darkContrastText?: string;
        lightContrastText?: string;
    }
    interface SimplePaletteColorOptions {
        darkContrastText?: string;
        lightContrastText?: string;
    }
}
