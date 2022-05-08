export async function getData(url=''): Promise<any>{
    const response = await fetch(url)
    return await response.json()
}

export async function postData(url='', body: Object): Promise<any>{
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    })
    return await response.json()
}

export async function deleteData(url=''): Promise<any>{
    const response = await fetch(url, { method: 'DELETE' })
}