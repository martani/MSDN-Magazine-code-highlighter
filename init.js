var defaultTheme = "rainbow";
var currentTheme = defaultTheme;
var styles = [
		"agate",
		"androidstudio",
		"arta",
		"ascetic",
		"atelier-dune.dark",
		"atelier-dune.light",
		"atelier-forest.dark",
		"atelier-forest.light",
		"atelier-heath.dark",
		"atelier-heath.light",
		"atelier-lakeside.dark",
		"atelier-lakeside.light",
		"atelier-seaside.dark",
		"atelier-seaside.light",
		"atelier-sulphurpool.dark",
		"atelier-sulphurpool.light",
		"brown_paper",
		"codepen-embed",
		"color-brewer",
		"dark",
		"darkula",
		"default",
		"docco",
		"far",
		"foundation",
		"github",
		"googlecode",
		"hybrid",
		"idea",
		"ir_black",
		"kimbie.dark",
		"kimbie.light",
		"magula",
		"mono-blue",
		"monokai",
		"monokai_sublime",
		"obsidian",
		"paraiso.dark",
		"paraiso.light",
		"pojoaque",
		"railscasts",
		"rainbow",
		"solarized_dark",
		"solarized_light",
		"sunburst",
		"tomorrow-night-blue",
		"tomorrow-night-bright",
		"tomorrow-night-eighties",
		"tomorrow-night",
		"tomorrow",
		"vs",
		"xcode",
		"zenburn"
]

$(document).ready(function() {
	
	// Append all styles to page and set them as disabled
	styles.forEach(function(entry) {
		$("<link/>", {
		   rel: "stylesheet",
		   type: "text/css",
		   href: chrome.extension.getURL("styles/" + entry + ".css"),
		   title: entry,
		   disabled: "true"
		}).appendTo("head");
	});
	
	// Read stored theme and apply it to current page
	chrome.storage.local.get('msdn_extension_theme', function(result) {
		if (result.msdn_extension_theme === undefined) {
			currentTheme = defaultTheme;
			console.log('No saved theme, default theme ' + currentTheme);
		}
		else{
			currentTheme = result.msdn_extension_theme;
			console.log('Read saved theme ' + currentTheme);
		}
		
		// Apply saved theme
		$('link[title]').each(function(i, link) {
			link.disabled = (link.title != currentTheme);
		});
	});
		
	// MSDN Mag page
	$("code").removeClass("xml");
	$("code").each(function() {
		hljs.highlightBlock(this);
	});
	
	$(".libCScode").each(function() {
		hljs.highlightBlock(this);
	});
	
	$(".libCScode").parent().attr("style", "");
	$(".libCScode").removeClass("libCScode");
	$(".CodeHighlighter").removeClass("CodeHighlighter");
	$(".CodeSnippetTitleBar").removeClass("CodeSnippetTitleBar");
	
	var target = $("p");
	target.attr("style", target.attr("style") + "; "
						+"font-family: 'Segoe UI', 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif;"
						+"font-size: 13px;"
						+"font-style: normal;"
						+"font-variant: normal;"
						+"font-weight: normal;"
						);

	var target = $("pre");
	target.attr("style", target.attr("style") + "; " + "padding-bottom: 15px !important;");

	var target = $(".hljs");
	target.attr("style", target.attr("style") + "; "
						+"font-family: monospace !important;"
						+"font-size: 120% !important;"
						+"line-height: 130% !important;"
						);
});