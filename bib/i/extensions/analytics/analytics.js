/*!
 *
 * # BiB/i Extension: Analytics
 *
 * - "Track and Log. Powered by Google Analytics."
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link/ or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
Bibi.x({name:"Analytics",description:"Track and Log",version:Bibi.version,build:Bibi.build})(function(){var e=location.origin+location.pathname+location.search;!function(e,n,t,i,a,o,r){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,o=n.createElement(t),r=n.getElementsByTagName(t)[0],o.async=1,o.src=i,r.parentNode.insertBefore(o,r)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create",S.extensions.analytics.setting,"auto",{allowLinker:!0}),ga("require","linker"),ga("linker:autoLink",function(e){return S["trustworthy-origins"].forEach(function(n){e.push(n.replace(/^\w+:\/\//,""))}),e}([])),E.add("bibi:createNavigation",function(){sML.each(C.Panel.BookInfo.Navigation.querySelectorAll("a"),function(){this.addEventListener("click",function(){ga("send",{hitType:"event",eventCategory:"BiB/i: Navigation Clicked",eventAction:e,eventLabel:this.innerHTML.replace(/<[^>]*>/g,"")+' - "'+this.getAttribute("data-bibi-original-href")+'"',eventValue:void 0})})})}),E.add("bibi:play:button",function(){ga("send",{hitType:"event",eventCategory:"BiB/i: Play by Button",eventAction:e,eventLabel:"on: "+S["parent-uri"].replace(/#.+$/,""),eventValue:void 0})}),E.add("bibi:scrolled",function(){100==R.Current.Percent&&ga("send",{hitType:"event",eventCategory:"BiB/i: Read Through",eventAction:e,eventLabel:Date.now()-O.TimeCard.Origin,eventValue:void 0})})});