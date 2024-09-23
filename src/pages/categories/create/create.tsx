import React from "react";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, message, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { ICreateCategory } from "../types";
import { useCustom, useMany } from "@refinedev/core";
import { ListData, ListDataItem } from "../../../shared/types";
import { ADMIN_URI, BASE_URI, RESOURSES } from "../../../constants";
const { Option } = Select;

export const CategoryCreate = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<ICreateCategory>({
    successNotification: (data, values, resourses) => ({
      message: "إنشاء تصنيف جديد",
      description: "تم إنشاء تصنيف جديد بنجاح",
      type: "success",
    }),
  });

  const { query: categorySelectList, selectProps } = useSelect<ListDataItem>({
    resource: `${RESOURSES.category}/list`,
    searchField: "title",
  });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="إنشاء تصنيف جديد"
      isLoading={categorySelectList.isLoading}
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
          <Select
            style={{ width: 300 }}
            {...selectProps}
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
