module.exports = function module_exists (name) {
  /**
   * This is UGLY but since we're not allowed to require 'native_module'
   * this is the only way to test if a native module (or non-native module) exist.
   */
  try{
    require(name)
  } catch(err) {
    if(err.code === 'MODULE_NOT_FOUND') {
      return false
    }
  }

  return true
}
