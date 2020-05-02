(this["webpackJsonpcoronavirus-explorations"]=this["webpackJsonpcoronavirus-explorations"]||[]).push([[0],{154:function(t,e,a){t.exports=a(169)},169:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(21),i=a.n(o),c=a(24),u=a(19),l=a(192),s=a(94),m=Object(s.a)(),f=Object(s.a)({typography:{fontSize:16,h1:{fontSize:"3.25rem",fontWeight:300},h2:{fontSize:"2.75rem",fontWeight:300},h3:{fontSize:"2.25rem",fontWeight:400},h4:{fontSize:"2rem",fontWeight:400},h5:{fontSize:"1.5rem",fontWeight:400},h6:{fontSize:"1.25rem",fontWeight:500}},overrides:{MuiTypography:{root:{"blockquote&":{paddingLeft:m.spacing(3),borderLeft:"".concat(m.spacing(.5),"px solid ").concat(m.palette.primary.main),fontStyle:"italic"}}},MuiIcon:{root:{width:"1.25em",textAlign:"center"}}}}),d=a(95),p=a(28),h=a(186),g=a(187),b=a(188),v=a(189),E=a(195),w=a(190);var j=a(194),x=a(171),y=document.title;function O(t){var e=t.title,a=(t.subtitle,t.children),o=Object(p.a)(t,["title","subtitle","children"]);return Object(n.useEffect)((function(){document.title="".concat(e," | ").concat(y)}),[e]),r.a.createElement(x.a,null,r.a.createElement(j.a,Object.assign({p:3},o),e&&r.a.createElement(b.a,{variant:"h1",gutterBottom:!0},e),a))}var k=a(191);var q=a(50),S=a(5),B=a.n(S),L=a(10),W=a(49),z=a.n(W),I=a(93),M=a(96);function T(t){var e=t.split("\n").map((function(t){return t.trim().split(",")})),a=Object(M.a)(e),n=a[0];return a.slice(1).map((function(t){return t.reduce((function(t,e,a){return t[n[a]]=function(t){if(t.match(/^[+-]?[0-9]+(\.[0-9]+)?$/))return parseFloat(t);if(t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))return new Date(t);return t}(e),t}),{})}))}var D={states:function(){var t=Object(I.a)(z.a.mark((function t(){var e,a,n;return z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv");case 2:return e=t.sent,t.next=5,e.text();case 5:return a=t.sent,n=T(a),t.abrupt("return",n);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()};function G(t){var e=B.a.findIndex((function(t){return 0===t.date.getDay()}),t),a=e+7*Math.floor((t.length-e)/7),n=null,r=B.a.flow([B.a.slice(e,a+1),B.a.filter(_(7)),B.a.map((function(t){var e=t.date,a=t.cases;if(null===n)return n=a,null;var r=n;return n=a,{date:e,total:a,growth:a-r}})),B.a.compact])(t),o=a<t.length-1&&function(){var e=B.a.last(r),n=B.a.last(t),o=7/(t.length-a-1),i=n.cases-e.total;return B.a.compact([{date:n.date,total:n.cases,growth:e.growth*(1-1/o)+i,type:"intermediate"},!1])}();return o?B.a.concat(r,o):r}function P(t){return L.a("svg:path").attr("d",t).node().getTotalLength()}function U(t,e,a){var n=P(t(e)),r=L.f().domain(L.c(a,(function(t){return t.date}))).range([0,1]),o=L.f().domain([0,n]).range([0,1]),i=L.f().domain(e.map((function(t){return r(t.date)}))).range(e.map((function(a,n){return o(P(t(e.slice(0,n))))})));return function(t){t&&L.j(t).attr("stroke-dasharray","0,".concat(n)).transition().duration(5e3).ease(i).attr("stroke-dasharray","".concat(n,",").concat(n))}}function _(t){var e=0;return function(){return e++%t===0}}i.a.render(r.a.createElement(c.a,{basename:"/coronavirus-explorations"},r.a.createElement(l.a,{theme:f},r.a.createElement((function(t){var e=t.title,a=t.tabs,n=t.children,o=Object(p.a)(t,["title","tabs","children"]),i=Object(u.f)().pathname,l=a.findIndex((function(t){var e=t.to,a=Object(p.a)(t,["to"]);return Object(u.e)(i,Object(d.a)({path:e},a))}));return r.a.createElement(h.a,Object.assign({maxWidth:"md"},o),r.a.createElement(g.a,null),r.a.createElement(b.a,{variant:"h1",gutterBottom:!0},e),r.a.createElement(v.a,{position:"static"},r.a.createElement(E.a,{"aria-label":"navigation",value:!(l<0)&&l},a.map((function(t){var e=t.label,a=t.to;return r.a.createElement(w.a,{key:a,component:c.b,to:a,label:e})})))),n)}),{title:"Coronavirus Explorations",tabs:[{label:"Info",to:"/",exact:!0},{label:"Trajectory",to:"/trajectory"}]},r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",exact:!0},r.a.createElement((function(){return r.a.createElement(O,{title:"Project Information"},r.a.createElement(b.a,{paragraph:!0},"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement(b.a,{component:"blockquote"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."))}),null)),r.a.createElement(u.a,{path:"/trajectory"},r.a.createElement((function(){var t=Object(n.useState)(null),e=Object(q.a)(t,2),a=e[0],o=e[1];if(Object(n.useEffect)((function(){(function(t){if(!D[t])throw new Error("Unknown source: ".concat(t));return D[t]()})("states").then((function(t){o(B.a.flow([B.a.groupBy("state"),B.a.mapValues(G),B.a.set("_",B.a.flow([B.a.groupBy("date"),B.a.values,B.a.map((function(t){return{date:t[0].date,cases:B.a.flow([B.a.map(B.a.get("cases")),B.a.sum])(t),deaths:B.a.flow([B.a.map(B.a.get("deaths")),B.a.sum])(t)}})),G])(t))])(t))}))}),[]),!a)return null;var i=a._,c=Math.round((Math.sqrt(5)-1)/2*864),u=20,l=20,s=30,m=40,f=function(t){return Math.max(t.total,1)},d=function(t){return Math.max(t.growth,1)},p=L.g().domain([1,L.e(i,f)]).range([m,864-l]),h=L.g().domain([1,L.e(i,d)]).range([c-s,u]),g=L.h(L.i).domain(Object.keys(a)),v=L.d().curve(L.b).x((function(t){return p(f(t))})).y((function(t){return h(d(t))}));return r.a.createElement(O,{title:"Growth Per Infection"},r.a.createElement("svg",{viewBox:[0,0,864,c]},Object.entries(a).map((function(t){var e=Object(q.a)(t,2),a=e[0],n=e[1];return r.a.createElement("path",{key:a,state:a,fill:"none",stroke:g(a),strokeWidth:"2.5",strokeLinejoin:"round",strokeLinecap:"round",d:v(n),ref:U(v,n,i)})}))),r.a.createElement(b.a,{component:"blockquote"},"Based on ",r.a.createElement("a",{href:"https://www.youtube.com/watch?v=54XLXg4fYsc",target:"_blank",rel:"noopener noreferrer"},"the methods of Grant Sanderson and Aatish Bhatia"),"."))}),null)),r.a.createElement(u.a,null,r.a.createElement((function(){return r.a.createElement(O,{title:"Oops! Page Not Found"},r.a.createElement(b.a,{paragraph:!0},"Something went wrong. The page you are looking for could not be found."),r.a.createElement(b.a,{paragraph:!0},r.a.createElement(k.a,{variant:"contained",color:"primary",component:c.b,to:"/"},"Go Home")))}),null)))))),document.getElementById("root"))}},[[154,1,2]]]);
//# sourceMappingURL=main.c732b40f.chunk.js.map