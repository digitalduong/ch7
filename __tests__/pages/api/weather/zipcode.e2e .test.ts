/**
* @jest-environment node
*/
jest.setTimeout(20000);

import fetch from 'node-fetch';

describe("The API /v1/weather/[zipcode]", () => {
    test("returns the correct data for the zipcode 96815", async () => {
    const zip = "96815";
    let response = await fetch(`http://localhost:3000/api/v1/weather/${zip}`);
    let body = await response.json();
    expect(body.zip).toEqual(zip);
    expect(body).toHaveProperty("city");
    expect(body).toHaveProperty("temp");
    expect(body).toHaveProperty("description");
    });
    });
    
    export {};