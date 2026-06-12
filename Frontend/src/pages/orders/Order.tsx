import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx"
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useMemo, useState} from "react";
import React from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {FILTERS_OPTIONS} from "@/constant";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";
import {Orders} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge.tsx";

const Order = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSelected, setFilterSelected] = useState("all")

const TableFilters = filterSelected == 'all' ? []: [
  {
    field: 'customerName', operator: 'eq' as const, value: filterSelected
  }
]
  const searchFilter = searchQuery ? [
    {field:'name', operator : 'eq' as const, value:setSearchQuery}
  ] : []
  const orderTable = useTable<Orders>({
    columns:useMemo<ColumnDef<Orders>[]>(()=>[

      {
        id:'customerName',
        accessorKey:"name",
        size:100,
        header:'Customer',
        cell:({getValue})=><Badge className={"font-semibold text-[15px]"}>{getValue<string>()}</Badge>,
        filterFn: 'includesString' //enable filtering ability which is automatically and includeString enables use text based filtering on specific column
      },

      {
        id:'orderDate',
        accessorKey:'created_at',
        size:100,
        header:'Order-Date',
        cell:({getValue})=><Badge className={"font-semibold text-[15px]"}>{getValue<string>()}</Badge>,
        filterFn: 'auto'
      },
      {
        id:'description',
        accessorKey:'order_description',
        size:350,
        header:'Description',
        cell:({getValue})=><Badge className={"font-semibold text-[15px]"}>{getValue<string>()}</Badge>
      },

      {
        id:'status',
        accessorKey:"status",
        size:150,
        header:'Status',
        cell:({getValue})=><Badge className={"font-semibold text-[15px]"}>{getValue<string>()}</Badge>
      },
      {
        id:'total',
        accessorKey:"total_amount",
        size:150,
        header:'Total',
        cell:({getValue})=><Badge className={"font-semibold text-[15px]"}>{getValue<string>()}</Badge>
      },

    ],[]),

   refineCoreProps:{
     resource:'orders',
     pagination:{pageSize:10, mode:'server'},
     filters:{
       permanent:[...TableFilters, ...searchFilter]
     },
     sorters:{
       initial:[
         {field:'id', order:'desc'},
       ]
     }
   },

  })
  const handleSearch=(e: React.ChangeEvent<HTMLInputElement>)=>{

    setSearchQuery(e.target.value)
  }
  return (
  <ListView>
      <Breadcrumb/>


    <div className="intro-row">
      <p className={"font-semibold text-sm text-gray-300"}>Quick access to essential metrics and management tool</p>

      <div className={"actions-row"}>
        <div className={"search-field"}>
          <Search className={"search-icon"}/>
          <Input type={"text"}
          placeholder={"Search by name"}
          className={"pl-10 w-full"}
          value={searchQuery}
          onChange={handleSearch}/>
        </div>
        <div className={"flex gap-3 w-full sm:w-auto"}>
          <Select value={filterSelected}
          onValueChange={setFilterSelected}>
            <SelectTrigger>
              <SelectValue placeholder={"filter by date"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"} className={"text-foreground"}>
                All
              </SelectItem>
              {FILTERS_OPTIONS.map(FILTERS =>(
                  <SelectItem key={FILTERS.value} value={FILTERS.value}>
                    {FILTERS.label}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      </div>
    </div>
    <DataTable table={orderTable}/>
  </ListView>
  )
}

export default Order