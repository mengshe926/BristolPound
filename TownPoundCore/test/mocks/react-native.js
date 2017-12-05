import React from 'react'

class ListViewDataSource {
  constructor () {
    this._dataBlob = null
  }

  getRowCount () {}

  cloneWithRows (data) {
    const newSource = new ListViewDataSource()
    newSource._dataBlob = data
    return newSource
  }

  cloneWithRowsAndSections (data) {
    const newSource = new ListViewDataSource()
    newSource._dataBlob = data
    return newSource
  }
}

function mockViewComponent (type) {
  const Component = React.createClass({
    displayName: type,
    propTypes: {
      children: React.PropTypes.node
    },
    render () {
      return <div {...this.props}>{this.props.children}</div>
    }
  })

  return Component
}

function mockListViewComponent () {
  const ListView = React.createClass({
    propTypes: {
      dataSource: React.PropTypes.instanceOf(ListViewDataSource),
      renderSeparator: React.PropTypes.func,
      renderRow: React.PropTypes.func,
      removeClippedSubviews: React.PropTypes.bool
    },

    statics: {
      DataSource: ListViewDataSource
    },

    render () {
      return null
    }
  })
  return ListView
}

const MockDimensions = {
  get (target) {
    return {width: 100, height: 100}
  }
}

const MockNetInfo = {
  fetch () {
    var promise = {done: (func)=>{
    }}
    return promise
  }
}

var ReactNative = {
  ...React,
  View: mockViewComponent('View'),
  Text: mockViewComponent('Text'),
  TouchableHighlight: mockViewComponent('TouchableHighlight'),
  Component: mockViewComponent('Component'),
  ScrollView: mockViewComponent('ScrollView'),
  TextInput: mockViewComponent('TextInput'),
  ListView: mockListViewComponent(),
  StyleSheet: {
    create: (ss) => ss
  },
  Platform: {
    OS: 'ios'
  },
  Dimensions: MockDimensions,
  NetInfo: MockNetInfo,
  PropTypes: React.PropTypes
}

module.exports = ReactNative
