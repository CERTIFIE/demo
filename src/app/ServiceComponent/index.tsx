"use client"

import React, { useEffect, useState } from 'react';
import { createService, deployService, getChainList, getContractList, getService, getServiceList } from "./functions";

const ServiceComponent = () => {
    const [contracts, setContracts] = useState<Array<any>>([]);
    useEffect(() => { getContractList().then((data: Array<any>) => setContracts(data)) }, []);

    const [chains, setChains] = useState<Array<any>>([]);
    useEffect(() => { getChainList().then((data: Array<any>) => setChains(data)) }, []);

    const [name, setName] = useState('');
    const [vat, setVat] = useState('');
    const [providerId, setProviderId] = useState('');
    const [contractId, setContractId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');

    const [services, setServices] = useState<Array<any>>([]);
    useEffect(() => {
        getServiceList().then((data: Array<any>) => setServices(data));
    }, [serviceId]);

    const [service, setService] = useState<any>({});
    useEffect(() => {
        if (serviceId) {
            getService(serviceId).then((data: any) => setService(data)).catch(() => { });
        } else {
            setService({});
        }
    }, [serviceId]);
    useEffect(() => {
        if (service) {
            setName(service.name || "");
            setVat(service.vat || "");
            setContractId(service?.contract?._id || "");
            setTokenName(service?.constructorArguments?._tokenName?.value || "");
            setTokenSymbol(service?.constructorArguments?._tokenSymbol?.value || "");
        } else {
            setName("");
            setVat("");
            setContractId("");
            setTokenName("");
            setTokenSymbol("");
        }
    }, [service]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!serviceId) {
            const payload = {
                "name": name,
                "vat": vat,
                "contract": {
                    "_id": contractId
                }
            };

            setServiceId("");
            createService(payload).then((data: any) => {
                setServiceId(data._id)
            });
        } else if (serviceId && providerId) {
            const payload = {
                "vat": vat,
                "constructorArguments": {
                    "_tokenName": {
                        "value": tokenName,
                        "index": 1
                    },
                    "_tokenSymbol": {
                        "value": tokenSymbol,
                        "index": 2
                    }
                }
            };

            setServiceId("");
            deployService(serviceId, providerId, payload).then((data: any) => {
                setServiceId(data._id)
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full mx-auto shadow-md">
                <h1 className='text-xl'><b>Services</b></h1>
                <div>
                    <label htmlFor="services" className="block text-sm font-medium"></label>
                    <select
                        id="services"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Create new service</option>
                        {services.map((option) => (
                            <option key={option._id} value={option._id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <hr />
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Service name *</label>
                    <input
                        required={true}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="vat" className="block text-sm font-medium">VAT *</label>
                    <input
                        required={true}
                        type="text"
                        id="vat"
                        value={vat}
                        onChange={(e) => setVat(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="contract" className="block text-sm font-medium">Contracts *</label>
                    <select
                        required={true}
                        id="contract"
                        value={contractId}
                        onChange={(e) => setContractId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select an option</option>
                        {contracts.map((option) => (
                            <option key={option._id} value={option._id}>
                                {option.contractName}
                            </option>
                        ))}
                    </select>
                </div>
                {service?._id && <>
                    {service.deployedChain.length > 0
                        ? <div className='mt-2'>Already deployed on: {chains.filter((a1: any) => service.deployedChain.some((a2: any) => a1.chainId == a2)).map((a1: any) => a1.chainName).join(", ")}</div>
                        : <div>
                            <label htmlFor="provider" className="block text-sm font-medium">Providers *</label>
                            <select
                                required={true}
                                id="provider"
                                value={providerId}
                                onChange={(e) => setProviderId(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select an option</option>
                                {chains.map((option) => (
                                    <option key={option.chainId} value={option.chainId}>
                                        {option.chainName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    }
                    <div>
                        <label htmlFor="tokenName" className="block text-sm font-medium">Token name *</label>
                        <input
                            required={true}
                            type="text"
                            id="tokenName"
                            value={tokenName}
                            onChange={(e) => setTokenName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="tokenSymbol" className="block text-sm font-medium">Token symbol *</label>
                        <input
                            required={true}
                            type="text"
                            id="tokenSymbol"
                            value={tokenSymbol}
                            onChange={(e) => setTokenSymbol(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </>}
                {(serviceId === "" || (serviceId !== "" && service?.deployedChain?.length === 0)) && <button
                    type="submit"
                    disabled={serviceId !== "" && service?.deployedChain?.length > 0}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${serviceId === "" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700"} ${serviceId !== "" && service?.deployedChain?.length > 0 ? "disabled bg-gray-300 hover:bg-gray-300 text-gray-800" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {serviceId === "" && "Create new service"}
                    {(serviceId !== "" && service?.deployedChain?.length === 0) && "Deploy"}
                </button>}
            </form>
        </>
    );
};

export default ServiceComponent;