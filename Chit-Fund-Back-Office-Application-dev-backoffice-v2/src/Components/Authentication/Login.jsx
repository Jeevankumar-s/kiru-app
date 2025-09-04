import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/userContext.jsx";
import {
  Container,
  Box,
  Select,
  Typography,
  MenuItem,
  FormControl,
  Link,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import Banner from "../../assets/leftImageAuth.png";
import {
  AuthenticationFormContainer,
  AuthSubmitButton,
  AuthTextField,
  AuthTextFieldLabel,
  AuthHeading,
  AuthStyledSelect,
  RoundedOutlinedInput,
  StyledSelect,
  StyledPopper,
} from "../../StyledElement";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAllBranches } from "../API/Api.jsx";
import axiosInstance from "../ApiAxiosInstance";
// import { useRetail } from "../Context/RetailContext";
import { useCRM } from "../../Context/CRMContext.jsx";

axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const { showToast, showErrorToast } = useCRM();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const { showToast, showErrorToast } = useRetail();

  useEffect(() => {
    const token = localStorage.getItem("BackOfficeToken");
    if (token && token !== "undefined") {
      navigate("/chitgroup");
    }
  }, [navigate]);

  const fetchingBranch = async () => {
    const response = await getAllBranches();
    const sortedBranches = response.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setBranchList(sortedBranches);
  };

  useEffect(() => {
    fetchingBranch();
  }, [open]);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/back-office/login`, {
        branch: selectedBranch,
        employeeId: email,
        password,
      });

      if (response.data.statusCode === 200) {
        localStorage.setItem(
          "BackOfficeToken",
          response.data.data.sessionToken
        );
        setOtpMessage(response.message);
        showToast(response.data.message);
        // await fetchUserData();
        updateUser(response.data.data.user);
        navigate("/chitgroup");
      }
      // else {
      //   setOtpErrorMessage(response.data.message || "Invalid");
      // }
    } catch (error) {
      showErrorToast(error.response.data.message);
      setOtpErrorMessage(error.response?.data.message || "Error verifying OTP");
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("BackOfficeToken");

    try {
      const response = await axiosInstance.get(`${apiUrl}/auth/status`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200 && response.data) {
        // updateUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Update password state
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
    return;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <img
        src={Banner}
        alt="Banner"
        style={{
          height: "100vh",
          width: "40vw",
          // objectFit: "cover",
        }}
      />

      <AuthenticationFormContainer>
        <Container
          // maxWidth="xs"
          sx={{
            width: "400px",
            // textAlign: "center",
            backgroundColor: "#ffffff",
            p: 4,
            pb: "15px",
            pl: "80px",
            pr: "80px",
            pt: "10px",
            borderRadius: 2,
            // boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
            // border: "1px solid #E7E7E7",
          }}
        >
          <AuthHeading>Welcome Back !</AuthHeading>
          <Typography
            sx={{
              mb: 2,
              color: "#474747",
              fontSize: "24px",
              fontWeight: "500",
              lineHeight: "29.76px",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Login now to continue your journey{" "}
          </Typography>

          {/* <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              // mb: 3,
              color: "#000000",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "29.76px",
              whiteSpace: "nowrap",
            }}
          >
            Log in now to continue your journey
          </Typography> */}

          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            {/* Conditionally render OTP inputs and password fields */}
            <>
              {/* <AuthTextField
                select
                fullWidth
                label="Select Branch"
                value={selectedBranch}
                sx={{
                  "& label.Mui-focused": {
                    color: "#212890",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#212890",
                    },
                }}
                onChange={(e) => setSelectedBranch(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span>Select Branch</span>;
                  }
                  const selectedBranchObj = branchList.find(
                    (b) => b.id === selected
                  );
                  return selectedBranchObj?.name || selected;
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 250,
                        minWidth: 360,
                      },
                    },
                  },
                }}
              >
                <MenuItem disabled value="">
                  Select Branch
                </MenuItem>
                {branchList.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </AuthTextField> */}

              <Autocomplete
                fullWidth
                options={branchList}
                getOptionLabel={(option) => option.name || ""}
                value={branchList.find((b) => b.id === selectedBranch) || null}
                onChange={(e, newValue) => {
                  setSelectedBranch(newValue?.id || "");
                }}
                noOptionsText="No Branches"
                PopperComponent={StyledPopper}
                renderInput={(params) => (
                  <AuthTextField
                    {...params}
                    label="Select Branch"
                    variant="outlined"
                    placeholder="Search Branch"
                    sx={{
                      "& label.Mui-focused": {
                        color: "#212890",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#212890",
                        },
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />

              <AuthTextField
                fullWidth
                color="#C7C0D0"
                placeholder="Enter Employee ID"
                variant="outlined"
                // margin="normal"
                value={email}
                onChange={handleEmailChange}
              />

              <AuthTextField
                // label="Password"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                        sx={{
                          border: "none", // Ensures no border
                          "&:focus": { outline: "none" }, // Removes focus outline
                          "&:focus-visible": { outline: "none" }, // Ensures no focus outline for accessibility
                          "&:hover": { backgroundColor: "transparent" }, // Removes hover effect
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {otpMessage && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" color="#00BF3C" sx={{ mb: 1 }}>
                    {otpMessage}
                  </Typography>
                </Box>
              )}

              {otpErrorMessage && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" color="red">
                    {otpErrorMessage}
                  </Typography>
                </Box>
              )}

              <AuthSubmitButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit{" "}
              </AuthSubmitButton>
            </>
          </Box>
        </Container>
      </AuthenticationFormContainer>
    </Box>
  );
}

export default Login;
