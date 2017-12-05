/**
 * Utility functions for handling address objects.
 * An address is expected to contain:
 *   addressLine1: string,
 *   addressLine2: string, (optional)
 *   zip: string
 *
 *   A full list of potentially available data can be found at:
 *   https://bristol.cyclos.org/bristolpoundsandbox03/api#!/Addresses/viewAddress
 */

function addressToString (address) {
	const addressLine2 = [address.buildingNumber, address.street].filter(a => a).join(', ')
  	return [address.addressLine1, addressLine2, address.addressLine3, address.townOrCity, address.postcode]
    	.filter(a => a)
    	.join(', ')
}

export default addressToString

