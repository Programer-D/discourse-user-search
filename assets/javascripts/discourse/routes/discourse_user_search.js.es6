/**
 * Route for the path `/evidence_uploader` as defined in `../discourse_user_search-route-map.js.es6`.
 */
export default Discourse.Route.extend({
  renderTemplate() {
    this.render('discourse_user_search');
  }
});
