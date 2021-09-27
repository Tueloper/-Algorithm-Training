const searchObjects = {
  Users: ['id', 'accountType', 'email', 'isVerified', 'finishedSetUp', 'signedWaiver'],
  Supports: ['id', 'userId', 'isAvailable', 'type'],
  Profiles: ['id', 'userId', 'username', 'phoneNumber', 'dob', 'gender', 'maritalStatus', 'firstName', 'lastName', 'addressId', 'longitude', 'latitude', 'state', 'city', 'zipCode', 'interests', 'customInterests'],
  Children: ['id', 'userId', 'username', 'preferredName', 'dob', 'gender', 'maritalStatus', 'firstName', 'lastName', 'schoolId', 'schoolLongitude', 'schoolLatitude', 'schoolName', 'schoolCity', 'schoolZipCode', 'interests', 'customInterests'],
};


const strValues = (matter) => {
  return console.log(`"${matter.join(" || ' ' || ")}"`)
}

strValues(searchObjects["Users"]);
