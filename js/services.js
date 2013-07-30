'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('quickcanvas.services', [])
	.
value('version', '0.1')
	.
service('canvasService', ['localStorageService', function(localStorageService) {

	var initData = function() {
		return {
			'problems': [],
			'solutions': [],
			'key_metrics': [],
			'unique_value': [],
			'unfair_advantage': [],
			'channels': [],
			'customer_segments': [],
			'cost_structure': [],
			'revenue_streams': []
		};

	};

	var data = initData();
	if (localStorageService.isSupported) {
		var dataModel = localStorageService.get('dataModel');
		if (dataModel != null && typeof(dataModel) == 'string') {
			var tmpData = null;
			try {
				tmpData = JSON.parse(dataModel);
			} catch (exception) {
				tmpData = data;
			}
			data = tmpData;
		}
	}

	return {
		setJson: function(dataJson) {
			data = JSON.parse(dataJson);
		},
		getJson: function() {
			return JSON.stringify(data);
		},
		clearData: function() {
			data = initData();
		},
		persistModel: function() {
			if (localStorageService.isSupported) {
				localStorageService.add('dataModel', JSON.stringify(data));
			}
		},

		getLines: function(key) {
			var retLine = '';
			var items = this.getItems(key);
			for (var i = 0; i < items.length; i++) {
				retLine += '- ' + items[i] + '\n';
			}
			console.log('retLine ' + retLine);
			return retLine;

		},

		getItems: function(cat) {
			return data[cat];
		},

		addItem: function(cat, text) {
			if (text.length > 1) data[cat].push(text);
			this.persistModel();
			// $scope.text = '';
		},

		deleteItem: function(cat, idx) {
			data[cat].splice(idx, 1);
			this.persistModel();
		}
	};

}])
.service('pdfService', ['canvasService', function(canvasService) {
	return {
		drawPdf: function() {
			var doc = new jsPDF('l', 'mm', 'a4');
			var top = 15;
			var left = 13.5;
			var width = 270;
			var half = 130;
			var height = 180;
			var margin = 5;
			var lineHeight = 8;
			doc.setDrawColor(0);
			//canvas border
			doc.rect(left, top, width, height, 'stroke');

			// first row columns
			doc.lines([
				[0, half - top]
			], left + (width / 5) * 2, top);
			doc.lines([
				[0, half - top]
			], left + (width / 5) * 3, top);
			doc.lines([
				[0, half - top]
			], left + (width / 5) * 4, top);
			doc.lines([
				[0, half - top]
			], left + width / 5, top);

			// first row labels

			doc.setFontSize(12);
			doc.text('Problem', left + margin / 2, top + margin);
			// line under label row
			doc.lines([
				[width, 0]
			], left, lineHeight + top)

			var pl = doc.splitTextToSize(canvasService.getLines('problems'), width / 5 - margin);
			doc.text(left + margin / 2, top + margin + lineHeight, pl);


			doc.text('Solution', left + margin / 2 + (width / 5), top + margin);

			var sl = doc.splitTextToSize(canvasService.getLines('solutions'), width / 5 - margin);
			doc.text(left + margin / 2 + (width / 5), top + margin + lineHeight, sl);


			doc.text('Key Metrics', left + margin / 2 + (width / 5), (top + half) / 2.0 + margin);

			var kl = doc.splitTextToSize(canvasService.getLines('key_metrics'), width / 5 - margin);
			doc.text(left + margin / 2 + (width / 5), (top + half) / 2.0 + margin + lineHeight, kl);


			doc.text('Unique value proposition', left + margin / 2 + 2 * (width / 5), top + margin);

			var uvl = doc.splitTextToSize(canvasService.getLines('unique_value'), width / 5 - margin);
			doc.text(left + margin / 2 + 2 * (width / 5), top + margin + lineHeight, uvl);


			doc.text('Unfair advantage', left + margin / 2 + 3 * (width / 5), top + margin);
			var ufl = doc.splitTextToSize(canvasService.getLines('unfair_advantage'), width / 5 - margin);
			doc.text(left + margin / 2 + 3 * (width / 5), top + margin + lineHeight, ufl);

			doc.text('Channels', left + margin / 2 + 3 * (width / 5), (top + half) / 2.0 + margin);
			var chl = doc.splitTextToSize(canvasService.getLines('channels'), width / 5 - margin);
			doc.text(left + margin / 2 + 3 * (width / 5), (top + half) / 2.0 + margin + lineHeight, chl);

			doc.text('Customer segment', left + margin / 2 + 4 * (width / 5), top + margin);
			var csl = doc.splitTextToSize(canvasService.getLines('customer_segments'), width / 5);
			doc.text(left + margin / 2 + 4 * (width / 5), top + margin + lineHeight, csl);


			// first row middle lines
			doc.lines([
				[width / 5, 0]
			], left + width / 5.0, (top + half) / 2.0)
			doc.lines([
				[width / 5, 0]
			], left + width / 5.0, lineHeight + (top + half) / 2.0)

			doc.lines([
				[width / 5, 0]
			], left + 3 * (width / 5.0), (top + half) / 2.0)
			doc.lines([
				[width / 5, 0]
			], left + 3 * (width / 5.0), lineHeight + (top + half) / 2.0)

			// middle horizontal lines
			doc.lines([
				[width, 0]
			], left, half);
			doc.lines([
				[width, 0]
			], left, lineHeight + half);

			// second row column
			doc.lines([
				[0, height - half - 1 + top]
			], left + (width / 2.0), half);
			// second row labels

			doc.text('Cost structure', left + margin / 2, half + margin);

			var cssl = doc.splitTextToSize(canvasService.getLines('cost_structure'), (width / 2.0) - margin);
			doc.text(left + margin / 2, half + margin + lineHeight, cssl);


			doc.text('Revenue streams', left + (width / 2.0) + margin / 2, half + margin);

			var rsl = doc.splitTextToSize(canvasService.getLines('revenue_streams'), (width / 2.0) - margin);
			doc.text(left + (width / 2.0) + margin / 2, half + margin + lineHeight, rsl);

			// var problems=$scope.problems;

			// var lines = doc.splitTextToSize(problems, (width/2.0)-margin);
			// doc.text(left + margin/2, top + margin+lineHeight, problems);

			doc.text("Lean Canvas", left, top - 5)
			doc.text("Generated by QuickCanvas.io", left, top + height + 5)
			return doc.output();

		}
	}


}]);
