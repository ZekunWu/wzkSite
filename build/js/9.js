(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{652:function(e,n,r){},654:function(e,n,r){e.exports={"next-sr-only":"Guide--next-sr-only--uUGNMXG",container:"Guide--container--3MZCQt_",title:"Guide--title--2yo7heJ",description:"Guide--description--2nP4HnW",action:"Guide--action--1mVPMiw"}},874:function(e,n,r){"use strict";r.r(n);var a=r(652),t=r(5),i=r.n(t),o=r(6),c=r.n(o),s=r(7),p=r.n(s),l=r(4),f=r.n(l),u=r(23),d=r.n(u),m=r(1),g=r.n(m),y=r(0),h=r.n(y),v=r(9),b=r.n(v),w=r(15),x=r(2),k=x.j.isPlainObject;function E(e){if(!k(e))return e;var n={};return Object.keys(e).forEach((function(r){var a=e[r];void 0!==a&&(n[r]=a)})),n}function O(e,n){var r={};return Object.keys(e).forEach((function(a){a in n||(r[a]=e[a])})),r}var j=x.c.ieVersion,T=function e(n){if(!Array.isArray(n))return{padding:n};var r,a={},t=void 0;return["paddingTop","paddingRight","paddingBottom","paddingLeft"].forEach((function(e,r){switch(n.length){case 1:t=n[0]||0;break;case 2:t=n[r]||n[r-2]||0;break;case 3:t=2===r?n[2]:n[r]||n[r-2]||0;break;case 4:default:t=n[r]||0}a[e]=t})),a},N=function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{isNegative:!1,half:!1},a=r.isNegative,t=r.half;if(!n)return{};var i=["marginTop","marginRight","marginBottom","marginLeft"],o={},c=1*(a?-1:1)*(t?.5:1),s=void 0;return i.forEach((function(e,r){if(Array.isArray(n))switch(n.length){case 1:s=c*(n[0]||0);break;case 2:s=c*(n[r]||n[r-2]||0);break;case 3:s=c*(2===r?n[2]:n[r]||n[r-2]||0);break;case 4:default:s=c*(n[r]||0)}else s=c*n;o[e]=s})),o},S=function e(n){return N(n,{half:!0})},A=function e(n){return N(n,{half:!0})},C=function e(n){return N(n,{isNegative:!0,half:!0})},_=function e(n){if(!Array.isArray(n))return{flex:n};var r=["flexGrow","flexShrink","flexBasis"],a={};return n.forEach((function(e,n){a[r[n]]=e})),a},G=function e(n){if(!Array.isArray(n))return{gap:n};var r=["rowGap","columnGap"],a={};return n.forEach((function(e,n){a[r[n]]=e})),a},R=function e(n){return isNaN(n)&&"string"!=typeof n?n:"repeat("+n+", minmax(0,1fr))"},B=["margin","marginTop","marginLeft","marginRight","marginBottom"],M=["flexDirection","flexWrap","alignContent","alignItems","display"],P=function e(n){var r={};return[].concat(M).forEach((function(e){r[e]=n[e]})),E(O(n,r))},F=function e(n){var r={};return B.forEach((function(e){r[e]=n[e]})),E(f()({},r,{overflow:"hidden"}))},L=function e(n){var r={};return M.forEach((function(e){r[e]=n[e]})),E(r)},V=function e(n,r,a){var t=n.row,i=void 0===t?"initial":t,o=n.col,c=void 0===o?"initial":o,s=n.rowSpan,p=void 0===s?1:s,l=n.colSpan,u=void 0===l?1:l,m=12,g="object"===(void 0===u?"undefined":d()(u))&&"desktop"in u?u.desktop:u;["tablet","phone"].forEach((function(e){if(e===r)if("object"===(void 0===u?"undefined":d()(u))&&r in u)g=u[r];else switch(e){case"tablet":m=8,g=u>5?8:u>2?4:2;break;case"phone":m=4,g=u>2?4:2}}));var y=a;Array.isArray(a)&&(y=a[1]);var h=!j||1===p&&1===u?{}:{display:"inline-block",width:y?"calc("+g/m*100+"% - "+y+"px)":g/m*100+"%"};return E(f()({gridRowStart:i,gridRowEnd:"span "+p,gridColumnStart:c,gridColumnEnd:"span "+g},h))},W=function e(n){var r=n.alignSelf,a=n.flex;return E(f()({alignSelf:r},_(a)))},D=function(e){var n=e.device,r=e.display,a=e.gap,t=e.direction,i=e.dense,o=e.rowSpan,c=e.colSpan,s=e.row,p=e.col,l=e.rows,u=e.columns,d=e.justify,m=e.align,g=e.alignSelf,y=e.wrap,h=e.flex,v=e.padding,b=e.margin,w=f()({},T(v)),x="auto";switch(n){case"phone":x=4;break;case"tablet":x=8;break;case"desktop":x=12}var k=isNaN(u)&&"string"!=typeof u?x:u;switch(r){case"grid":w=f()({},G(a),{gridTemplateRows:R(l),gridTemplateColumns:R(k),gridAutoFlow:""+(t||"")+(i&&" dense")},V({row:s,rowSpan:o,col:p,colSpan:c},n),w);break;case"flex":w=f()({msFlexDirection:t,flexDirection:t,msFlexWrap:y?"wrap":"none",flexWrap:y?"wrap":"nowrap",msFlexPack:d,justifyContent:d,msFlexAlign:m,alignItems:m},N(b),W({alignSelf:g,flex:h}),w)}return E(w)},J,z,H=x.j.pickOthers,I=function e(n,r){var a=r.spacing,t=r.direction,i=r.wrap,o=r.device,c=g.a.Children.toArray(n);return n?c.map((function(e,n){var r={};if(r=S(a),!i){var o=[0===n,n===c.length-1],s="row"===t?["marginLeft","marginRight"]:["marginTop","marginBottom"];["marginTop","marginRight","marginBottom","marginLeft"].forEach((function(e){e in r&&-1===s.indexOf(e)&&(r[e]=0),s.forEach((function(e,n){e in r&&o[n]&&(r[e]=0)}))}))}if(g.a.isValidElement(e)){var p=e.props.margin,l=N(p),u={};return["function","object"].indexOf(d()(e.type))>-1&&"responsive_grid"===e.type._typeMark&&(u=D(f()({display:"grid"},e.props))),g.a.cloneElement(e,{style:f()({},r,l,u,e.props.style||{})})}return e})):null},Q=function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];return f()({},D(f()({display:"flex"},r)),n)},U=function e(n,r){var a=Q(n,r);return P(a)},X=function e(n,r){var a=Q(n,r);return F(f()({},a,C(r.spacing)))},Z=function e(n,r){var a=Q(n,r);return L(a)},q=(z=J=function(e){function n(){return i()(this,n),c()(this,e.apply(this,arguments))}return p()(n,e),n.prototype.render=function e(){var r,a=this.props,t=a.prefix,i=a.direction,o=a.justify,c=a.align,s=a.wrap,p=a.flex,l=a.spacing,u=a.padding,d=a.margin,m=a.style,y=a.className,h=a.children,v=a.device,w,x={direction:i,justify:o,align:c,wrap:s,flex:p,spacing:l,padding:u,margin:d},k=a.component,E=H(Object.keys(n.propTypes),this.props),O=Q(m,x),j=I(h,{spacing:l,direction:i,wrap:s,device:v}),T=b()(((r={})[t+"box"]=!0,r),y);if(s&&l){var N=U(m,x),S=X(m,x),A=Z(m,x);return g.a.createElement(k,f()({style:N,className:T},E),g.a.createElement("div",{style:S},g.a.createElement("div",{style:A,className:t+"box"},j)))}return g.a.createElement(k,f()({style:O,className:T},E),j)},n}(m.Component),J.propTypes={prefix:h.a.string,style:h.a.object,className:h.a.any,flex:h.a.oneOfType([h.a.arrayOf(h.a.oneOfType([h.a.number,h.a.string])),h.a.number]),direction:h.a.oneOf(["row","column","row-reverse"]),wrap:h.a.bool,spacing:h.a.oneOfType([h.a.arrayOf(h.a.number),h.a.number]),margin:h.a.oneOfType([h.a.arrayOf(h.a.number),h.a.number]),padding:h.a.oneOfType([h.a.arrayOf(h.a.number),h.a.number]),justify:h.a.oneOf(["flex-start","center","flex-end","space-between","space-around"]),align:h.a.oneOf(["flex-start","center","flex-end","baseline","stretch"]),device:h.a.oneOf(["phone","tablet","desktop"]),component:h.a.string},J.defaultProps={prefix:"next-",direction:"column",wrap:!1,component:"div"},z);q.displayName="Box";var K=w.a.config(q),Y,$,ee=x.j.pickOthers,ne=($=Y=function(e){function n(){return i()(this,n),c()(this,e.apply(this,arguments))}return p()(n,e),n.prototype.render=function e(){var r=this.props,a=r.component,t=r.children,i=ee(Object.keys(n.propTypes),this.props);return g.a.createElement(a,i,t)},n}(m.Component),Y._typeMark="responsive_grid_cell",Y.propTypes={device:h.a.oneOf(["phone","tablet","desktop"]),colSpan:h.a.oneOfType([h.a.number,h.a.object]),rowSpan:h.a.number,component:h.a.elementType},Y.defaultProps={component:"div",device:"desktop"},$);ne.displayName="Cell";var re=w.a.config(ne),ae,te,ie=x.c.ieVersion,oe=x.j.pickOthers,ce=x.j.isReactFragment,se=function e(n,r,a){var t=g.a.Children.toArray(n);return n?t.map((function(n){return ce(n)?e(n.props.children,r,a):g.a.isValidElement(n)&&["function","object"].indexOf(d()(n.type))>-1&&["form_item","responsive_grid_cell"].indexOf(n.type._typeMark)>-1?g.a.cloneElement(n,{style:f()({},V(n.props,r,a),n.props.style||{})}):n})):null},pe=function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];return f()({},D(f()({display:"grid"},r)),n)},le=(te=ae=function(e){function n(){return i()(this,n),c()(this,e.apply(this,arguments))}return p()(n,e),n.prototype.render=function e(){var r,a=this.props,t=a.prefix,i=a.component,o=a.style,c=a.className,s=a.children,p=a.device,l=a.rows,u=a.columns,d=a.gap,m,y,h,v,w={rows:l,columns:u,gap:d,device:p,rowSpan:a.rowSpan,colSpan:a.colSpan,component:a.component,dense:a.dense},x=oe(Object.keys(n.propTypes),this.props),k=pe(o,w),E=b()(((r={})[t+"responsive-grid"]=!0,r[t+"responsive-grid-ie"]=ie,r),c);return ie?g.a.createElement(K,f()({},this.props,{direction:"row",wrap:!0,spacing:d,children:se(s,p,d)})):g.a.createElement(i,f()({style:k,className:E},x),se(s,p,d))},n}(m.Component),ae._typeMark="responsive_grid",ae.propTypes={prefix:h.a.string,className:h.a.any,device:h.a.oneOf(["phone","tablet","desktop"]),rows:h.a.oneOfType([h.a.number,h.a.string]),columns:h.a.oneOfType([h.a.number,h.a.string]),gap:h.a.oneOfType([h.a.arrayOf(h.a.number),h.a.number]),component:h.a.elementType,dense:h.a.bool,style:h.a.object},ae.defaultProps={prefix:"next-",component:"div",device:"desktop",dense:!1},te);le.displayName="ResponsiveGrid",le.Cell=re;var fe=w.a.config(le),ue=r(640),de=r(644),me=r(654),ge=r.n(me),ye,he=function e(){return m.createElement("div",{className:ge.a.container},m.createElement("h2",{className:ge.a.title},"Welcome to icejs!"),m.createElement("p",{className:ge.a.description},"This is a awesome project, enjoy it!"),m.createElement("div",{className:ge.a.action},m.createElement("a",{href:"https://ice.work/docs/guide/about",target:"_blank",rel:"noopener noreferrer",style:{marginRight:20}},m.createElement(de.a,{type:"primary",size:"large"},"\u4f7f\u7528\u6587\u6863")),m.createElement("a",{href:"https://github.com/ice-lab/icejs",target:"_blank",rel:"noopener noreferrer"},m.createElement(de.a,{type:"secondary",size:"large"},"GitHub"))))},ve=fe.Cell,be=function e(){return g.a.createElement(fe,{gap:20},g.a.createElement(ve,{colSpan:12},g.a.createElement(he,null)))},we=n.default=be}}]);