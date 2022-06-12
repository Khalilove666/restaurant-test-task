const BASE_URL = import.meta.env.PROD ? "/data" : "/public/data"

export default async function performRequest(url: string, method: string = "GET", data: any = null): Promise<any> {
    try {
        const res = await fetch(BASE_URL + url, {
            method,
            body: data ? JSON.stringify(data) : null,
        });
        const result = await res.json();
        if (res.ok) return {
            ok: true,
            status: res.status,
            data: result.data,
        }; else return {
            ok: false,
            status: res.status,
            error: result.data
        };
    } catch (e: any) {
        return {
            ok: false,
            status: null,
            error: e
        }
    }
}