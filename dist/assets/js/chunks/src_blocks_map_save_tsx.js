"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksg_blocks"] = self["webpackChunksg_blocks"] || []).push([["src_blocks_map_save_tsx"],{

/***/ "./src/blocks/map/save.tsx":
/*!*********************************!*\
  !*** ./src/blocks/map/save.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Save = function Save(_ref) {\n  var attributes = _ref.attributes;\n  var scriptContent = \"window.sgMaps = Object.assign({}, window.sgMaps, { '\".concat(attributes.id, \"':{lat: \").concat(attributes.lat, \", lng: \").concat(attributes.lng, \", zoom: \").concat(attributes.zoom, \", address: '\").concat(attributes.address, \"'}});\");\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: attributes.id,\n    className: \"sg-map\".concat(attributes.className ? \" \" + attributes.className : \"\")\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"sg-map__container\"\n  })), !attributes.meta_meeting_point && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"script\", {\n    type: \"text/javascript\",\n    dangerouslySetInnerHTML: {\n      __html: scriptContent\n    }\n  }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);\n\n//# sourceURL=webpack://sg-blocks/./src/blocks/map/save.tsx?");

/***/ })

}]);