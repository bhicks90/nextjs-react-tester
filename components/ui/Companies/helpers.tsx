import { Company } from "@/lib/useCompanies";

const DEFAULT_CURRENCY = 'USD';

export const formatCurrency = (value: number, currency: string = DEFAULT_CURRENCY): string => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(value);
};

export const getTotalRevenue = ( companies: Company | null ) => {
    let revenue;

    companies instanceof Array ? 
        revenue = companies.reduce((sum, company) => sum + company.revenue, 0)
        : 
        0
    return formatCurrency(revenue);
}

export const getTotalEmployees = ( companies: Company | null ) => {
    let employees;

    companies instanceof Array ? 
        employees = companies.reduce((sum, company) => sum + company.employees, 0)
        : 
        0
    return employees;
}