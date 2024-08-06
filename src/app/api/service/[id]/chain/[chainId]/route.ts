import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (_: NextRequest, context?: { params?: { id: string; chainId: string; } }): Promise<NextResponse<any>> => {
    const slug: string = process.env.SLUG as string;
    const body = await _.json().catch(ex => undefined);

    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", process.env.API_KEY as string);
    myHeaders.append("Cookie", "NEXT_LOCALE=en-us");

    const requestOptions = {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: myHeaders,
        redirect: "follow"
    };

    console.log(requestOptions)

    const uri: string = `https://beta.certifie.me/api/reserved/v1/${slug}/service/${context?.params?.id}/chain/${context?.params?.chainId}`;

    const data = await fetch(uri, requestOptions as RequestInit)
        .then(async (response) => { const text = await response.text(); console.log(response, text); return response.json()})
        .then((result) => result)
        .catch((error) => console.error(error));

    return NextResponse.json(data, { status: 200 });
}