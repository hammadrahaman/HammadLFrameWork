/// <reference types="cypress" />
const fake = require("../fakeFunction.ts/fake");
let pickUpFullAddress: any;
let pickUpLogitude: any;
let pickUpLatitude: any;
let pickUpZip: any;
let pickUpCountry: any;
let pickUpState: any;
let pickUpCity: any;
let dropOffFullAddress: any;
let dropOffLongitude: any;
let dropOffLatitude: any;
let dropOffZip: any;
let dropOffCountry: any;
let dropOffState: any;
let dropOffCity: any;

export function generateLocation() {
  cy.request({
    method: "GET",
    url: `https://singlesearch.alk.com/NA/api/search?authToken=C262376E2A14FD4B88180F8B75A11E46&countryType=ISO&getAllHNRanges=false&maxResults=25&query=${fake(
      "location"
    )}&include=Meta&countries=US,%20CA,MX&useCustomPlaces=false&excludeResultsFor=RouteAlpha,POI,POIStreet,POIType,CustomPlace,CrossStreet,LatLon`,
    failOnStatusCode: false,
  }).then((respone) => {
    console.log("body: ", respone.body);
    console.log("location: ", respone.body.Locations);
    let locData = respone.body.Locations;

    if (locData.length === 0 || locData < 1) {
      generateLocation();
    } else {
      pickUpZip = locData[0].Address.Zip;
      pickUpCountry = locData[0].Address.CountryFullName;
      pickUpFullAddress = locData[0].ShortString;
      pickUpLatitude = locData[0].StreetCoords.Lat;
      pickUpLogitude = locData[0].StreetCoords.Lon;
      pickUpState = locData[0].Address.State;
      pickUpCity = locData[0].Address.City;
      dropOffZip = locData[1].Address.Zip;
      dropOffCountry = locData[1].Address.CountryFullName;
      dropOffFullAddress = locData[1].ShortString;
      dropOffLatitude = locData[1].StreetCoords.Lat;
      dropOffLongitude = locData[1].StreetCoords.Lon;
      dropOffState = locData[1].Address.State;
      dropOffCity = locData[1].Address.City;
      console.log(
        "firstLocation: ",
        locData[0],
        "fullAddress: ",
        locData[0].ShortString,
        "firstLocationAddress: ",
        locData[0].Address
      );
      console.log(
        "lattitudeLogitude: ",
        locData[0].StreetCoords.Lat,
        " lon: ",
        locData[0].StreetCoords.Lon,
        " zip: ",
        locData[0].Address.Zip
      );
    }
    const pickUpbody = {
      contacts: [
        {
          fullName: fake("name"),
          email: fake("email"),
          phoneData: {
            countryCode: "USA",
            phone: 9741160846,
          },
          description: "created through API",
          isPrimary: true,
        },
      ],
      avgHandlingTime: 120,
      addressDTO: {
        state: pickUpState,
        city: pickUpCity,
        streetAddress2: null,
        streetAddress: null,
        address: pickUpFullAddress,
        fullAddress: "",
        center: {
          lat: pickUpLatitude,
          lng: pickUpLogitude,
        },
        zipcode: pickUpZip,
      },
      notes: null,
      locationName: fake("locationName"),
      locationPreference: 2,
    };

    const dropOffBody = {
      contacts: [
        {
          fullName: fake("name"),
          email: fake("email"),
          phoneData: {
            countryCode: "USA",
            phone: 9741160846,
          },
          description: "created through API",
          isPrimary: true,
        },
      ],
      avgHandlingTime: 120,
      addressDTO: {
        state: dropOffState,
        city: dropOffCity,
        streetAddress2: null,
        streetAddress: null,
        address: dropOffFullAddress,
        fullAddress: "",
        center: {
          lat: dropOffLatitude,
          lng: dropOffLongitude,
        },
        zipcode: dropOffZip,
      },
      notes: null,
      locationName: fake("locationName"),
      locationPreference: 2,
    };

    //pick up
    cy.request({
      method: "POST",
      url: `/web/location/api/v2/locations/create/location?organizationId=${Cypress.env(
        "originitionID"
      )}`,
      body: pickUpbody,
      headers: { "Mp-Auth-Token": Cypress.env("accessToken") },
      failOnStatusCode: false,
    }).then((re) => {
      //locationName we need to fetch from api
      expect(re.status).to.equal(200);
      console.log("locBody: ", re.body);
      console.log("locBodyName: ", re.body.locationName);
      Cypress.env("pickUpLocation", re.body.locationName);
      cy.log("The location pick up is: ", Cypress.env('pickUpLocation'))
    });
    //drop off
    cy.request({
      method: "POST",
      url: `/web/location/api/v2/locations/create/location?organizationId=${Cypress.env(
        "originitionID"
      )}`,
      body: dropOffBody,
      headers: { "Mp-Auth-Token": Cypress.env("accessToken") },
      failOnStatusCode: false,
    }).then((res) => {
      //locationName we need to fetch from api
      expect(res.status).to.equal(200);
      console.log("locBody: ", res.body);
      console.log("locBodyName: ", res.body.locationName);
      Cypress.env("dropOffLocation", res.body.locationName);
      console.log("dropOff: ", Cypress.env("dropOffLocation"));
      cy.log("dropOff location name: ", Cypress.env("dropOffLocation"));
    });
  });
}
