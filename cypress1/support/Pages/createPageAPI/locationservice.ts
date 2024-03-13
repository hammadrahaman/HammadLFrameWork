/// <reference types="cypress" />
const fake = require('../fakeFunction.ts/fake');

class LocationData {
    pickUpFullAddress: any;
    pickUpLogitude: any;
    pickUpLatitude: any;
    pickUpZip: any;
    pickUpCountry: any;
    pickUpState: any;
    pickUpCity: any;
    dropOffFullAddress: any;
    dropOffLongitude: any;
    dropOffLatitude: any;
    dropOffZip: any;
    dropOffCountry: any;
    dropOffState: any;
    dropOffCity: any;

    async glocation() {
        const response =  cy.request({
            method: 'GET',
            url: `https://singlesearch.alk.com/NA/api/search?authToken=C262376E2A14FD4B88180F8B75A11E46&countryType=ISO&getAllHNRanges=false&maxResults=25&query=${fake(
                'location'
            )}&include=Meta&countries=US,%20CA,MX&useCustomPlaces=false&excludeResultsFor=RouteAlpha,POI,POIStreet,POIType,CustomPlace,CrossStreet,LatLon`,
            failOnStatusCode: false,
        })
        //@ts-ignore
        console.log('body: ', response.body);
        //@ts-ignore
        console.log('location: ', response.body.Locations);
        //@ts-ignore
        const locData = response.body.Locations;

        if (locData.length === 0 || locData < 1) {
            this.glocation();
        } else {
            this.pickUpCountry = locData[0].Address.CountryFullName;
            this.pickUpFullAddress = locData[0].ShortString;
            this.pickUpLatitude = locData[0].StreetCoords.Lat;
            this.pickUpLogitude = locData[0].StreetCoords.Lon;
            this.pickUpState = locData[0].Address.State;
            this.pickUpCity = locData[0].Address.City;
            this.dropOffZip = locData[1].Address.Zip;
            this.dropOffCountry = locData[1].Address.CountryFullName;
            this.dropOffFullAddress = locData[1].ShortString;
            this.dropOffLatitude = locData[1].StreetCoords.Lat;
            this.dropOffLongitude = locData[1].StreetCoords.Lon;
            this.dropOffState = locData[1].Address.State;
            this.dropOffCity = locData[1].Address.City;

            console.log(
                'firstLocation: ',
                locData[0],
                'fullAddress: ',
                locData[0].ShortString,
                'firstLocationAddress: ',
                locData[0].Address
            );
            console.log(
                'lattitudeLogitude: ',
                locData[0].StreetCoords.Lat,
                ' lon: ',
                locData[0].StreetCoords.Lon,
                ' zip: ',
                locData[0].Address.Zip
            );
        }

        const pickUpBody = {
            contacts: [
                {
                    fullName: fake('name'),
                    email: fake('email'),
                    phoneData: {
                        countryCode: 'USA',
                        phone: 9741160846,
                    },
                    description: 'created through API',
                    isPrimary: true,
                },
            ],
            avgHandlingTime: 120,
            addressDTO: {
                state: this.pickUpState,
                city: this.pickUpCity,
                streetAddress2: null,
                streetAddress: null,
                address: this.pickUpFullAddress,
                fullAddress: '',
                center: {
                    lat: this.pickUpLatitude,
                    lng: this.pickUpLogitude,
                },
                zipcode: locData[0].Address.Zip,
            },
            notes: null,
            locationName: fake('locationName'),
            locationPreference: 2,
        };

        const dropOffBody = {
            contacts: [
                {
                    fullName: fake('name'),
                    email: fake('email'),
                    phoneData: {
                        countryCode: 'USA',
                        phone: 9741160846,
                    },
                    description: 'created through API',
                    isPrimary: true,
                },
            ],
            avgHandlingTime: 120,
            addressDTO: {
                state: this.dropOffState,
                city: this.dropOffCity,
                streetAddress2: null,
                streetAddress: null,
                address: this.dropOffFullAddress,
                fullAddress: '',
                center: {
                    lat: this.dropOffLatitude,
                    lng: this.dropOffLongitude,
                },
                zipcode: this.dropOffZip,
            },
            notes: null,
            locationName: fake('locationName'),
            locationPreference: 2,
        };

        return { dropOffBody, pickUpBody };
    }
}

const locationInstance = new LocationData();

module.exports = locationInstance;
