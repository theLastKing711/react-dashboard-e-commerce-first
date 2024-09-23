import { useDelete, useMany, useNavigation } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  FilterDropdown,
  useSelect,
  TagField,
  DeleteButton,
} from "@refinedev/antd";

import { Table, Button, Flex } from "antd";
import { IAdmin } from "../types";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const AdminList = () => {
  const { tableProps, tableQuery } = useTable<IAdmin>();

  const { editUrl } = useNavigation();

  const { mutate: remove } = useDelete();

  //   const categoryIds =
  //     tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  //   const { data, isLoading } = useMany<ICategory>({
  //     resource: "categories",
  //     ids: categoryIds,
  //     queryOptions: {
  //       enabled: categoryIds.length > 0,
  //     },
  //   });

  //   const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //     resource: "categories",
  //     optionLabel: "title",
  //     optionValue: "id",
  //   });

  const tableData = tableQuery.data?.data ?? [];

  if (!tableData) {
    return <h1>loading...</h1>;
  }

  // const removeItem: React.MouseEventHandler<HTMLElement> | undefined = (
  //   element
  // ) => {
  //   console.log("element", element.target);
  // };

  const removeItem = (record: IAdmin) => {
    console.log("record", record);
    remove({
      resource: "admin",
      id: record.id,
      successNotification: (data, values, resourses) => ({
        message: "حذف مستخدم",
        description: "تم حذف السمتخدم بنجاح",
        type: "success",
      }),
    });
  };

  return (
    <List
      headerProps={{
        onBack: () => console.log("clicked"),
        subTitle: "Subtitle",
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="اسم الستخدم" />
        <Table.Column dataIndex="email" title="البريد الاكتروني" />
        <Table.Column dataIndex="created_at" title="تاريخ اﻹنشاء" />
        <Table.Column
          render={(value, record: IAdmin, index) => (
            <Flex gap={16}>
              <Link to={editUrl("admin", record.id)}>
                <Button icon={<EyeOutlined />} htmlType="button" />
              </Link>
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                htmlType="submit"
                onClick={() => removeItem(record)}
              />
            </Flex>
          )}
        />

        {/* <Table.Column
            dataIndex={["category", "id"]}
            title="Category"
            render={(value) => {
              if (isLoading) {
                return <TextField value="Loading..." />;
              }
  
              return (
                <TextField
                  value={data?.data.find((item) => item.id === value)?.title}
                />
              );
            }}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Category"
                  {...categorySelectProps}
                />
              </FilterDropdown>
            )}
          /> */}
        {/* <Table.Column
            dataIndex="status"
            title="Status"
            render={(value: string) => <TagField value={value} />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Radio.Group>
                  <Radio value="published">Published</Radio>
                  <Radio value="draft">Draft</Radio>
                  <Radio value="rejected">Rejected</Radio>
                </Radio.Group>
              </FilterDropdown>
            )}
          /> */}
        {/* <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          /> */}
      </Table>
    </List>
  );
};
