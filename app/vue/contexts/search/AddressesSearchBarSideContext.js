import AddressesSearchBarContext from '~/app/vue/contexts/search/AddressesSearchBarContext'

export default class AddressesSearchBarSideContext extends AddressesSearchBarContext {
  /**
   * Generate classes for the search bar element.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateSearchClasses () {
    return {
      'no-results': this.addresses.length === 0,
      loading: this.isLoading,
    }
  }
}
