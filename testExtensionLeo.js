//引入外部资源


//出现qIntercolumnsortorder的错误时，删除图表重新拖拽进去

define([
    "qlik",
    "jquery",
    "./echarts",

],
    function (qlik, $, echarts) {
		'use strict';
        return {
            //定义Sense工具条（维度、度量等）
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
						uses: "settings",
					}
				}
			},
			//定义数据对象
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
				},
				selectionMode : "CONFIRM"
			},
			
			//渲染函数，$element作为渲染html的对象
			
			//layout为返回的数据对象集合
			
			
			
			
            paint: function ($element, layout) {
			//paint函数内通过jquery操作dom创建html内容
			
			
			
			
				
				//qHyperCube存放数据
				var hc = layout.qHyperCube;
				console.log( 'Data returned: ', hc );
				
				
				//输出选中的所有维度， 目前表达式的使用存在问题（数据返回不对）
				for (var i = 0; i < hc.qDimensionInfo.length; i++) {
					console.log( hc.qDimensionInfo[i].qFallbackTitle) ;
							}
							
				var dataset=hc.qDataPages[0].qMatrix;
				var dLength=dataset.length;
				console.log("数据集：",dataset);
				console.log("数组长度为",dLength);
				
				
				//
				var dSetName=[];
				var dSetVal=[];
				var dSetData=[];
				for(var d in dataset){
					dSetName[d]=dataset[d][0].qText;
					dSetVal[d]=dataset[d][1].qText;
					
					
					dSetData[d]={value:dSetVal[d],name:dSetName[d]};
				}
				console.log("数据维度名称：",dSetName);
				console.log("数据对象：",dSetData);
				//每次拖拽会重新渲染，在此避免重复渲染多个	-lazyway						
                $element.empty();
				
				
                // var $helloWorld = $(document.createElement('div'));

                // $helloWorld.html('Hello World from the extension "SimpleHelloWorld"<br/>');

                // $element.append($helloWorld);

				//使用$element对象创建div节点
                var $chart = $(document.createElement('div'));


				//在该div添加一段文字，测试用
                $chart.html('Hello echarts!');

				//配置该div的 id   （必需）宽度高度
                $chart.attr('id', 'main');
                $chart.css('width', '100%');
                $chart.css('height', '100%');
				
				//将该节点添加到box内
                $element.append($chart);

				//-----------------echarts部分--------------------------
				//和echarts的使用完全相同，注意在开始引用echarts.js文件
                var myChart = echarts.init(document.getElementById('main'));

                var option = {
                    title: {
                        text: '测试echarts-pie',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        //data: [dataset[0][0].qText, dataset[1][0].qText, dataset[2][0].qText, dataset[3][0].qText, dataset[4][0].qText]
						data: dSetName
                    },
                    series: [
                        {
                            name: '收入',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            //data: [
                            //    { value: dataset[0][1].qText, name: dataset[0][0].qText },
                            //    { value: dataset[1][1].qText, name: dataset[1][0].qText},
                            //    { value: dataset[2][1].qText, name: dataset[2][0].qText },
                            //    { value: dataset[3][1].qText, name: dataset[3][0].qText },
                            //    { value: dataset[4][1].qText, name: dataset[4][0].qText }
                            //],
							data: dSetData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };


                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //-----------------echarts部分--------------------------
				
				
				
				
                //add your rendering code here
                //$element.html( "testExtensionLeo" );
                //needed for export
                return qlik.Promise.resolve();
            }
        };

    });

