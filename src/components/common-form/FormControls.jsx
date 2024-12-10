import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormControls = ({
  formControls = [],
  formData,
  setFormData,
  className = "",
}) => {
  const handleInputChange = (e, controlName) => {
    setFormData({
      ...formData,
      [controlName]: e.target.value,
    });
  };

  const handleSelectChange = (value, controlName) => {
    setFormData({
      ...formData,
      [controlName]: value,
    });
  };

  const renderComponentByType = (control) => {
    const currentValue = formData[control.name] || "";

    switch (control.componentType || control.type) {
      case "input":
        return (
          <Input
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type || "text"}
            value={currentValue}
            onChange={(e) => handleInputChange(e, control.name)}
          />
        );
      case "select":
        return control.options ? (
          <Select
            onValueChange={(value) => handleSelectChange(value, control.name)}
            value={currentValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.placeholder || control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        ) : null;
      case "textarea":
        return (
          <Textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={currentValue}
            onChange={(e) => handleInputChange(e, control.name)}
          />
        );
      default:
        return (
          <input
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type || "text"}
            value={currentValue}
            onChange={(e) => handleInputChange(e, control.name)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        );
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`space-y-6 ${className}`}
    >
      {formControls.map((control, index) => (
        <div key={index} className="space-y-2">
          {control.label && (
            <Label
              htmlFor={control.name}
              className="text-sm font-medium text-gray-600"
            >
              {control.label}
            </Label>
          )}
          {renderComponentByType(control)}
          {control.error && (
            <p className="text-sm text-red-500">{control.error}</p>
          )}
        </div>
      ))}
    </form>
  );
};

export default FormControls;