import merge from './merge'

const layoutDimensions = (top, right = top, bottom = top, left = right, property) => {
    let styles = {}

    styles[`${property}Top`] = top
    styles[`${property}Right`] = right
    styles[`${property}Bottom`] = bottom
    styles[`${property}Left`] = left

    return styles
}

export const border = (position, color, width) => {
    let border = {}

    position.forEach(value => {
        const borderPosition = value.charAt(0).toUpperCase() + value.slice(1)
        border[`border${borderPosition}Color`] = color
        border[`border${borderPosition}Width`] = width
    })

    return border
}

export const sectionHeight = 68

export const horizontalAbsolutePosition = (right, left) => ({ position: 'absolute', right, left })

export const verticalAbsolutePosition = (top, bottom) => ({ position: 'absolute', top, bottom })

export const absolutePosition = (top = 0, right = 0, bottom = 0, left = 0) => merge(horizontalAbsolutePosition(right, left), verticalAbsolutePosition(top, bottom))

export const dimensions = (width, height = width) => ({ width, height })

export const margin = (top, right, bottom, left) =>
    layoutDimensions(top, right, bottom, left, 'margin')

export const padding = (top, right, bottom, left) =>
    layoutDimensions(top, right, bottom, left, 'padding')
