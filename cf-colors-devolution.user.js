// ==UserScript==
// @id             cf-colors-devolution
// @name           CF de-Revolution of Colors
// @version        0.1.2
// @namespace      https://github.com/noxwell/cf-colors-devolution
// @updateURL      https://noxwell.github.io/files/cf-colors-devolution.meta.js
// @downloadURL    https://noxwell.github.io/files/cf-colors-devolution.user.js
// @description    This userscript adds ability to view user's profiles in CodeForces as it was before Revolution of Colors.
// @include        https://codeforces.com/profile/*
// @include        http://codeforces.com/profile/*
// @match          https://codeforces.com/profile/*
// @match          http://codeforces.com/profile/*
// @grant          none
// ==/UserScript==

var lang = ($('meta[name="description"]').attr('content').match("programming")) ? "en" : "ru";
var placeholder = $("#placeholder");
placeholder.hide();
var new_script = $("#pageContent > script:last-of-type").html();
new_script = new_script.slice(40, -10);
var old_script = new_script.replace(/var markings = \[[^\;]*;/m, "var markings = [\
    { color: '#f33', lineWidth: 1, yaxis: { from: 2600 } },\
    { color: '#f77', lineWidth: 1, yaxis: { from: 2200, to: 2599 } },\
    { color: '#ffbb55', lineWidth: 1, yaxis: { from: 2050, to: 2199 } },\
    { color: '#ffcc88', lineWidth: 1, yaxis: { from: 1900, to: 2049 } },\
    { color: '#f8f', lineWidth: 1, yaxis: { from: 1700, to: 1899 } },\
    { color: '#aaf', lineWidth: 1, yaxis: { from: 1500, to: 1699 } },\
    { color: '#7f7', lineWidth: 1, yaxis: { from: 1350, to: 1499 } },\
    { color: '#afa', lineWidth: 1, yaxis: { from: 1200, to: 1349 } },\
    { color: '#ccc', lineWidth: 1, yaxis: { from: 0, to: 1199 } },];");
var yrange = old_script.match(/yaxis: { min: (\d+), max: (\d+)/);
old_script = old_script.replace(/var options = \{[^\;]*;/m, "var options = {\
    lines: { show: true },\
    points: { show: true },\
    xaxis: { mode: \"time\" },\
    yaxis: { min: " + yrange[1] + ", max: " + yrange[2] + ", ticks: [1200, 1350, 1500, 1700, 1900, 2050, 2200, 2600] },\
    grid: { hoverable: true, markings: markings }\
};");
old_script = old_script.replace(/(\$\.plot\(\$\(\"\#)(placeholder)(\"\))/, "$1old_placeholder$3");
//window.old_script = old_script;
//console.log(window.old_script);
placeholder.after("<div id=\"old_placeholder\" style=\"width:100%;height:300px;\"></div>");
if(lang == "en")
  placeholder.after("<p>Before revolution of colors:</p>");
else
  placeholder.after("<br /><p>До революции цветов:</p>");
eval(old_script);
placeholder.show();