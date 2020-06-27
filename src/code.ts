figma.showUI(__html__);
figma.ui.resize(800, 800);

figma.ui.onmessage = (msg) => {
	if (msg.type === "create-rectangles") {
		// figma.ui.resize(1000, 1000);
		const nodes = [];

		// for (let i = 0; i < msg.count; i++) {
		console.log(msg.color);
		const rect = figma.createRectangle();
		rect.x = Math.floor(Math.random() * Math.floor(2)) * 150;
		rect.resize(200, 200);

		rect.fills = [
			{
				type: "GRADIENT_LINEAR",
				gradientTransform: [
					[1, 0, 0],
					[0, 1, 0],
				],
				gradientStops: [
					{
						position: 1,
						color: {
							r: msg.color.color1.red,
							g: msg.color.color1.green,
							b: msg.color.color1.blue,
							a: 1,
						},
					},
					{
						position: 0.1,
						color: {
							r: msg.color.color2.red,
							g: msg.color.color2.green,
							b: msg.color.color2.blue,
							a: 1,
						},
					},
				],
			},
		];
		figma.currentPage.appendChild(rect);
		nodes.push(rect);
		// }

		figma.currentPage.selection = nodes;
		// figma.viewport.scrollAndZoomIntoView(nodes);
	}

	// figma.closePlugin();
};
