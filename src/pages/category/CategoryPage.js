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
import { finishUpload, startUpload } from "../../store/uploadModalSlice";

export const CategoryPage = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const category = params.category;
  console.log(category);

  const appliedFilters = useSelector(selectCategoryState);

  const { isSuccess, error, refetch } = useGetCategoryListQuery(
    appliedFilters,
    {
      skip: !appliedFilters.category,
    }
  );
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
    dispatch(
      startUpload({
        message: "Please wait a moment while we process it securely.",
      })
    );
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const toastId = toast.loading("Uploading...");

    try {
      const response = await uploadImageRequest(selectedFile, category);
      toast.update(toastId, {
        render: "File uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
      await refetch();
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.displayMessage
      ) {
        errorMessage = error.response.data.message.displayMessage;
      } else if (error.message) {
        errorMessage = "An error occurred: " + error.message;
      }
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000, // Close after 5 seconds
      });
    } finally {
      event.target.value = null;
      dispatch(finishUpload());
    }
  };

  const handleDownloadSample = async () => {
    try {
      const downloadUrl = `https://mgstorageaccountdru.blob.core.windows.net/mgbucket/mg_template_${category}_file.xlsx `;
      console.log(category);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.target = "_self";
      anchor.download = `mg_template_${category}_file.xlsx`; // Ensure the downloaded file name reflects the category
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("Error downloading the sample file:", error);
      // Optionally, show a user-friendly message or toast notification
    }
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
