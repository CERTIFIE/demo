export const getContractList = async () => {
    const result = await fetch("http://localhost:3000/api/contract/")
        .then((data: Response) => data.json())
        .then((data: Array<any>) => data)
        .catch((reason: any) => []);

    console.log(result);

    return result;
};

export const getServiceList = async () => {
    const result = await fetch("http://localhost:3000/api/service/")
        .then((data: Response) => data.json())
        .then((data: Array<any>) => data)
        .catch((reason: any) => []);

    console.log(result);

    return result;
};

export const getService = async (id: string) => {
    const result = await fetch(`http://localhost:3000/api/service/${id}`)
        .then((data: Response) => data.json())
        .then((data: any) => data)
        .catch((reason: any) => []);

    console.log(result);

    return result;
};

export const getChainList = async () => {
    const result = await fetch("http://localhost:3000/api/chain/")
        .then((data: Response) => data.json())
        .then((data: Array<any>) => data)
        .catch((reason: any) => []);

    console.log(result);

    return result;
};

export const createService = async (payload: any) => {
    const result = await fetch("http://localhost:3000/api/service/", { method: "POST", body: JSON.stringify(payload) })
        .then((data: Response) => data.json())
        .then((data: Array<any>) => data)
        .catch((reason: any) => []);

    console.log(result);

    return result;
};

export const deployService = async (id: string, chainId: string, payload: any) => {
    const result = await fetch(`http://localhost:3000/api/service/${id}/chain/${chainId}`, { method: "PATCH", body: JSON.stringify(payload) })
        .then((data: Response) => data.json())
        .then((data: Array<any>) => data)
        .catch((reason: any) => []);

    console.log(result);

    return result;
};