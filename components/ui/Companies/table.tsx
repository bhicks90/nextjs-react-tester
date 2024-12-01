"use client"

import React from "react";
import { Alert } from "@/components/ui/alert";
import { formatCurrency, getTotalEmployees, getTotalRevenue } from "@/components/ui/companies/helpers";

import useCompanies, { Company } from "@/lib/useCompanies";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Link from "@/components/ui/link";
import { GenericTable } from "@/components/ui/generic-table";

const TABLE_CAPTION_TEXT = "A list of companies";
const TABLE_HEADERS = ["Company", "Description", "Revenue", "Location", "Employee Count", "Website"];
const TABLE_DATA_KEYS = ["id", "name", "description", "revenue", "location", "employees", "website"];
const TABLE_COMPONENT_KEYS = ["website"];

type UpdatedRow = {
    website: string | {};
    name: string;
    id: number | string;
    revenue:  number | string;
    location: string;
    employees: number | string;
    description: string;
}

export function CompaniesTable() {
    const { data: companies, isLoading, error } = useCompanies();

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (error) {
        return <Alert className="p-4 mb-4 text-red-800 bg-red-50">{error.message}</Alert>;  
    }

    const TotalEmployees = getTotalEmployees(companies);
    const TotalRevenue = formatCurrency(getTotalRevenue(companies));
    const TABLE_FOOTER_ROW = ["", "", TotalRevenue, "", TotalEmployees, ""];

    const companyTableData = {
        captionText: TABLE_CAPTION_TEXT,
        headers: TABLE_HEADERS, 
        tableBodyRows: getUpdatedRows(companies), 
        tableFooterRow: TABLE_FOOTER_ROW,
        tableDataKeys: TABLE_DATA_KEYS,
        tableComponentKeys: TABLE_COMPONENT_KEYS
    };

    return <GenericTable {...companyTableData}/>

}

// adds link and formats currency
const getUpdatedRows = (rows : Company | null): UpdatedRow => {
    let updatedRows;
    
    rows instanceof Array?
    updatedRows = rows.map( row => {
            const tableComponentConfig = {
                component: Link,         
                props: { url: row.website }
            };

            return { 
                ...row, 
                website: tableComponentConfig,
                revenue: formatCurrency(row.revenue) 
            };
        })
        :
        updatedRows = [];

    return updatedRows;
};
