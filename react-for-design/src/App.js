import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn,
  Spa,
  Brush,
  ContentCut,
  Star,
  NavigateNext,
} from "@mui/icons-material";

// Create a theme instance with luxury beauty-focused colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#DBA858", // Luxurious gold
      light: "#F4D03F",
      dark: "#B7935F",
    },
    secondary: {
      main: "#E8C5C5", // Soft pink
      light: "#F5E6E6",
      dark: "#D4A5A5",
    },
    background: {
      default: "#FAF7F2", // Warm beige
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C1810", // Rich brown
      secondary: "#65483D",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#FFFFFF",
          "&:hover": {
            boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(219, 168, 88, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          "&:hover": {
            boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.1)",
          },
        },
      },
    },
  },
});

// Popular services data
const popularServices = [
  { icon: <Spa />, name: "Facial", price: "From $49" },
  { icon: <Brush />, name: "Makeup", price: "From $79" },
  { icon: <ContentCut />, name: "Hair", price: "From $39" },
];

// Top rated artists data
const topArtists = [
  {
    name: "Sarah M.",
    rating: 4.9,
    reviews: 127,
    specialty: "Makeup Artist",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Emma K.",
    rating: 4.8,
    reviews: 98,
    specialty: "Hair Stylist",
    image: "https://i.pravatar.cc/150?img=2",
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ pb: 8 }}>
        {/* Header Section */}
        <Box sx={{ pt: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Hey Nadya 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Book your beauty service for today
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            mb: 3,
          }}
        >
          <IconButton sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for services or artists"
          />
          <IconButton sx={{ p: "10px" }}>
            <LocationOn />
          </IconButton>
        </Paper>

        {/* Popular Services Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Popular Services
          </Typography>
          <Grid container spacing={2}>
            {popularServices.map((service, index) => (
              <Grid item xs={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    border: "1px solid rgba(219, 168, 88, 0.2)",
                    background:
                      "linear-gradient(135deg, #FFFFFF 0%, #FAF7F2 100%)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      cursor: "pointer",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 1 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {service.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {service.price}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Booking Section */}
        <Box
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #DBA858 0%, #E8C5C5 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              opacity: 0.1,
            },
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Quick Booking
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Get a beauty artist at your doorstep in 60 minutes
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Book Now
          </Button>
        </Box>

        {/* Top Rated Artists Section */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Top Rated Artists
            </Typography>
            <Button endIcon={<NavigateNext />} sx={{ color: "text.secondary" }}>
              See All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {topArtists.map((artist, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid rgba(219, 168, 88, 0.2)",
                    background:
                      "linear-gradient(135deg, #FFFFFF 0%, #FAF7F2 100%)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      cursor: "pointer",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={artist.image}
                        sx={{ width: 60, height: 60, mb: 1 }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {artist.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {artist.specialty}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Rating
                          value={artist.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography variant="caption" color="text.secondary">
                          ({artist.reviews})
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
