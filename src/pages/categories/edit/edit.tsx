import { useState } from "react";

import { Edit, getValueFromEvent, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select, Upload } from "antd";

import { HttpError, useNotification } from "@refinedev/core";

import MDEditor from "@uiw/react-md-editor";
import { IShowCategory, IUpdateCategory } from "../types";
import { BASE_URI } from "../../../constants";
import { apiClient } from "../../../libs/axios/config";
import useGetParentCategoriesList from "../hooks/useGetParentCategoriesList";
import { UploadFile } from "antd/lib";
import { ImageResponseData, UpdateImageData } from "../../../shared/types";

export const CategoryEdit = () => {
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const { open } = useNotification();

  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<IShowCategory, HttpError, IUpdateCategory>({
    successNotification: (data, values, resourses) => ({
      message: "تعديل تصنيف",
      description: "تم تعديل التصنيف بنجاح",
      type: "success",
    }),
  });

  const { parentCategoriesList, parentCategoriesListSelectProps } =
    useGetParentCategoriesList();

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  const isLoading = mutationResult.isLoading || parentCategoriesList.isLoading;

  const handleFinish: (items: IUpdateCategory) => void | undefined = (
    items
  ) => {
    const formImages = items?.images;

    console.log("image urls", formImages);

    const updatedImages: UpdateImageData[] | undefined = formImages?.map(
      (image) =>
        ({
          url: image.url ?? image.response?.url,
          uid: typeof image.uid == "string" ? undefined : image.uid,
        } as UpdateImageData)
    );

    const { images, ...withoutImagesItems } = items;

    const requestVariables: IUpdateCategory = {
      ...withoutImagesItems,
      image_urls: updatedImages,
    };

    console.log("requestVariables", requestVariables);

    formProps.onFinish?.(requestVariables);
  };

  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="تعديل بيانات تصنيف"
      isLoading={isLoading}
    >
      <Form {...formProps} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="اسم التصنيف"
          name="name"
          rules={[
            {
              required: true,
              message: "اسم التصنيف مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="parent_id" label="تصنيف اﻷب">
          <Select
            style={{ width: 300 }}
            {...parentCategoriesListSelectProps}
          ></Select>
        </Form.Item>
        <Form.Item
          name="images"
          label="صور"
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
          noStyle
        >
          <Upload.Dragger
            name="file"
            listType="picture"
            maxCount={2}
            customRequest={async (options) => {
              try {
                setIsUploadingImage(true);
                const result = await apiClient.postForm(`${BASE_URI}/files`, {
                  file: options.file,
                });
                console.log("result", result);
                options.onSuccess?.(result.data);
              } catch (error) {
                open?.({
                  type: "error",
                  message: "حذث حطأ أثناء تحميل الصورة",
                });
                options.onError?.({
                  name: "تحميل الصورة",
                  message: "حدث خطأ أثناء تحميل الصورة",
                });
              } finally {
                setIsUploadingImage(false);
              }
            }}
          >
            <p className="ant-upload-text">Drag & drop a file in this area</p>
          </Upload.Dragger>
        </Form.Item>
        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}
      </Form>
    </Edit>
  );
};
