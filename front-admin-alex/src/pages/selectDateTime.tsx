import { Divider, Tabs } from "@mantine/core"
import { useGetAllSelectDateTimeQuery } from "../app/services/selectDateTimeServiceApi"
import { SelectDateTimeComponent } from "../app/components/features/select-date-time/select-date-time-component"
import { AddSelectDateTime } from "../app/components/form/add-select-date-time"
import { BulkAddSelectDateTime } from "../app/components/form/BulkAddSelectDateTime"

export const SelectDateTime = () => {
     const { data, isLoading } = useGetAllSelectDateTimeQuery()

     return (
          <>
               <Tabs defaultValue="single">
                    <Tabs.List>
                         <Tabs.Tab value="single">Добавить слот</Tabs.Tab>
                         <Tabs.Tab value="bulk">Массовое добавление</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="single" pt="xs">
                         <AddSelectDateTime />
                    </Tabs.Panel>

                    <Tabs.Panel value="bulk" pt="xs">
                         <BulkAddSelectDateTime />
                    </Tabs.Panel>
               </Tabs>
               
               <Divider my="sm" />
               
               <SelectDateTimeComponent
                    text="Select Date Time"
                    data={data}
                    isLoading={isLoading}
               />
          </>
     )
}
