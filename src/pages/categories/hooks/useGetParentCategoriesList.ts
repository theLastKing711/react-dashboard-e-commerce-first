import { useSelect } from "@refinedev/antd";
import { ListDataItem } from "../../../shared/types";
import { RESOURSES } from "../../../constants";



export default function useGetParentCategoriesList() {

    const { query: parentCategoriesList, selectProps: parentCategoriesListSelectProps } 
            = useSelect<ListDataItem>({
                resource: `${RESOURSES.category}/list`,
                searchField: "title",
        });

      return {
        parentCategoriesList,
        parentCategoriesListSelectProps
      }

}

