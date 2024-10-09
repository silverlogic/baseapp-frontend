"use strict";(self.webpackChunk_baseapp_frontend_components=self.webpackChunk_baseapp_frontend_components||[]).push([[770],{"./modules/social/Timestamp/__storybook__/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultTimestamp:()=>DefaultTimestamp,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"@baseapp-frontend | components/Social/Timestamp",component:__webpack_require__("./modules/social/Timestamp/index.tsx").A,tags:["autodocs"],argTypes:{date:{name:"date",description:"The date to be formatted.",control:"text",table:{type:{summary:"string"}}}}};var DefaultTimestamp={name:"Default Timestamp",args:{date:"2024-07-17T11:42:55.508653+00:00"}}},"./modules/social/Timestamp/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _baseapp_frontend_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../utils/index.ts"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js"),luxon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/luxon/src/luxon.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Timestamp=function Timestamp(_ref){var date=_ref.date,dateTime=luxon__WEBPACK_IMPORTED_MODULE_1__.c9.fromISO(date),isToday=dateTime.hasSame(luxon__WEBPACK_IMPORTED_MODULE_1__.c9.now(),"day");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.A,{variant:"caption",color:"text.secondary",display:"flex",alignItems:"center",children:[isToday?"Today":(0,_baseapp_frontend_utils__WEBPACK_IMPORTED_MODULE_0__.Yq)(dateTime,{toFormat:_baseapp_frontend_utils__WEBPACK_IMPORTED_MODULE_0__.G$[3]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"mx-2 inline-block h-1 w-1 rounded-full bg-text-disabled"}),(0,_baseapp_frontend_utils__WEBPACK_IMPORTED_MODULE_0__.Yq)(dateTime,{toFormat:_baseapp_frontend_utils__WEBPACK_IMPORTED_MODULE_0__.DX[2]})]})};const __WEBPACK_DEFAULT_EXPORT__=Timestamp;Timestamp.__docgenInfo={description:"",methods:[],displayName:"Timestamp",props:{date:{required:!0,tsType:{name:"string"},description:""}}}}}]);