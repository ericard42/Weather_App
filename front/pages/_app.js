import '../styles/globals.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
