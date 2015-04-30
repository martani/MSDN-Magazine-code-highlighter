var defaultTheme = "rainbow";
var currentTheme = defaultTheme;

function applyTheme(theme){
	chrome.tabs.executeScript(null, { code : 
										"$('link[title]').each(function(i, link) {" +
											"link.disabled = (link.title != '" + theme +"');" +
										"});"
	});
}

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

$(document).ready(function(){
	
	// Open link in new tab
	$('body').on('click', 'a', function(){
		chrome.tabs.create({url: $(this).attr('href')});
		return false;
	});

	getCurrentTabUrl(function(url){
		
		// Check if MSDN mag page
		var re = new RegExp("http[s]?://msdn.microsoft.com/[a-zA-Z]+-[a-zA-Z]+/magazine/*", "i");
		if(!re.test(url)){
			console.log("Not MSDN Magazine url. Exit!");
			$("#not_msdn").show();
			$("#content").hide();
			return;
		}
		
		$("#not_msdn").hide();
		$("#content").show();
		
		// Register theme-change callback
		$('#styles').change(function(){
			var temp = $(this).val();
			applyTheme(temp);
			
			// Save theme to storage
			chrome.storage.local.set({'msdn_extension_theme': temp}, function() {
				console.log('Settings saved: msdn_extension_theme = ' + temp);
			});
		});
		
		// INIT
		// Read from storage	
		chrome.storage.local.get('msdn_extension_theme', function(result) {
			if (result.msdn_extension_theme === undefined) {
				// Can't get value from storage, use default				
				currentTheme = defaultTheme;
				console.log('No saved theme, default theme ' + currentTheme);
			}
			else{
				currentTheme = result.msdn_extension_theme;
				console.log('Read saved theme ' + currentTheme);
			}
		  
			// Set active theme in select box
			$(function() {
				$("#styles").val(currentTheme);
			});
			
			// Apply saved theme
			applyTheme(currentTheme);
		});
	});
});