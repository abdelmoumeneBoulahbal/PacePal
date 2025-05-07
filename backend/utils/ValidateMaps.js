function isValidGoogleMapsLink(link) {
    const googleMapsRegex = /^(https?:\/\/)?(www\.)?google\.com\/maps\/.+$/i;
    const googleMapsShortRegex = /^(https?:\/\/)?goo\.gl\/maps\/.+$/i;
    const googleMapsMobileRegex = /^(https?:\/\/)?(www\.)?google\.com\/maps\/@.+$/i;
  
    return (
      googleMapsRegex.test(link) ||
      googleMapsShortRegex.test(link) ||
      googleMapsMobileRegex.test(link)
    );
  }

  export default isValidGoogleMapsLink;