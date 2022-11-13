import {useEffect, useState} from "react";

export function useDebounce(query: string, delay = 500): string {
    const [value, setValue] = useState(query)

    useEffect(() => {
        const handler = setTimeout(() => setValue(query), delay)
        return () => clearTimeout(handler)
    }, [query, delay])

    return value
}