define("js/lib/require.memoize",["module"],function(module){function argsToJsonHasher(){var r=Array.prototype.slice.call(arguments);return JSON.stringify(r)}function memoize(e,t){var n={};t=t||argsToJsonHasher;var r=function memoized(){var r=t.apply(this,arguments);return r in n||(n[r]=e.apply(this,arguments)),n[r]};return r.force=function(){return r.clear.apply(this,arguments),r.apply(this,arguments)},r.clear=function(){var r=t.apply(this,arguments);delete n[r]},r.reset=function(){n={}},r}var r={version:"0.0.1",load:function load(r,n,t,e){n([r],function(r){t(memoize(r))})}};return r});
define("nls/page",["require","exports","module"],function(require,exports,module){module.exports={es:!0,fr:!0,pseudo:!0,pt:!0,ru:!0,tr:!0,zh:!0,"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-tw":!0}});

define("js/json/nls/specializations",["require","exports","module"],function(require,exports,module){module.exports={es:!0,fr:!0,pt:!0,ru:!0,tr:!0,zh:!0,"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-tw":!0}});
define("js/json/nls/universities",["require","exports","module"],function(require,exports,module){module.exports={es:!0,fr:!0,pt:!0,ru:!0,tr:!0,zh:!0,"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-tw":!0}});
define("js/json/nls/languages",["require","exports","module"],function(require,exports,module){module.exports={es:!0,fr:!0,pt:!0,ru:!0,tr:!0,zh:!0,"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-tw":!0}});
define("js/json/nls/topics",["require","exports","module"],function(require,exports,module){module.exports={es:!0,fr:!0,pt:!0,ru:!0,tr:!0,zh:!0,"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-tw":!0}});
define("bundles/ondemand/bootstrapPromise",["require","exports","module","q","pages/open-course/common/constants","bundles/catalogP/models/s12n","bundles/s12n-common/service/promises/s12nForCoursePromiseFactory","pages/open-course/common/promises/course"],function(require,exports,module){var o=require("q"),e=require("pages/open-course/common/constants"),s=require("bundles/catalogP/models/s12n"),n=require("bundles/s12n-common/service/promises/s12nForCoursePromiseFactory"),r=require("pages/open-course/common/promises/course");module.exports=function(u){var t=r.fromSlug(u).then(function(e){return e.get("id")}),c=t.then(n).then(function(o){var e=o.elements;if(e.length>0){var n=new s(e[0]);return n}return null});return o.all([t,c]).spread(function(o,s){return e.courseId=o,e.courseSlug=u,{courseId:o,s12n:s}})}});
define("bundles/ondemand/actions/BootstrapActions",["require","exports","module","q","bundles/ondemand/bootstrapPromise","pages/open-course/common/promises/membership"],function(require,exports,module){var e=require("q"),o=require("bundles/ondemand/bootstrapPromise"),r=require("pages/open-course/common/promises/membership");exports.loadBootstrapData=function(s,n){var t=n.userId,a=n.courseSlug;if(s.getStore("BootstrapStore").hasLoaded())return e();return o(a).then(function(o){var e=o.courseId;return r(t,e).then(function(r){var o=r.hasEnrolledRole();return s.dispatch("LOAD_BOOTSTRAP_DATA",{courseId:e,isEnrolled:o}),{courseId:e,isEnrolled:o}})})}});
define("bundles/ondemand/components/UnauthorizedRedirectApp",["require","exports","module","react","js/lib/user","underscore","vendor/cnpm/fluxible.v0-4/addons/connectToStores","js/lib/connectToFluxibleContext","js/lib/waitFor","js/lib/connectToRouter","js/lib/coursera.redirect","bundles/ondemand/actions/BootstrapActions"],function(require,exports,module){function _defaults(e,n){for(var s=Object.getOwnPropertyNames(n),o=0;o<s.length;o++){var t=s[o],r=Object.getOwnPropertyDescriptor(n,t);r&&r.configurable&&void 0===e[t]&&Object.defineProperty(e,t,r)}return e}function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(o,e){if(!o)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?o:e}function _inherits(o,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);o.prototype=Object.create(e&&e.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(o,e):_defaults(o,e))}var o,t,e=require("react"),r=require("js/lib/user"),s=require("underscore"),n=s.compose,i=require("vendor/cnpm/fluxible.v0-4/addons/connectToStores"),c=require("js/lib/connectToFluxibleContext"),u=require("js/lib/waitFor"),a=require("js/lib/connectToRouter"),l=require("js/lib/coursera.redirect"),p=require("bundles/ondemand/actions/BootstrapActions"),d=p.loadBootstrapData,f=(t=o=function(o){function UnauthorizedRedirectApp(e,n){_classCallCheck(this,UnauthorizedRedirectApp);var t=_possibleConstructorReturn(this,o.call(this,e,n));return t.state={isAuthorized:e.isEnrolled||r.isSuperuser()},t}return _inherits(UnauthorizedRedirectApp,o),UnauthorizedRedirectApp.prototype.componentDidMount=function componentDidMount(){this.state.isAuthorized||l.setLocation("/learn/"+this.props.courseSlug)},UnauthorizedRedirectApp.prototype.render=function render(){var t=this.state.isAuthorized,o=this.props,r=o.courseId,n=o.courseSlug,s=o.children;if(!t)return null;return e.createElement("div",null,e.cloneElement(s,{courseId:r,courseSlug:n}))},UnauthorizedRedirectApp}(e.Component),o.propTypes={children:e.PropTypes.node,courseId:e.PropTypes.string,courseSlug:e.PropTypes.string,isEnrolled:e.PropTypes.bool},t);module.exports=n(a(function(e,o){return{courseSlug:e.params.courseSlug}}),i(["BootstrapStore"],function(o){var e=o.BootstrapStore;return{courseId:e.getCourseId(),isEnrolled:e.isEnrolledMembership(),bootstrapDataHasLoaded:e.hasLoaded()}}),c(function(e,o){var t=o.courseSlug,n=r.get().id;e.executeAction(d,{userId:n,courseSlug:t})}),u(function(e){var o=e.bootstrapDataHasLoaded;return o}))(f)});