"use client"

import React, { ReactElement } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

type  GenericTable = {
    captionText?: string;
    headers?: string[];
    tableBodyRows: any[];
    tableFooterRow?: [];
    tableDataKeys: string[];
    tableComponentKeys: string[];
};

type DynamicObject = {
    [key: string]: any; 
}

type ComponentConfig = {
    component: ReactElement
    props: any; 
}
  

export function GenericTable(
    {
        captionText, 
        headers, 
        tableBodyRows, 
        tableFooterRow, 
        tableDataKeys, 
        tableComponentKeys
    }: GenericTable) {

    return (
        <Table>
            <TableCaption>{captionText}</TableCaption>

            <TableHeader>
                {headers && headers.map( header => (
                    <TableHead>{header}</TableHead>
                ))}
            </TableHeader>

            <TableBody>
                {
                    tableBodyRows instanceof Array? 
                        tableBodyRows.map((row: DynamicObject) => (
                            <TableRow key={row?.id}>   
                                {
                                    tableDataKeys.map((key) => row[key] !== row?.id ? 
                                        tableComponentKeys.includes(key)? 
                                            <TableCell>{renderComponent(row[key])}</TableCell>
                                            :   
                                            <TableCell>{row[key]}</TableCell> 
                                        :
                                        <></>
                                    )
                                }
                            </TableRow>
                        ))
                        : 
                        <></>
                }
            </TableBody>

            <TableFooter>
                <TableRow>
                {
                    tableFooterRow instanceof Array? 
                        tableFooterRow.map(cellData => 
                            <TableCell className="capitalize">
                                {cellData}
                            </TableCell>
                        )
                        :
                        <></>
                }
                </TableRow>
            </TableFooter>

        </Table>
    );
}

const renderComponent = (componentConfig: ComponentConfig) => {
    const { component: ComponentToRender, props } = componentConfig;

    return <ComponentToRender {...props} />;  
};
