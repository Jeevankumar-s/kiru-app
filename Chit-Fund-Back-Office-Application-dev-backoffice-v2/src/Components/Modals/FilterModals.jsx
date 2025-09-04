import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  InputAdornment,
  Divider,
  Chip,
  Modal,
  FormGroup,
  Icon,
  Menu,
} from "@mui/material";
import { useCRM } from "../../Context/CRMContext.jsx";
import FilterIcon from "../../assets/filter.svg";
import TickIcon from "../../assets/TickIconCRM.svg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "../../assets/searchIcon.svg";
import CloseIcon from "../../assets/CloseButtonIcon.svg";
import { getAllBranches } from "../API/Api.jsx"; // adjust import path as needed
import {
  FilledButton,
  FormContent,
  FormRow,
  LeadDataInput,
  OutlineButton,
  ModalContainer,
  StyledFilterImage,
  CommonSearchInput,
  StyledCheckbox,
  FilterFilledButton,
  FilterOutlinedButton,
  FilterModalHeading,
  CustomFormControlLabel,
  FilterModalSpecificContainer,
  FilterModalCommonHeading,
  ModalHeader,
  UploadArea,
  UploadButton,
} from "../../StyledElement.jsx";

const ChitGroupFilterModal = ({
  open,
  onClose,
  setFinalSelectedBranches,
  setFilterStatus,
}) => {
  const [branchSearch, setBranchSearch] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [status, setStatus] = useState("");
  const [branchList, setBranchList] = useState([]);

  const fetchingBranch = async () => {
    const response = await getAllBranches();
    setBranchList(response?.data);
  };

  useEffect(() => {
    fetchingBranch();
  }, [open]);

  const toggleBranch = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  const handleClear = () => {
    setSelectedBranches([]);
    setStatus("");
    setBranchSearch("");
    setFinalSelectedBranches([]);
    setFilterStatus("");
    onClose();
  };

  const handleApply = () => {
    setFilterStatus(status);
    setFinalSelectedBranches(selectedBranches);
    onClose();
    // Implement filter logic or pass values to parent component
    // setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FilterModalCommonHeading variant="h6">
              <IconButton size="small">
                <img
                  src={FilterIcon}
                  alt="Filter Icon"
                  height="24px"
                  width="24px"
                />
              </IconButton>
              Filters
            </FilterModalCommonHeading>
            <IconButton onClick={onClose} size="small">
              <img src={CloseIcon} alt="closeIcon" />
            </IconButton>
          </Box>

          <FilterModalSpecificContainer>
            {/* Branch name filter */}
            <FilterModalHeading>Branch name</FilterModalHeading>
            <CommonSearchInput
              placeholder="Search branch"
              variant="outlined"
              size="small"
              fullWidth
              value={branchSearch}
              onChange={(e) => setBranchSearch(e.target.value)}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  "&.Mui-focused fieldset": {
                    borderColor: "#212890",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchIcon} alt="Search-icon" />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                maxHeight: 150,
                overflowY: "auto",
                pr: 1,
                // Hide scrollbar arrows in WebKit browsers (Chrome, Safari, Edge)
                "&::-webkit-scrollbar-button": {
                  display: "none",
                  height: 0,
                },
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#aaa",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <FormGroup>
                {branchList?.length > 0 &&
                  branchList
                    .filter((b) =>
                      b.name.toLowerCase().includes(branchSearch.toLowerCase())
                    )
                    .map((branch) => (
                      <CustomFormControlLabel
                        key={branch.id}
                        control={
                          <StyledCheckbox
                            checked={selectedBranches.includes(branch.id)}
                            onChange={() =>
                              toggleBranch(
                                branch.id,
                                selectedBranches,
                                setSelectedBranches
                              )
                            }
                          />
                        }
                        label={branch.name}
                      />
                    ))}
              </FormGroup>
            </Box>
          </FilterModalSpecificContainer>

          <FilterModalSpecificContainer>
            {/* Prized section */}
            <FilterModalHeading>Status</FilterModalHeading>
            <FormGroup>
              <CustomFormControlLabel
                control={
                  <StyledCheckbox
                    checked={status === "Active"}
                    onChange={() =>
                      setStatus(status === "Active" ? "" : "Active")
                    }
                  />
                }
                label="Active"
              />
              <CustomFormControlLabel
                control={
                  <StyledCheckbox
                    checked={status === "Terminated"}
                    onChange={() =>
                      setStatus(status === "Terminated" ? "" : "Terminated")
                    }
                  />
                }
                label="Terminated"
              />
              <CustomFormControlLabel
                control={
                  <StyledCheckbox
                    checked={status === "Vacant"}
                    onChange={() =>
                      setStatus(status === "Vacant" ? "" : "Vacant")
                    }
                  />
                }
                label="Vacant"
              />
            </FormGroup>
          </FilterModalSpecificContainer>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <FilterOutlinedButton variant="outlined" onClick={handleClear}>
              Clear
            </FilterOutlinedButton>
            <FilterFilledButton variant="contained" onClick={handleApply}>
              Apply
            </FilterFilledButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const MemberFilterModal = ({
  open,
  onClose,
  setOpenFilterModal,
  setFinalPrized,
  setFinalSelectedBranches,
}) => {
  const [branchSearch, setBranchSearch] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [prized, setPrized] = useState("");

  // const branches = [
  //   "Chennai",
  //   "Bangalore",
  //   "Hyderabad",
  //   "Coimbatore",
  //   "Trichy",
  //   "Vellore",
  // ];

  // const toggleBranch = (branch) => {
  //   setSelectedBranches((prev) =>
  //     prev.includes(branch)
  //       ? prev.filter((b) => b !== branch)
  //       : [...prev, branch]
  //   );
  // };

  const handleClear = () => {
    setSelectedBranches([]);
    setPrized("");
    setBranchSearch("");
    setFinalPrized(null);
    setFinalSelectedBranches([]);
    onClose();
  };

  const handleApply = () => {
    setFinalPrized(prized);
    setFinalSelectedBranches(selectedBranches);
    onClose();
    // Implement filter logic or pass values to parent component
    // setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FilterModalCommonHeading variant="h6">
              <IconButton size="small">
                <img
                  src={FilterIcon}
                  alt="Filter Icon"
                  height="24px"
                  width="24px"
                />
              </IconButton>
              Filters
            </FilterModalCommonHeading>
            <IconButton onClick={onClose} size="small">
              <img src={CloseIcon} alt="closeIcon" />
            </IconButton>
          </Box>

          {/* <FilterModalSpecificContainer>
              <FilterModalHeading>Branch name</FilterModalHeading>
              <CommonSearchInput
                placeholder="Search branch"
                variant="outlined"
                size="small"
                fullWidth
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#212890",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={SearchIcon} alt="Search-icon" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  maxHeight: 150,
                  overflowY: "auto",
                  pr: 1,
                  // Hide scrollbar arrows in WebKit browsers (Chrome, Safari, Edge)
                  "&::-webkit-scrollbar-button": {
                    display: "none",
                    height: 0,
                  },
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#aaa",
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <FormGroup>
                  {branches
                    .filter((b) =>
                      b.toLowerCase().includes(branchSearch.toLowerCase())
                    )
                    .map((branch) => (
                      <CustomFormControlLabel
                        key={branch}
                        control={
                          <StyledCheckbox
                            checked={selectedBranches.includes(branch)}
                            onChange={() => toggleBranch(branch)}
                          />
                        }
                        label={branch}
                      />
                    ))}
                </FormGroup>
              </Box>
            </FilterModalSpecificContainer> */}

          <FilterModalSpecificContainer>
            {/* Prized section */}
            <FilterModalHeading>Prized</FilterModalHeading>
            <FormGroup>
              <CustomFormControlLabel
                control={
                  <StyledCheckbox
                    checked={prized === true}
                    onChange={() => setPrized(prized === true ? "" : true)}
                  />
                }
                label="Yes"
              />
              <CustomFormControlLabel
                control={
                  <StyledCheckbox
                    checked={prized === false}
                    onChange={() => setPrized(prized === false ? "" : false)}
                  />
                }
                label="No"
              />
            </FormGroup>
          </FilterModalSpecificContainer>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <FilterOutlinedButton variant="outlined" onClick={handleClear}>
              Clear
            </FilterOutlinedButton>
            <FilterFilledButton variant="contained" onClick={handleApply}>
              Apply
            </FilterFilledButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export { ChitGroupFilterModal, MemberFilterModal };
