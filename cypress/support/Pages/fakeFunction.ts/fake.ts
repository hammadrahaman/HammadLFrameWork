const { faker } = require("@faker-js/faker");

export function fake(fieldName) {
  var fieldName: any;
  switch (fieldName) {
    case "phone":
      return faker.phone
        .number()
        .replace(/(ext|\d{3})/g, "")
        .trim();
    case "email":
      return faker.internet.email();
    case "fullName":
      return faker.person.fullName();
    case "name":
      return faker.person.fullName();
    case "fullAddress":
      return faker.location.country();
    case "address":
      return faker.location.streetAddress();
    case "city":
      return faker.location.city();
    case "streetAddress":
      return faker.location.streetAddress();
    case "streetAddress2":
      return;
    case "zip":
      return faker.location.zipCode();
    case "location":
      return faker.location.city();
    case "locationName":
      return faker.location.cityName();
    default:
      return null; // Handle unknown field names
  }
}

module.exports = fake;
