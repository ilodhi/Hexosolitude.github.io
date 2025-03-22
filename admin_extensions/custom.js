// Add to hexo-admin when it loads
(function () {
	// Wait for admin to initialize
	document.addEventListener("DOMContentLoaded", function () {
		// Add a custom button to the admin interface
		var header = document.querySelector(".header");
		if (header) {
			var customButton = document.createElement("button");
			customButton.textContent = "Deploy Site";
			customButton.className = "custom-deploy-button";
			customButton.style.marginLeft = "10px";

			customButton.addEventListener("click", function () {
				if (confirm("Are you sure you want to deploy your site now?")) {
					// Send deploy command to server
					fetch("/admin/api/deploy", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					})
						.then((response) => response.json())
						.then((data) => {
							alert("Deployment started: " + data.message);
						})
						.catch((err) => {
							alert("Error: " + err.message);
						});
				}
			});

			header.appendChild(customButton);
		}

		// Add custom CSS for better image handling
		var style = document.createElement("style");
		style.textContent = `
      .editor-pane .CodeMirror img { max-width: 100%; height: auto; }
      .post-image-preview { margin: 10px 0; border: 1px solid #eee; padding: 5px; }
    `;
		document.head.appendChild(style);
	});
})();
