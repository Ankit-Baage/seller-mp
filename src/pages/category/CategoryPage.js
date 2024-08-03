import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryList,
  useGetCategoryListQuery,
} from "../../services/categoryApiSlice";

import { selectCategoryState, setCategory } from "../../store/categorySlice";
import { TablePage } from "./TablePage";

import classes from "./categoryPage.module.css";
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import { toast } from "react-toastify";
import { FileUploadInput } from "../../component/fileUploadInput/FileUploadInput";
import { uploadImageRequest } from "../../http-request/uploadFile";

export const CategoryPage = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const category = params.category;

  const appliedFilters = useSelector(selectCategoryState);

  const { isSuccess, error } = useGetCategoryListQuery(appliedFilters, {
    skip: !appliedFilters.category,
  });
  const tableData = useSelector(selectCategoryList);

  useEffect(() => {
    if (error) {
      toast.error(error.data.detail, { pauseOnFocusLoss: false });
    }
    dispatch(
      setCategory({
        category: category,
      })
    );
  }, [category, dispatch, error]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const response = await uploadImageRequest(selectedFile, category);
      console.log(response);
      toast.success("File uploaded successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.displayMessage
      ) {
        console.log(error.response.data.message.displayMessage);
        toast.error(error.response.data.message.displayMessage);
      } else if (error.message) {
        console.log(error.message);
        toast.error("An error occurred: " + error.message);
      } else {
        console.log("An unknown error occurred.");
        toast.error("An unknown error occurred.");
      }
    } finally {
      event.target.value = null;
    }
  };
  const handleDownloadSample = async () => {
    const downloadUrl =
      "https://mgstorageaccount.blob.core.windows.net/mgbucket/mg_template_vrp_file.xlsx";
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.target = "_self";
    anchor.download = "mg_template_vrp_file.xlsx";
    document.body.appendChild(anchor);

    anchor.click();
    document.body.removeChild(anchor);
  };

  return isSuccess ? (
    <div className={classes.box}>
      <div className={classes.box__btn}>
        <FileUploadInput id="image_url" onChange={(e) => handleFileChange(e)} />
        <button
          className={classes.box__details__download}
          onClick={handleDownloadSample}
        >
          <span className={classes.box__details__download__img}></span>
          Download Template
        </button>
      </div>
      <TablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
