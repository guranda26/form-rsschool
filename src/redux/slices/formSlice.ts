import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  termsAccepted?: boolean;
  picture?: string;
  country?: string;
}

type FormFieldValue = string | number | boolean;

const initialState: FormState = {};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof FormState;
        value: FormFieldValue | undefined;
      }>
    ) => {
      const { field, value } = action.payload;
      if (value !== undefined) {
        switch (field) {
          case "name":
          case "email":
          case "password":
          case "confirmPassword":
          case "gender":
          case "picture":
          case "country":
            if (typeof value === "string") {
              state[field] = value;
            }
            break;
          case "age":
            if (typeof value === "number") {
              state[field] = value;
            }
            break;
          case "termsAccepted":
            if (typeof value === "boolean") {
              state[field] = value;
            }
            break;
          default:
            break;
        }
      }
    },
    resetForm: () => initialState,
  },
});

export const { setUncontrolledFormData, updateField, resetForm } =
  formSlice.actions;
export default formSlice.reducer;
