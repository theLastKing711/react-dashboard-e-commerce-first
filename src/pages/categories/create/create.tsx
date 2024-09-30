import { useState } from "react";

import { Create, getValueFromEvent, useForm } from "@refinedev/antd";

import { Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { ICreateCategory } from "../types";
import { HttpError, useNotification } from "@refinedev/core";
import { ImageResponseData } from "../../../shared/types";
import { BASE_URI } from "../../../constants";
const { Option } = Select;
import type { UploadFile } from "antd";
import { apiClient } from "../../../libs/axios/config";
import useGetParentCategoriesList from "../hooks/useGetParentCategoriesList";

export const CategoryCreate = () => {
  const { open } = useNotification();

  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
    onFinish,
  } = useForm<{ item: string }, HttpError, ICreateCategory, ICreateCategory>({
    successNotification: (data, values, resourses) => ({
      message: "إنشاء تصنيف جديد",
      description: "تم إنشاء تصنيف جديد بنجاح",
      type: "success",
    }),
  });

  const { parentCategoriesList, parentCategoriesListSelectProps } =
    useGetParentCategoriesList();

  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  const handleFinish: (items: ICreateCategory) => void | undefined = (
    items
  ) => {
    const image_urls = items?.images as UploadFile[] | undefined;

    const newImages: ImageResponseData[] | undefined = image_urls?.map(
      (image) =>
        ({
          url: image.response.url,
          public_id: image.response.public_id,
        } as ImageResponseData)
    );

    const { images, ...withoutImagesItems } = items;

    const requestVariables: ICreateCategory = {
      ...withoutImagesItems,
      image_urls: newImages,
    };

    formProps.onFinish?.(requestVariables);
  };

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        children: "حفظ",
        disabled: isUploadingImage,
      }}
      title="إنشاء تصنيف جديد"
      isLoading={parentCategoriesList.isLoading}
    >
      <Form {...formProps} onFinish={handleFinish} layout="vertical">
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
            showSearch
            allowClear
            filterOption={(input, option) => {
              return ((option?.label as string) ?? "")
                ?.toLowerCase()
                .includes(input.toLowerCase());
            }}
          ></Select>
        </Form.Item>
        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}
      </Form>
    </Create>
  );
};
