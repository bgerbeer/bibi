/*!
 *
 * # BiB/i Extension: C+Indicators
 *
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link/ or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */

Bibi.x({

    name: "C+Indicators",
    description: "Add Indicators.",
    author: "Satoru MATSUSHIMA (@satorumurmur)",
    version: Bibi["version"],
    build: Bibi["build"]

})(function() {

    C.Indicator = O.Body.appendChild(sML.create("div", { id: "bibi-indicator" }));

    // Mark
    C.Indicator.Mark = C.Indicator.appendChild(sML.create("div", { id: "bibi-indicator-mark" }));
    for(var i = 1; i <= 12; i++) C.Indicator.Mark.appendChild(document.createElement("span"));
    E.add("bibi:startLoading", function() {    sML.addClass(O.HTML, "loading"); C.note('Loading...'); });
    E.add("bibi:stopLoading",  function() { sML.removeClass(O.HTML, "loading"); });

    // Progress
    C.Indicator.Progress = C.Indicator.appendChild(sML.create("div", { id: "bibi-indicator-progress" }));
    C.Indicator.Progress.progress = function() {
        clearTimeout(C.Indicator.Progress.Timer_vanish);
        clearTimeout(C.Indicator.Progress.Timer_transparentize);
        setTimeout(function() { sML.addClass(C.Indicator.Progress, "active"); },  0);
        setTimeout(function() { sML.addClass(C.Indicator.Progress, "hot"   ); }, 10);
        C.Indicator.Progress.Timer_transparentize = setTimeout(function() { sML.removeClass(C.Indicator.Progress, "hot"   ); }, 1981      );
        C.Indicator.Progress.Timer_vanish         = setTimeout(function() { sML.removeClass(C.Indicator.Progress, "active"); }, 1981 + 255);
        E.dispatch("bibi:indicator:progress");
    };

    // Progress > Nombre
    C.Indicator.Progress.Nombre = C.Indicator.Progress.appendChild(sML.create("div", { id: "bibi-indicator-progress-nombre" }));
    sML.appendStyleRule("html.view-horizontal div#bibi-indicator-progress-nombre", "bottom: " + (O.Scrollbars.Height + 2) + "px;");
    sML.appendStyleRule("html.view-vertical   div#bibi-indicator-progress-nombre", "right: "  + (O.Scrollbars.Width  + 2) + "px;");
    C.Indicator.Progress.Nombre.Current   = C.Indicator.Progress.Nombre.appendChild(sML.create("span", { id: "bibi-indicator-progress-nombre-current"   }));
    C.Indicator.Progress.Nombre.Delimiter = C.Indicator.Progress.Nombre.appendChild(sML.create("span", { id: "bibi-indicator-progress-nombre-delimiter" }));
    C.Indicator.Progress.Nombre.Total     = C.Indicator.Progress.Nombre.appendChild(sML.create("span", { id: "bibi-indicator-progress-nombre-total"     }));
    C.Indicator.Progress.Nombre.Percent   = C.Indicator.Progress.Nombre.appendChild(sML.create("span", { id: "bibi-indicator-progress-nombre-percent"   }));
    E.add("bibi:indicator:progress", function() {
        C.Indicator.Progress.Nombre.Current.innerHTML   = (function() {
            var PageNumber = R.Current.Pages.StartPage.PageIndex + 1;
            if(R.Current.Pages.StartPage != R.Current.Pages.EndPage) PageNumber += '<span class="delimiter">-</span>' + (R.Current.Pages.EndPage.PageIndex + 1);
            return PageNumber;
        })();
        C.Indicator.Progress.Nombre.Delimiter.innerHTML = '/';
        C.Indicator.Progress.Nombre.Total.innerHTML     = R.Pages.length;
        C.Indicator.Progress.Nombre.Percent.innerHTML   = '(' + R.Current.Percent + '<span class="unit">%</span>)';
    });

    // Progress > Bar
    C.Indicator.Progress.Bar = C.Indicator.Progress.appendChild(sML.create("div", { id: "bibi-indicator-progress-bar" }));
    C.Indicator.Progress.Bar.Pages   = C.Indicator.Progress.Bar.appendChild(sML.create("div", { id: "bibi-indicator-progress-bar-pages" }));
    C.Indicator.Progress.Bar.Current = C.Indicator.Progress.Bar.appendChild(sML.create("div", { id: "bibi-indicator-progress-bar-current" }));
    E.add("bibi:indicator:progress", function() {
        C.Indicator.Progress.Bar.Current.className = (R.Current.Pages.length > 1) ? "two-pages" : "";
        C.Indicator.Progress.Bar.Current.style.width = (100 / R.Pages.length) * R.Current.Pages.length + "%";
        C.Indicator.Progress.Bar.Current.style[S.PPD == "ltr" ? "right" : "left"] = ((R.Pages.length - R.Current.PageNumber) / R.Pages.length * 100) + "%";
    });
    E.add("bibi:layout", function() {
        C.Indicator.Progress.Bar.Pages.innerHTML = "";
        R.Pages.forEach(function(Page, i) {
            var PageBox = C.Indicator.Progress.Bar.Pages.appendChild(
                sML.create("div", { innerHTML: '<div>' + (i + 1) + '</div>' }, { width: (100 / R.Pages.length) + "%" })
            )
            PageBox.style[S.PPD == "ltr" ? "left" : "right"] = (100 / R.Pages.length * i) + "%";
            C.setFeedback(PageBox);
        });
    });
    C.Indicator.Progress.Bar.addEventListener("click", function(Eve) {
        var Ratio = (Eve.srcElement.offsetLeft + Eve.offsetX) / C.Indicator.Progress.Bar.offsetWidth;
        if(S.PPD == "rtl") Ratio = 1 - Ratio;
        var TargetPage = R.Pages[Math.ceil(R.Pages.length * Ratio) - 1];
        if(TargetPage != R.Current.Pages.StartPage && TargetPage != R.Current.Pages.EndPage) R.focus(TargetPage);
    });

    // Set
    E.add("bibi:scrolled", C.Indicator.Progress.progress);
    E.add("bibi:start", function() { setTimeout(C.Indicator.Progress.progress, 321); });

});