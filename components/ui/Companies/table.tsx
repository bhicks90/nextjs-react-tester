"use client"

import { Alert } from "@/components/ui/alert";
import { formatCurrency, getTotalEmployees, getTotalRevenue } from "@/components/ui/Companies/helpers";
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
import useCompanies, { Company } from "@/lib/useCompanies";
import LoadingSpinner from "../loadingspinner";

const TABLE_CAPTION_TEXT = "A list of companies";
const HEADERS = ["Company", "Revenue", "Location", "Employee Count", "Description", "Website"];

export function CompaniesTable() {
    const { data: companies, isLoading, error } = useCompanies();

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (error) {
        return <Alert className="p-4 mb-4 text-red-800  bg-red-50">{error.message}</Alert>;  
    }

    return (
        <Table>
            <TableCaption>{TABLE_CAPTION_TEXT}</TableCaption>

            <TableHeader>
                {HEADERS.map( header => (
                    <TableHead>{header}</TableHead>
                ))}
            </TableHeader>

            <TableBody>
                {
                    companies instanceof Array? 
                        companies.map( ({id, name, revenue, location, employees, description, website}: Company) => (
                            <TableRow key={id}>
                                <TableCell>{name}</TableCell>
                                <TableCell>{formatCurrency(revenue)}</TableCell>
                                <TableCell>{location}</TableCell>
                                <TableCell>{employees}</TableCell>
                                <TableCell>{description}</TableCell>
                                <TableCell>{website}</TableCell>
                            </TableRow>
                        ))
                        : 
                        null
                }
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                        {getTotalRevenue(companies)}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        {getTotalEmployees(companies)}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableFooter>

        </Table>
    )
}
