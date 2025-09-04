import React from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LeadDataInput, InputLabelLead } from "../../StyledElement.jsx";
import CalenderIcon from "../../assets/calender.svg";
import { LuIndianRupee } from "react-icons/lu";

const CustomDatePicker = ({
  value,
  onChange,
  label,
  //   placeholder = "Select date",
  slotProps = {},
  datePickerProps = {},
  ...restProps
}) => {
  const defaultSlotProps = {
    textField: {
      fullWidth: true,
      size: "small",
      //   placeholder,
      ...slotProps.textField,
    },
  };

  const handleDateChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      {label && <InputLabelLead>{label}</InputLabelLead>}
      <DatePicker
        value={value}
        onChange={handleDateChange}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          openPickerIcon: () => (
            <img
              src={CalenderIcon}
              alt="CalendarIcon"
              style={{
                width: 20,
                height: 20,
                cursor: "pointer",
              }}
            />
          ),
          textField: LeadDataInput,
        }}
        slotProps={defaultSlotProps}
        {...datePickerProps}
        {...restProps}
      />
    </>
  );
};

const RupeeInput = ({ ...props }) => {
  return (
    <LeadDataInput
      {...props}
      InputProps={{
        startAdornment: (
          <LuIndianRupee
            style={{
              marginRight: 4,
              fontSize: "16px",
              color: "#555",
            }}
          />
        ),
        ...props.InputProps, // so you can override if needed
      }}
    />
  );
};

export { CustomDatePicker, RupeeInput };
