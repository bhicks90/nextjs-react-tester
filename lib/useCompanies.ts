import React, { useState, useEffect } from 'react';

export interface Company {
    name: string;
    id: number
    revenue: number
    location: string
    employees: number
    description: string
    website: string
}

interface CustomError {
    message: string;
}
  
  
function useCompanies() {
    const [data, setData] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<CustomError | null>(null);
    const URL = 'https://venefish.enesien.com/api/companies';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setData(data);
            } catch (error) {
                if (error instanceof Error) {
                    const customError: CustomError = {
                        message: error.message,
                    };
                    setError(error);
                }
            
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [URL]);

    return { data, isLoading, error };
}

export default useCompanies;
