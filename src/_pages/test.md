---
permalink: /test/
---

<html>
	<head>
		<title>Test</title>
	</head>
	<body>

		{% assign address = site.data.settings.offices[0].address %}

		<!-- GOOGLE MAP -->
		<iframe data-google-map
				width="100%"
		        height="100%"
		        frameborder="0"
		        style="pointer-events: none;"
		        data-src="https://maps.google.com/maps?hl=en&q={{address | strip_html }}&z=21&ie=UTF8&t=roadmap&z=16&iwloc=A&output=embed">
		</iframe>

		<!-- <div class="lv-google-map">
        <iframe
        width="100%"
        height="320"
        frameborder="0"
        style="pointer-events: none"
        src="https://maps.google.com/maps?hl=en&amp;q=Building 15, Best Avenue, Georges Heights, Mosman NSW 2088&amp;z=21&amp;ie=UTF8&amp;t=roadmap&amp;z=16&amp;iwloc=A&amp;output=embed"></iframe>
    	</div> -->

	</body>
</html>