import React from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "./customInput/CustomInput";
import { CustomSelect } from "./customSelect/CustomSelect";
import { FileUploadInput } from "./fileUploadInput/FileUploadInput";
import classes from "./dynamicForm.module.css";

export const DynamicForm = ({
  heading,
  config,
  onSubmit,
  onClose,
  primaryButtonLabel,
  secondaryButtonLabel,
}) => {
  const { register, handleSubmit, setValue, formState } = useForm();
  const { isValid } = formState;

  // useEffect(() => {
  //   trigger(); // Trigger validation on form load
  // }, [trigger]);

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(id, file);
    }
  };

  console.log("dynamicForm isValid: ", isValid); // Debugging log

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {heading && <h1 className={classes.form__head}>{heading}</h1>}
      {config.map((field, index) => {
        const key = `${field.id}_${index}`;

        switch (field.type) {
          case "text":
          case "email":
          case "password":
          case "number":
            return (
              <CustomInput
                key={key}
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
                register={register}
                validation={field.validation}
                defaultValue={field.defaultValue || ""}
                disabled={field.disabled}
              />
            );

          case "select":
            return (
              <CustomSelect
                key={key}
                options={field.options}
                selectOptionId={field.defaultValue}
                label={field.label}
                onChange={(value) => setValue(field.id, value)}
              />
            );

          case "file":
            return (
              <FileUploadInput
                key={key}
                id={field.id}
                onChange={(e) => handleFileUpload(field.id, e)}
                label={field.label}
              />
            );

          default:
            return null; // Skip unsupported field types
        }
      })}

      <div className={classes.form__btns}>
        <button
          type="submit"
          style={{ width: !secondaryButtonLabel ? "100%" : "" }}
          className={`${classes.form__btn} ${
            isValid ? classes.form__btn__enabled : ""
          }`}
          disabled={!isValid}
        >
          {primaryButtonLabel}
        </button>
        {secondaryButtonLabel && (
          <button
            type="button"
            className={`${classes.form__btn} ${classes.form__btn__enabled}`}
            onClick={onClose}
          >
            {secondaryButtonLabel}
          </button>
        )}
      </div>
    </form>
  );
};
