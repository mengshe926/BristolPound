import _ from 'lodash'
import haversine from 'haversine'

const BUSINESS_LIST_MAX_LENGTH = 50

export const addColorCodes = (list) => {
    let colorCode = Math.floor(Math.random() * 4)
    _.forEach(list, (component) => {
        component.colorCode = colorCode % 4
        colorCode++
    })
    return list
}

const orderBusinessList = (viewport) => (business) => business.address.location ? haversine(viewport, business.address.location) : Number.MAX_VALUE

const isLocationWithinViewport = (location, viewport) => {
    const isCoordinateWithinViewport = (locationCoord, viewportCoord, delta) =>
        Math.abs(locationCoord - viewportCoord) < delta / 2

    return isCoordinateWithinViewport(location.latitude, viewport.latitude, viewport.latitudeDelta)
        &&  isCoordinateWithinViewport(location.longitude, viewport.longitude, viewport.longitudeDelta)
}

export const shouldBeDisplayed = (viewport) => (business) => business.address.location && isLocationWithinViewport(business.address.location, viewport)

const businessAtLocation = (location) => (business) => {
    let atLocation = false

    if (business.address.location) {
        const { latitude, longitude } = business.address.location
        atLocation = (latitude === location.latitude) && (longitude === location.longitude)
    }

    return atLocation
}

export const getClosestBusinesses = (list, viewport) => {
    const visibleBusinesses = _.filter(list, shouldBeDisplayed(viewport))
    if (_.size(visibleBusinesses) > BUSINESS_LIST_MAX_LENGTH) {
      return []
    }
    const closestBusinesses = _.sortBy(
        visibleBusinesses,
        orderBusinessList(viewport)
    )
    return addColorCodes(closestBusinesses)
}

export const offsetOverlappingBusinesses = (businesses) => {
    var index = 0
    _.each(businesses, (business)=> {
        if (business.address.location) {
            business.address.location.longitude = parseFloat(business.address.location.longitude)
            business.address.location.latitude = parseFloat(business.address.location.latitude)
            const previousBusinesses = (_.values(businesses)).slice(0, index)
            while (previousBusinesses.find(businessAtLocation(business.address.location))) {
                business.address.location.longitude -= 0.00002
                business.address.location.latitude += 0.00001
            }
        }
        index++
        business.colorCode = 0
    })
    return businesses
}

const hasCategory = (category) => (business) => business.mainCategories.includes(category)

const hasExclusiveCategory = (activeFilters, category) => (business) => business.mainCategories.includes(category) && _.every(activeFilters, (filter) => !business.mainCategories.includes(filter))

export const getBusinessesByFilter = (businesses, category) => {
    return _.filter(businesses, hasCategory(category))
}

export const getBusinessesByExclusiveFilter = (businesses, activeFilters, category) => {
    return _.filter(businesses, hasExclusiveCategory(activeFilters, category))
}

export const isIncorrectLocation = (location) => {
    return _.inRange(location.longitude, -0.01, 0.01) && _.inRange(location.latitude, -0.01, 0.01)
  }
