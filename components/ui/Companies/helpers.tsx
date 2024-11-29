import { Company } from "@/lib/useCompanies";

const DEFAULT_CURRENCY = 'USD';
const FORMAT_STYLE = 'currency';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: FORMAT_STYLE,
  currency: DEFAULT_CURRENCY,
});

export const formatCurrency = (value: number): string => {
    return currencyFormatter.format(value);
};

export const getTotalRevenue = ( companies: Company | null ) => {
    return companies instanceof Array ? 
        companies.reduce((sum, company) => sum + company.revenue, 0)
        : 
        0
}

export const getTotalEmployees = ( companies: Company | null ) => {
    return companies instanceof Array ? 
        companies.reduce((sum, company) => sum + company.employees, 0)
        : 
        0
}
