async function fetchData() {
    const dataFormat = {
        "dataSource": "Cluster0",
        "database": "sample_restaurants",
        "collection": "restaurants",
        "filter": {
            "cuisine": "Italian"
        },
    }

    const response = await fetch('https://data.mongodb-api.com/app/data-mbose/endpoint/data/v1/action/findOne',  {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "omit",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'VmQ4hiy8tNnWewm0TMKM5PCAdIYHg3VKMzo6EnBQvkJHUuIQ3pdEmKD2vgE1wWhu'
        },

        'redirect': 'follow',
        'referrerPolicy': 'no-referrer',
        'body': JSON.stringify(dataFormat)
    });

    const json_response = await response.json();
    console.log(json_response);
}

fetchData();