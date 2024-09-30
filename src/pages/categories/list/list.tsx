import {
  CrudFilters,
  HttpError,
  useDelete,
  useMany,
  useNavigation,
} from "@refinedev/core";

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
  DateField,
} from "@refinedev/antd";

import type { Dayjs } from "dayjs";

import {
  Table,
  Space,
  Select,
  Radio,
  Button,
  Row,
  Flex,
  Col,
  Form,
  Input,
  DatePicker,
} from "antd";
import { ICategory } from "../types";
import {
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RESOURSES } from "../../../constants";
import { IPaginatedData, ListDataItem } from "../../../shared/types";
import { isDate } from "util/types";

export const CategoryList = () => {
  const { tableProps, tableQuery, searchFormProps } = useTable<
    IPaginatedData<ICategory>,
    HttpError,
    { search: string; ids: number[]; date_range: Dayjs[] },
    ICategory
  >({
    syncWithLocation: true,
    filters: {
      // mode: "server",
      // initial: [
      //   {
      //     field: "search",
      //     operator: "contains",
      //     value: "test",
      //   },
      // {
      //   field: "search2",
      //   operator: "eq",
      //   value: "test2",
      // },
      // ],
    },
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
        {
          field: "name",
          order: "asc",
        },
        {
          field: "parent_id",
          order: "asc",
        },
        {
          field: "created_at",
          order: "asc",
        },
      ],
    },
    onSearch: (params) => {
      console.log("params", params);
      const filters: CrudFilters = [];
      const { search, ids, date_range } = params;
      console.log("parent_ids", ids);

      console.log("search", search);

      console.log("ids", ids);

      const date_range_values = date_range
        ? date_range.map((value) => {
            console.log("date_range_value", value);
            return value.toDate();
          })
        : undefined;

      console.log("date_range_on_search", date_range);
      console.log("date_range_values", date_range_values);

      filters.push({
        field: "search",
        operator: "contains",
        value: search,
      });

      filters.push({
        field: "ids[]",
        operator: "contains",
        value: ids,
      });

      filters.push({
        field: "date_range[]",
        operator: "between",
        value: date_range,
      });

      return filters;
    },
  });

  const { query: categorySelectList, selectProps } = useSelect<ListDataItem>({
    resource: `${RESOURSES.category}/parentList`,
    searchField: "title",
  });

  const { editUrl } = useNavigation();

  const { mutate: remove } = useDelete();

  const tableData = tableQuery.data?.data ?? [];

  if (!tableData) {
    return <h1>loading...</h1>;
  }

  const removeItem = (record: ICategory) => {
    console.log("record", record);
    remove({
      resource: "Category",
      id: record.id,
      successNotification: (data, values, resourses) => ({
        message: "حذف تصنيف",
        description: "تم حذف التصنيف بنجاح",
        type: "success",
      }),
    });
  };

  console.log("table props", tableProps);

  return (
    <List
      headerProps={{
        title: "التصنيفات",
        subTitle: "الصفحة الرئيسة",
        onBack: () => console.log("clicked"),
      }}
    >
      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          <Form layout="vertical" {...searchFormProps}>
            <Form.Item label="البحث" name="search">
              <Input
                placeholder="معرف, اسم التصنيف, اسم التصنيف الفرعي"
                prefix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
            <Form.Item label=" حسب تصنيف اﻷب" name="ids">
              <Select
                {...selectProps}
                mode="multiple"
                showSearch
                allowClear
                filterOption={(input, option) => {
                  return ((option?.label as string) ?? "")
                    ?.toLowerCase()
                    .includes(input.toLowerCase());
                }}
              ></Select>
            </Form.Item>
            <Form.Item label="بين تاريخي" name="date_range">
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                فلتر
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={18} xs={24}>
          <Table {...tableProps} rowKey="id">
            <Table.Column
              dataIndex="id"
              title="المعرف"
              sorter={true}
              showSorterTooltip={{ title: "انقر لترتيب حسب العمود" }}
              sortIcon={({ sortOrder }) => {
                if (!sortOrder) {
                  return undefined;
                }
                if (sortOrder === "ascend") return <SortAscendingOutlined />;

                return <SortDescendingOutlined />;
              }}
            />
            <Table.Column
              dataIndex="name"
              title="التصنيف"
              sorter={true}
              showSorterTooltip={{ title: "انقر لترتيب حسب العمود" }}
              sortIcon={({ sortOrder }) => {
                if (!sortOrder) {
                  return undefined;
                }
                if (sortOrder === "ascend") return <SortAscendingOutlined />;

                return <SortDescendingOutlined />;
              }}
            />
            <Table.Column
              dataIndex="parent_name"
              title="التصنيف اﻷب"
              render={(value, record: ICategory, index) => (
                <>{record.parent_name}</>
              )}
              sorter={true}
              showSorterTooltip={{ title: "انقر لترتيب حسب العمود" }}
              sortIcon={({ sortOrder }) => {
                if (!sortOrder) {
                  return undefined;
                }
                if (sortOrder === "ascend") return <SortAscendingOutlined />;

                return <SortDescendingOutlined />;
              }}
            />
            <Table.Column
              dataIndex="created_at"
              title="تاريخ اﻹنشاء"
              sorter={true}
              showSorterTooltip={{ title: "انقر لترتيب حسب العمود" }}
              sortIcon={({ sortOrder }) => {
                if (!sortOrder) {
                  return undefined;
                }
                if (sortOrder === "ascend") return <SortAscendingOutlined />;

                return <SortDescendingOutlined />;
              }}
              render={(value, record: ICategory, index) => (
                <>{new Date(record.created_at).toLocaleDateString("ar")}</>
              )}
            />
            <Table.Column
              render={(value, record: ICategory, index) => (
                <Flex gap={16}>
                  <Link to={editUrl(RESOURSES.category, record.id)}>
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
          </Table>
        </Col>
      </Row>
    </List>
  );
};
