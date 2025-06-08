import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
  useFieldArray,
  Control,
} from "react-hook-form";
import { Edit, X, Plus } from "lucide-react";
import { registerPlugin } from "filepond";
import { FilePond } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FormFieldProps {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "select"
    | "switch"
    | "password"
    | "file"
    | "multi-input";
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string;
  disabled?: boolean;
  multiple?: boolean;
  isIcon?: boolean;
  initialValue?: string | number | boolean | string[];
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  options,
  // accept,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  // multiple = false,
  isIcon = false,
  initialValue,
}) => {
  const { control } = useFormContext();

  const renderFormControl = (field: ControllerRenderProps<FieldValues, string>) => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            {...field}
            className={`border-gray-200 p-4 ${inputClassName}`}
            rows={3}
          />
        );
      case "select":
        return (
          <Select
            defaultValue={field.value || (initialValue as string)}
            value={field.value || (initialValue as string)}
            onValueChange={field.onChange}
          >
            <SelectTrigger className={`w-full border-gray-200 p-4 ${inputClassName}`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full border-gray-200 shadow">
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  className={`cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey`}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              className={`text-customgreys-dirtyGrey ${inputClassName}`}
              id={name}
              onCheckedChange={field.onChange}
            />
            <FormLabel className={labelClassName} htmlFor={name}>
              {label}
            </FormLabel>
          </div>
        );
      case "file":
        return (
          <FilePond
            allowMultiple={true}
            className={`${inputClassName}`}
            credits={false}
            labelIdle={`Drag & Drop your images or <span class="filepond--label-action">Browse</span>`}
            onupdatefiles={(fileItems) => {
              const files = fileItems.map((fileItem) => fileItem.file);

              field.onChange(files);
            }}
          />
        );
      case "number":
        return (
          <Input
            placeholder={placeholder}
            type="number"
            {...field}
            className={`border-gray-200 p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
      case "multi-input":
        return (
          <MultiInputField
            control={control}
            inputClassName={inputClassName}
            name={name}
            placeholder={placeholder}
          />
        );
      default:
        return (
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            className={`border-gray-200 p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      defaultValue={initialValue}
      name={name}
      render={({ field }) => (
        <FormItem className={`${type !== "switch" && "rounded-md"} relative ${className}`}>
          {type !== "switch" && (
            <div className="flex justify-between items-center">
              <FormLabel className={`text-sm ${labelClassName}`}>{label}</FormLabel>

              {!disabled && isIcon && type !== "file" && type !== "multi-input" && (
                <Edit className="size-4 text-customgreys-dirtyGrey" />
              )}
            </div>
          )}
          <FormControl>
            {renderFormControl({
              ...field,
              value: field.value !== undefined ? field.value : initialValue,
            })}
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};
interface MultiInputFieldProps {
  name: string;
  control: Control<FieldValues>;
  placeholder?: string;
  inputClassName?: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  control,
  placeholder,
  inputClassName,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <FormField
            control={control}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  className={`flex-1 border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                  placeholder={placeholder}
                />
              </FormControl>
            )}
          />
          <Button
            className="text-customgreys-dirtyGrey"
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        className="mt-2 text-customgreys-dirtyGrey"
        size="sm"
        type="button"
        variant="outline"
        onClick={() => append("")}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};
