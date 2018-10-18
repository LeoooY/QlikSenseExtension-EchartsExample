define( [
	"qlik",
    "jquery",
	"./BootStrap"
	],
    function ( ) {
        'use strict';
		
        return {
            definition: {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
						uses: "dimensions"
					},
					measures: {
						uses: "measures"
					},
					sorting: {
						uses: "sorting"
					},
					appearance: {
						uses: "settings"
					}
				}
			},
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [
						{
							qWidth: 10,
							qHeight: 100
						}
					]
				}
			},
			paint: function ( $element, layout ) {

				var hc = layout.qHyperCube;
				console.log( 'Data returned: ', hc );

				$element.empty();
				$('<link rel="stylesheet" type="text/css" href="/extensions/testTableLeo/bootstrap.min.css">').appendTo("head");
		
				var table = '<div style="width:40vh;height:40vh"> <table border="1.5" class="table" >';

					table += '<thead style="background-color:rgb(1,120,190);color:white">';
						table += '<tr>';
							for (var i = 0; i < hc.qDimensionInfo.length; i++) {
								table += '<th>' + hc.qDimensionInfo[i].qFallbackTitle + '</th>';
							}
							for (var i = 0; i < hc.qMeasureInfo.length; i++) {
								table += '<th>' + hc.qMeasureInfo[i].qFallbackTitle + '</th>';
							}
						table += '</tr>';
					table += '</thead>';

					table += '<tbody>';
						
						// iterate over all rows
						for (var r = 0; r < hc.qDataPages[0].qMatrix.length; r++) {
							table += '<tr>';

							// iterate over all cells within a row
							for (var c = 0; c < hc.qDataPages[0].qMatrix[r].length; c++) {
								table += '<td>';
									table += hc.qDataPages[0].qMatrix[r][c].qText;
								table += '</td>';
							}
							table += '</tr>';
						}
					table += '</tbody>';
				table += '</table>';
				table += '</div>';
				$element.append( table );
				$('<link rel="stylesheet" type="text/css" href="/extensions/testTableLeo/jquery.min.js">').appendTo("head");
				$('<link rel="stylesheet" type="text/css" href="/extensions/testTableLeo/bootstrap.min.js">').appendTo("head");
			}
        };
    } );