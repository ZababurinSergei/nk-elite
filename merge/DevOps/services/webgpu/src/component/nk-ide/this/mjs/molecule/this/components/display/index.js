var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
const Display = (props) => {
    const { visible = true, children, className, style = {} } = props, rest = __rest(props, ["visible", "children", "className", "style"]);
    return (React.createElement("div", Object.assign({ className: className, style: Object.assign({ display: visible ? undefined : 'none' }, style) }, rest), children));
};
export default Display;