/* Lab Central remaining sidebar icons.
   Each symbol is composed for the same 24px, 1.65px round-stroke system
   used by the analyzer icons. Keep the Lab Calculator favicon on its own pages, while the sidebar uses
   a matching lab/calculator symbol. Preserve Piccolo and PATHFAST icons. */
(function(){
'use strict';
window.LAB_CENTRAL_SIDEBAR_ICONS=Object.freeze({
  "calculators": "<path d=\"M3 3h7M4.2 3v9.1l-1.1 3a2 2 0 0 0 1.9 2.7h4.2a2 2 0 0 0 1.9-2.7l-1.1-3V3M4.5 12h5.1\"/><rect x=\"13\" y=\"4\" width=\"8\" height=\"16\" rx=\"1.6\"/><path d=\"M15 8h4M15 12h1M18.3 12h.7M15 16h1M18.3 16h.7\"/>",
  "home": "<path d=\"m3 11 9-7 9 7v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20Z\"/><path d=\"M9 21.5v-7h6v7M9.5 11h5M12 8.5v5\"/>",
  "favorites": "<path d=\"m12 2.8 2.85 5.77 6.37.92-4.61 4.49 1.09 6.35L12 17.33l-5.7 3 1.09-6.35-4.61-4.49 6.37-.92L12 2.8Z\"/><path d=\"m9.4 12.5 1.7 1.7 3.6-3.7\"/>",
  "orders": "<path d=\"M6.5 2.5h8l4 4V21H6.5a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2Z\"/><path d=\"M14.5 2.5v4h4M8 10.5h6M8 13.7h4\"/><path d=\"m12.9 17.4 2 2 4-4\"/>",
  "order-sets": "<path d=\"M5.6 19 10.7 5h2.6l5.1 14M8.1 13.4h7.8\" stroke-width=\"2.45\"/>",
  "drug-screen": "<path d=\"M6 6h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6ZM5 6h14M8 3h8\"/><path d=\"M9.5 10v6m2.5-6v6m2.5-6v6\"/>",
  "poc": "<rect x=\"3\" y=\"6\" width=\"18\" height=\"12\" rx=\"3\"/><path d=\"M6 10h5v4H6zM15 10h3M16.5 9v5M6 3.5h4\"/><path d=\"m12.8 20 2 1.5 3-2\"/>",
  "sendout": "<path d=\"M3 8h12v10H3zM15 11h3.6l2.4 3v4h-6M6 8V5h6v3\"/><circle cx=\"7\" cy=\"18.5\" r=\"2\"/><circle cx=\"18\" cy=\"18.5\" r=\"2\"/><path d=\"M8.5 11.5h4M10.5 9.5v4\"/>",
  "tubes": "<path d=\"M4.5 3h7M5.6 3v14.2a2.4 2.4 0 1 0 4.8 0V3M5.6 12h4.8M14.2 3h7M15.3 3v14.2a2.4 2.4 0 1 0 4.8 0V3M15.3 10h4.8\"/><path d=\"M4.5 5h7M14.2 5h7\"/>",
  "calver": "<circle cx=\"12\" cy=\"13\" r=\"8.5\"/><path d=\"M12 4.5v2.4M5.4 8.4l2 1.2M18.6 8.4l-2 1.2M3.5 13H6M18 13h2.5M9.4 17.8l3.1-7.2 3.2 7.2M10.5 15.6h4\"/>",
  "api": "<path d=\"M12 2.3 20 5v7.3c0 4-3.2 7.4-8 9.4-4.8-2-8-5.4-8-9.4V5l8-2.7Z\"/><circle cx=\"12\" cy=\"12\" r=\"4.3\"/><path d=\"m9.9 12 1.5 1.5 2.9-3\"/>",
  "outside": "<path d=\"m3 10 9-7 9 7v10H3V10Z\"/><path d=\"M9 20v-5.4h6V20M15.2 9.1s2.2 2.4 2.2 3.7a2.2 2.2 0 1 1-4.4 0c0-1.3 2.2-3.7 2.2-3.7Z\"/>",
  "supplies": "<path d=\"m3 7 9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10\"/><path d=\"M14.8 14.5h4.2M16.9 12.4v4.2\"/>",
  "visby": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"3\"/><rect x=\"7\" y=\"6\" width=\"10\" height=\"6\" rx=\"1.3\"/><circle cx=\"12\" cy=\"16.5\" r=\"2\"/><path d=\"M9 9h6\"/>",
  "idnow": "<path d=\"M4 7h16v12H4zM6 5h12v2M7.5 10h9v5h-9zM8 19v2h8v-2\"/><circle cx=\"18\" cy=\"17\" r=\".7\"/><path d=\"M9.5 12.5h4.5\"/>",
  "lab-monthly-checklist": "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2\"/><path d=\"M7.5 3v4M16.5 3v4M3.5 10h17M8 14h2M13 14h3M8 17.4h2M13 17.4h3\"/>",
  "socal-daily": "<rect x=\"5\" y=\"3.5\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 3.5v-1h6v1M8 9l1.4 1.4L12 7.6M14 9h2.4M8 15l1.4 1.4L12 13.6M14 15h2.4\"/>",
  "envi-ordering": "<path d=\"m3 7 9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10\"/><path d=\"m14.6 15.6 1.6 1.5 3.3-3.7\"/>",
  "specimen-dropoff": "<path d=\"M4 13v7h16v-7M4 16h16\"/><path d=\"M12 3v12M8.5 11.5 12 15l3.5-3.5\"/><path d=\"M7 7h10\"/>",
  "lab-container-gallery": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M8 6h4M8.6 6v10a1.4 1.4 0 0 0 2.8 0V6M15 6h4M15.6 6v10a1.4 1.4 0 1 0 2.8 0V6M8.6 12h2.8M15.6 11h2.8\"/>",
  "sendout-log": "<path d=\"M8 3h8v2H8zM7 4H5v18h14V4h-2M8 9h7M8 13h4\"/><path d=\"m12.5 17 2 2 3.5-4\"/>"
});
})();
