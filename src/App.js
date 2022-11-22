import { Route, Routes } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Login from "./auth/Login";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import FileImport from "./admin/FileImport";
import ShowProfile from "./auth/ShowProfile";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f48fb1",
      light: "#f6a5c0",
      dark: "#aa647b",
      contrastText: "rgba(0,0,0,0.8)",
    },
    secondary: {
      main: "#880e4f",
      light: "#9f3e72",
      dark: "#5f0937",
      contrastText: "#ffffff",
    },
    background: {
      default: "#303030",
      paper: "#373737",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255,255,255,0.5)",
      hint: "rgba(255, 255, 255, 0.7)",
    },
    divider: "rgba(0,0,0,0.12)",
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ShowProfile />
            </PrivateRoute>
          }
        />
        <Route path="/import" element={<FileImport />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
