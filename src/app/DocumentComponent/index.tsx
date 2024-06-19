"use client"

import React, { useState } from 'react';

const DocumentComponent = () => {
    const [json, setJson] = useState('');
    const [contentType, setContentType] = useState('');
    const [uri, setUri] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Gestisci la logica del submit qui
        console.log({ json, contentType, uri });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full mx-auto shadow-md">
                <h1 className='text-xl'><b>Notarize new document</b></h1>
                <hr />
                <div>
                    <label htmlFor="json" className="block text-sm font-medium text-gray-100">JSON</label>
                    <textarea
                        id="json"
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={4}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="contentType" className="block text-sm font-medium text-gray-100">Content Type</label>
                    <input
                        type="text"
                        id="contentType"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="uri" className="block text-sm font-medium text-gray-100">URI</label>
                    <input
                        type="text"
                        id="uri"
                        value={uri}
                        onChange={(e) => setUri(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default DocumentComponent;