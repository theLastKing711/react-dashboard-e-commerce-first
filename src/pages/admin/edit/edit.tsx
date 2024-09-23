import React from "react";

import { Create, Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, message, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { IAdminShow, IUpdateAdmin } from "../types";
import { useNavigation, useOne, useShow } from "@refinedev/core";

export const AdminEdit = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<IUpdateAdmin>({
    successNotification: (data, values, resourses) => ({
      message: "تعديل مستخدم",
      description: "تم تعديل المستخدم بنجاح",
      type: "success",
    }),
  });

  // const { query } = useShow<IAdminShow>();

  // console.log("mutation result", mutationResult);

  const postData = mutationResult?.data?.data;

  // const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //   resource: "categories",
  //   defaultValue: postData?.category.id,
  // });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  if (mutationResult.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="تعديل بيانات مستخدم"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="اسم المستخدم"
          name="name"
          rules={[
            {
              required: true,
              message: "اسم المستخدم مطلوب",
            },
          ]}
          initialValue={mutationResult?.data?.data.name}
        >
          <Input />
        </Form.Item>
        <Form.Item label="كلمة المرور" name="password">
          <Input />
        </Form.Item>
        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}

        {/* <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item> */}
        {/* <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item> */}
        {/* <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item> */}
      </Form>
    </Edit>
  );
};
