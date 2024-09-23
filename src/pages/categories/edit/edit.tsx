import React from "react";

import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { IUpdateCategory } from "../types";
import { ListDataItem } from "../../../shared/types";
import { RESOURSES } from "../../../constants";

export const CategoryEdit = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<IUpdateCategory>({
    successNotification: (data, values, resourses) => ({
      message: "تعديل تصنيف",
      description: "تم تعديل التصنيف بنجاح",
      type: "success",
    }),
  });

  const { query: categorySelectList, selectProps } = useSelect<ListDataItem>({
    resource: `${RESOURSES.category}/list`,
  });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  const isLoading = mutationResult.isLoading || categorySelectList.isLoading;

  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="تعديل بيانات تصنيف"
      isLoading={isLoading}
    >
      <Form {...formProps} layout="vertical">
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
          <Select style={{ width: 300 }} {...selectProps}></Select>
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
