import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Input } from "./ui/input";
import { FormFeildType } from "./forms/PatientForm";
import Image from "next/image";
import { E164Number } from "libphonenumber-js/core";
interface Customprops {
  control: Control<any>;
  feildType: FormFeildType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (feild: any) => React.ReactNode;
}

const RenderFeild = ({ field, props }: { field: any; props: Customprops }) => {
  const { feildType, placeholder, iconAlt, iconSrc } = props;

  switch (feildType) {
    case FormFeildType.INPUT:
      return (
        <div className="flex rounded-md  border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="shad-input border-0 w-full"
            />
          </FormControl>
        </div>
      );
      break;
    case FormFeildType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            international
            withCountryCallingCode
            className="input-phone w-full"
          />
        </FormControl>
      );
    case FormFeildType.DATE_PICKER:
      return (
        <div className="flex rounded-md  border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            
          </FormControl>
        </div>
      );
    default:
      break;
  }
};
const CustomFeild = (props: Customprops) => {
  const { control, feildType, label, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {feildType !== FormFeildType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderFeild field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFeild;
