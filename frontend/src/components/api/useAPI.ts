import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

const useAPI = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(false)
        axios.get<T>(url)
            .then((res) => { setData(res.data) })
            .catch((err: AxiosError) => { setError(err.message) })
            .finally(() => { setLoading(false) })
    }, [url])

    return {data, error, loading};
}

export default useAPI;