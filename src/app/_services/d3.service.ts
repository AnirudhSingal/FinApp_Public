import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChartPoint, ChartPointAdapter } from '../_models/chart-point';


@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor(
    private datePipe: DatePipe,
  ) { }

  public createSvg(xmargin: number, ymargin: number, cssSelector: string): any {
    d3.select(cssSelector).selectAll("*").remove();
    return d3.select(cssSelector)
      .append("svg")
      .append("g")
      .attr("transform", "translate(" + xmargin + ',' + ymargin + ")")
  }

  //  make the chart reaponsive according to the size of the parent container
  public responsivefy(cssSelector: string, width: number, height: number) {
    // get container + svg aspect ratio
    let svg: any = d3.select(cssSelector);

    if (!svg.empty()) {
      svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid meet")
      const newWidth = svg.style("width");
      const newFontSize = 0.6 * (width / parseInt(newWidth));

      svg.selectAll(".tick text").style("font-size", newFontSize + "rem")
      svg.selectAll(".focus text").style("font-size", 1.5 * newFontSize + "rem")
      svg.selectAll(".close-tags text").style("font-size", 1.5 * newFontSize + "rem")
      svg.selectAll("line").style("stroke-width", 0.5 * (width / parseInt(newWidth)))
      svg.select("path#detailed-price-Chart").style("stroke-width", 1.5 * (width / parseInt(newWidth)))
      svg.select("path#priceChart").style("stroke-width", 1 * (width / parseInt(newWidth)))
    }
  }

  private priceTag(svg: any, price: number, gclass: string) {

    let priceTagSvg = svg.append('g').attr('class', gclass)

    priceTagSvg
      .append("rect")
    // .attr("transform", "translate(0,0)")

    priceTagSvg
      .append("text")

    priceTagSvg.select("text")
      .text(price)
      .attr("y", 0)
      .attr("font-size", "1.5rem")

    priceTagSvg.select("rect")
      .attr("width", priceTagSvg.select("text").node().getBBox().width)
      .attr("height", priceTagSvg.select("text").node().getBBox().height)
      .attr("y", priceTagSvg.select("text").node().getBBox().y)
  }

  private calcTickFormat(ChartType: string) {

    switch (ChartType) {
      case "5Y":
        return d3.timeFormat("%Y");
      case "1Y":
        return d3.timeFormat("%b");
      case "YTD":
        return d3.timeFormat("%b");
      case "6M":
        return d3.timeFormat("%b");
      case "1M":
        return d3.timeFormat("%d %b");
      default:
        break;
    }
  }

  private makeyYaxis(svg: any, gclass: string, scale: d3.ScaleLinear<number, number>, width: number, nticks: number) {
    svg.append("g")
      .attr("class", "y-axis " + gclass)
      .call(d3.axisRight(scale).ticks(nticks))
      .call(g => g.select(".domain").remove())
      .attr("transform", "translate(" + width + ",0)")
  }

  public abbreviateNumber(value: any) { // change numbers to K/M/B/T/Q form
    let newValue = value;
    if (value >= 1000) {
      let suffixes = ["", "K", "M", "B", "t", "q"];
      let suffixNum = Math.floor(value.toString().length / 3);
      if (suffixNum > 5) {
        suffixNum = 5;
      }

      let shortValue: any;
      shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(4));
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }


  public drawStockPlotSimple(ChartType: string, data: Observable<ChartPoint[]>, priceSvg: any,
    width: number, pricePlotHeight: number,
    previousClose: number, openPrice: number, closePrice: number): void {
    switch (ChartType) {
      case "1D":
        data.pipe(
          map(res => {
            // sort data in the reverse order of time
            res.sort((a, b) => <any>b.date - <any>a.date)

            // get last open date
            let operatingDate = new Date(res[0].date).getDate();

            // get the close time for previous day here
            let previousDayCloseDataPoint = res.find(_ => {
              return _.date.getDate() != operatingDate
            });


            // only select data for the last open day
            let data: ChartPoint[] = [];

            res.forEach(element => {
              if (new Date(element.date).getDate() == operatingDate) {
                data.push(element);
              }
            });

            // making close and open price on the plot the same as returned by the quote
            data[0].close = closePrice;
            data[data.length - 1].close = openPrice;

            // get data in increasing order of time
            return {
              'data': data.reverse(),
              'closeTimestamp': previousDayCloseDataPoint
            }
            // using close data of of all timepoints at the price for that timepoint
          })
        ).subscribe(res => {
          switch (ChartType) {
            case "1D":
              this.DrawPlot1DSimple(priceSvg, res.data, res.closeTimestamp, width, pricePlotHeight, previousClose, openPrice, closePrice);
              break;
            default:
              priceSvg.selectAll("*").remove();
              break;
          }
        });
        break;
      default:
        data.pipe(
          map(res => {
            // sort data in the reverse order of time
            res.sort((a, b) => <any>b.date - <any>a.date)
            // making close and open price on the plot the same as returned by the quote
            res[0].close = closePrice;

            // get data in increasing order of time
            return {
              'data': res.reverse(),
            }
            // using close data of of all timepoints at the price for that timepoint
          })
        ).subscribe(res => {
          switch (ChartType) {
            case "1M":
            case "6M":
            case "1Y":
            case "YTD":
            case "5Y":
              this.DrawPlotNot1DSimple(ChartType, priceSvg, res.data, width, pricePlotHeight);
              break;
            default:
              priceSvg.selectAll("*").remove();
              break;
          }
        });
        break;
    }


    // adding blur

    let filter = priceSvg.append("filter").attr("id", "glow");

    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "4")
      .attr("edgeMode", "duplicate")
      .attr("result", "coloredBlur");

    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    priceSvg.selectAll("line").style("filter", "url(#glow)");
    priceSvg.select("path#priceChart").style("filter", "url(#glow)");

  }

  private DrawPlotNot1DSimple(ChartType: string, svg: any,
    data: ChartPoint[],
    width: number, pricePlotHeight: number) {

    // clearing
    svg.selectAll("*").remove();

    // Creating Price Plot //

    // filter the data array to reduce data points
    switch (ChartType) {
      case "5Y":
        data = data.filter(d => {
          return d.date.getDay() == 5
        })
        break;
      default:
        break;
    }


    // Create the X-axis band scale
    const x = d3.scaleTime()
      .range([0, width])
      .domain([
        data[0].date,
        data[data.length - 1].date
      ]);

    // Draw the X-axis on the DOM
    svg.append("g")
      .attr("class", "x-axis x-axis-1d-detailed-plot")
      .attr("transform", "translate(0," + (pricePlotHeight) + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(this.calcTickFormat(ChartType)))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.selectAll("g.x-axis.x-axis-1d-detailed-plot .tick")
      .each(function (d) {
        this.childNodes[1].setAttribute("transform", "translate(" + (this.getBBox().width / 2) + ",0)")
      })
    // get y-min and y-max

    let pricePoints = data.map(t => t.close);

    let priceMin = pricePoints.reduce((a, b) => Math.min(a, b));
    let priceMax = pricePoints.reduce((a, b) => Math.max(a, b));

    let yPriceMin = priceMin - (priceMax - priceMin) * 0.2
    let yPriceMax = priceMax + (priceMax - priceMin) * 0.2

    // Create the Y-axis band scale
    const yPrice = d3.scaleLinear()
      .domain([yPriceMin, yPriceMax])
      .range([pricePlotHeight, 0]);

    let dataArray = data.map(d => {
      return { 'date': d.date, 'close': parseFloat(d.close.toFixed(2)), 'volume': d.volume }
    })

    const priceLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => x(d['date']))
      .y(d => yPrice(d['close']));

    const priceArea = d3.area()
      .x(d => x(d['date']))
      .y1(d => yPrice(d['close']))
      .y0(pricePlotHeight);

    // coloring the plot based on value being higher or lower than previous close
    let maxChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.max(a, b)));
    let minChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.min(a, b)));

    svg.append("linearGradient")
      .attr("id", "simple-price-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": "Black",
        }, {
          "offset": "100%",
          "color": "Black"
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // coloring the area based on based on current value
    svg.append("linearGradient")
      .attr("id", "simple-area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": "rgb(242, 242, 242)",
        }, {
          "offset": (minChartHeight) * 100 / maxChartHeight + "%",
          "color": "rgb(242, 242, 242)",
        }, {
          "offset": "100%",
          "color": "rgb(242, 242, 242)"
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // price chart area
    svg.append('path')
      .data([dataArray])
      .attr("id", "price-chart-area")
      .attr("d", priceArea)

    // price chart
    svg
      .append('path')
      .data([dataArray])
      .style('fill', 'none')
      .attr('id', 'priceChart')
      .attr('d', priceLine);

    // Draw the Y-axis on the DOM
    this.makeyYaxis(svg, "y-axis-1d-detailed-price", yPrice, width, 2);

    // gridlines in y axis function
    function make_y_gridlines_price() {
      return d3.axisLeft(yPrice).ticks(2)
    }
    svg.append("g")
      .attr("class", "grid grid-1d-detailed-price")
      .call(make_y_gridlines_price()
        .tickSize(-width)
        .tickFormat(null))
      .call(g => g.selectAll("path.domain")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick text")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick line"));

    // volume plot
    // get y-min and y-max
    let volumePoints = dataArray.map(t => Math.abs(t.volume));

    let volumeMin = volumePoints.reduce((a, b) => Math.min(a, b));
    let volumeMax = volumePoints.reduce((a, b) => Math.max(a, b));

    // Create the Y-axis band scale
    const yVolume = d3.scaleLinear()
      .domain([volumeMin, volumeMax])
      .range([pricePlotHeight, pricePlotHeight * 0.4]);

    // Draw the Y-axis on the DOM


    svg.append("g")
      .attr("class", "y-axis y-axis-1d-detailed-volume")
      .call(d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(".4s")))
      .call(g => g.select(".domain").remove())
      .attr("transform", "translate(" + width + ",0)")

    svg.select("g.y-axis.y-axis-1d-detailed-volume")
      .attr("transform", "translate(" + width + "," + pricePlotHeight + ")")

    // gridlines in y axis function
    function make_y_gridlines_volume() {
      return d3.axisLeft(yVolume).ticks(4)
    }
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + (pricePlotHeight) + ")")
      .call(make_y_gridlines_volume()
        .tickSize(-width)
        .tickFormat(null))
      .call(g => g.selectAll("path.domain")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick text")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick line")
        .attr("stroke-opacity", 0.2));
  }

  private DrawPlot1DSimple(svg: any,
    data: ChartPoint[], closeDataPoint: ChartPoint,
    width: number, pricePlotHeight: number,
    previousClose: number, openPrice: number, closePrice: number) {


    // clearing
    let endTimeStamp = new Date();
    svg.selectAll("*").remove();

    if(closeDataPoint == undefined){
      endTimeStamp = new Date(data[0].date.getFullYear(), data[0].date.getMonth(), data[0].date.getDate(), 
      16,0)
    }else{
      endTimeStamp = new Date(data[0].date.getFullYear(), data[0].date.getMonth(), data[0].date.getDate(), 
      closeDataPoint.date.getHours(), closeDataPoint.date.getMinutes())
    }

    // Creating Price Plot //
    // Create the X-axis band scale
    const x = d3.scaleTime()
      .range([0, width])
      .domain([
        data[0].date,
        endTimeStamp
      ]);

    // Draw the X-axis on the DOM
    svg.append("g")
      .attr("class", "x-axis x-axis-1d-detailed-plot")
      .attr("transform", "translate(0," + (pricePlotHeight) + ")")
      .call(d3.axisBottom(x).ticks(3).tickFormat(d3.timeFormat("%I %p")))
      .selectAll("text")
      .style("text-anchor", "end");

    svg.selectAll("g.x-axis.x-axis-1d-detailed-plot .tick")
      .each(function (d) {
        this.childNodes[1].setAttribute("transform", "translate(" + (this.getBBox().width / 2) + ",0)")
      })

    // get y-min and y-max

    let pricePoints = data.map(t => t.close);
    pricePoints.push(previousClose);

    let priceMin = pricePoints.reduce((a, b) => Math.min(a, b));
    let priceMax = pricePoints.reduce((a, b) => Math.max(a, b));

    let yPriceMin = priceMin - (priceMax - priceMin) * 0.2
    let yPriceMax = priceMax + (priceMax - priceMin) * 0.2

    // Create the Y-axis band scale
    const yPrice = d3.scaleLinear()
      .domain([yPriceMin, yPriceMax])
      .range([pricePlotHeight, 0]);

    let dataArray = data.map(d => {
      return { 'date': d.date, 'close': parseFloat(d.close.toFixed(2)), 'volume': d.volume }
    })

    // coloring the plot based on value being higher or lower than previous close

    let areaColor = dataArray[dataArray.length - 1].close >= previousClose ? "green" : "red";
    svg.append("linearGradient")
      .attr("id", "simple-price-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", 0)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": areaColor
        }, {
          "offset": "100%",
          "color": areaColor
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // coloring the area based on based on current value
    let maxChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.max(a, b)));
    let minChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.min(a, b)));
    svg.append("linearGradient")
      .attr("id", "simple-area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": "rgb(242, 242, 242)",
        }, {
          "offset": (minChartHeight) * 100 / maxChartHeight + "%",
          "color": "rgb(242, 242, 242)",
        }, {
          "offset": "100%",
          "color": "rgb(242, 242, 242)"
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });


    // plot functions
    const priceLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => x(d['date']))
      .y(d => yPrice(d['close']));

    const priceArea = d3.area()
      .x(d => x(d['date']))
      .y1(d => yPrice(d['close']))
      .y0(pricePlotHeight);

    // price chart
    svg
      .append('path')
      .data([dataArray])
      .style('fill', 'none')
      .attr('id', 'priceChart')
      .attr('d', priceLine);

    // price chart area
    svg.append('path')
      .data([dataArray])
      .attr("id", "price-chart-area")
      .attr("d", priceArea)


    // Draw the Y-axis on the DOM
    this.makeyYaxis(svg, "y-axis-1d-detailed-price", yPrice, width, 2);

    // gridlines in y axis function
    function make_y_gridlines_price() {
      return d3.axisLeft(yPrice).ticks(2)
    }
    svg.append("g")
      .attr("class", "grid grid-1d-detailed-price")
      .call(make_y_gridlines_price()
        .tickSize(-width)
        .tickFormat(null))
      .call(g => g.selectAll("path.domain")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick text")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick line"));

    // close tags
    let tagLeftMargin = parseInt(svg.select('g.y-axis.y-axis-1d-detailed-price g.tick:first-of-type line').attr("x2"));
    svg.append("g")
      .attr("class", "close-tags")

    this.priceTag(svg.select(".close-tags"), previousClose, 'previous-close-tag');
    svg.select('.previous-close-tag')
      .attr('transform', 'translate(' + (width + tagLeftMargin) + ',' + yPrice(previousClose) + ')');

    // current price tag
    this.priceTag(svg.select(".close-tags"), closePrice, 'current-price-tag');
    svg.select('.current-price-tag')
      .attr('transform', 'translate(' + (width + tagLeftMargin) + ',' + yPrice(closePrice) + ')');

    if (closePrice >= previousClose) {
      svg.select("g.current-price-tag rect")
        .attr('class', 'positive-difference')
    } else {
      svg.select("g.current-price-tag rect")
        .attr('class', 'negative-difference')
    }
    svg.select("g.close-tags").style('display', "none")

    // volume plot

    let filteredDataArray = dataArray.filter(d => d.date.getMinutes() % 2 == 0)

    let d1 = filteredDataArray.slice(1, filteredDataArray.length - 1);
    let d2 = filteredDataArray.slice(1, filteredDataArray.length);

    d1.unshift({
      date: filteredDataArray[0].date,
      close: filteredDataArray[0].close,
      volume: 0
    });

    let filteredDataArrayWithTimeFrameVolume = d1.map((d, i) => {
      return {
        'date': d.date,
        'volume': d2[i].volume - d.volume
      }
    })

    // get y-min and y-max
    let volumePoints = filteredDataArrayWithTimeFrameVolume.map(t => Math.abs(t.volume));

    let volumeMin = volumePoints.reduce((a, b) => Math.min(a, b));
    let volumeMax = volumePoints.reduce((a, b) => Math.max(a, b));

    // Create the Y-axis band scale
    const yVolume = d3.scaleLinear()
      .domain([volumeMin, volumeMax])
      .range([pricePlotHeight, pricePlotHeight * 0.4]);


    // Draw the Y-axis on the DOM
    svg.append("g")
      .attr("class", "y-axis y-axis-1d-detailed-volume")
      .call(d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(".4s")))
      .call(g => g.select(".domain").remove())
      .attr("transform", "translate(" + width + ",0)")

    svg.select("g.y-axis.y-axis-1d-detailed-volume")
      .attr("transform", "translate(" + width + "," + pricePlotHeight + ")")

    // gridlines in y axis function
    function make_y_gridlines_volume() {
      return d3.axisLeft(yVolume).ticks(4)
    }
    
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + (pricePlotHeight) + ")")
      .call(make_y_gridlines_volume()
        .tickSize(-width)
        .tickFormat(null))
      .call(g => g.selectAll("path.domain")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick text")
        .attr("display", "none"))
      .call(g => g.selectAll(".tick line")
        .attr("stroke-opacity", 0.2));

    // previous close line
    svg
      .append('line')
      .attr('class', 'line line-previous-close-1d-detailed')
      .attr("x1", 0)
      .attr("y1", yPrice(previousClose))
      .attr("x2", width)
      .attr("y2", yPrice(previousClose))
  }

  public drawStockPlotDetailed(ChartType: string, data: Observable<ChartPoint[]>, priceSvg: any,
    width: number, pricePlotHeight: number, volumePlotHeight: number,
    previousClose: number, openPrice: number, closePrice: number): void {


    switch (ChartType) {
      case "1D":
        data.pipe(
          map(res => {

            // sort data in the reverse order of time
            res.sort((a, b) => <any>b.date - <any>a.date)

            // get last open date
            let operatingDate = new Date(res[0].date).getDate();

            // get the close time for previous day here
            let previousDayCloseDataPoint = res.find(_ => {
              return _.date.getDate() != operatingDate
            });

            // only select data for the last open day
            let data: ChartPoint[] = [];

            res.forEach(element => {
              if (new Date(element.date).getDate() == operatingDate) {
                data.push(element);
              }
            });

            // making close and open price on the plot the same as returned by the quote
            data[0].close = closePrice;
            data[data.length - 1].close = openPrice;

            // get data in increasing order of time
            return {
              'data': data.reverse(),
              'closeTimestamp': previousDayCloseDataPoint
            }
            // using close data of of all timepoints at the price for that timepoint
          })
        ).subscribe(res => {
          switch (ChartType) {
            case "1D":
              this.DrawPlot1DDetailed(priceSvg, res.data, res.closeTimestamp, width, pricePlotHeight, volumePlotHeight, previousClose, openPrice, closePrice);
              break;
            default:
              priceSvg.selectAll("*").remove();
              break;
          }
        });
        break;
      default:
        data.pipe(
          map(res => {
            // sort data in the reverse order of time
            res.sort((a, b) => <any>b.date - <any>a.date)
            // making close and open price on the plot the same as returned by the quote
            res[0].close = closePrice;

            // get data in increasing order of time
            return {
              'data': res.reverse(),
            }
            // using close data of of all timepoints at the price for that timepoint
          })
        ).subscribe(res => {
          switch (ChartType) {
            case "1M":
            case "6M":
            case "1Y":
            case "YTD":
            case "5Y":
              this.DrawPlotNot1DDetailed(ChartType, priceSvg, res.data, width, pricePlotHeight, volumePlotHeight);
              break;
            default:
              priceSvg.selectAll("*").remove();
              break;
          }
        });
        break;
    }


    let filter = priceSvg.append("filter").attr("id", "glow-path")
      .attr("primitiveUnits", "userSpaceOnUse");
    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "4")
      .attr("edgeMode", "duplicate")
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");


    filter = priceSvg.append("filter").attr("id", "glow-bar")
      .attr("primitiveUnits", "userSpaceOnUse");
    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "0.4")
      .attr("edgeMode", "duplicate")
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");


    priceSvg.select("#detailed-price-Chart").style('filter', 'url(\"#glow-path\")');
    priceSvg.selectAll('.volume-plot-bar').style('filter', 'url(\"#glow-bar\")');


  }

  private DrawPlotNot1DDetailed(ChartType: string, svg: any,
    data: ChartPoint[],
    width: number, pricePlotHeight: number, volumePlotHeight: number) {

    // clearing
    svg.selectAll("*").remove();

    // Creating Price Plot //

    // filter the data array to reduce data points
    switch (ChartType) {
      case "5Y":
        data = data.filter(d => {
          return d.date.getDay() == 1
        })
        break;
      default:
        break;
    }

    // Create the X-axis band scale
    const x = d3.scaleTime()
      .range([0, width])
      .domain([
        data[0].date,
        data[data.length - 1].date
      ])

    // Draw the X-axis on the DOM
    svg.append("g")
      .attr("class", "x-axis x-axis-1d-detailed-plot")
      .attr("transform", "translate(0," + (pricePlotHeight + volumePlotHeight) + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(this.calcTickFormat(ChartType)))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // get y-min and y-max

    let pricePoints = data.map(t => t.close);

    let priceMin = pricePoints.reduce((a, b) => Math.min(a, b));
    let priceMax = pricePoints.reduce((a, b) => Math.max(a, b));

    let yPriceMin = priceMin - (priceMax - priceMin) * 0.2
    let yPriceMax = priceMax + (priceMax - priceMin) * 0.2

    // Create the Y-axis band scale
    const yPrice = d3.scaleLinear()
      .domain([yPriceMin, yPriceMax])
      .range([pricePlotHeight, 0]);

    let dataArray = data.map(d => {
      return { 'date': d.date, 'close': parseFloat(d.close.toFixed(2)), 'volume': d.volume }
    })

    const priceLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => x(d['date']))
      .y(d => yPrice(d['close']));

    const priceArea = d3.area()
      .x(d => x(d['date']))
      .y1(d => yPrice(d['close']))
      .y0(pricePlotHeight);

    // coloring the plot based on value being higher or lower than previous close
    let maxChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.max(a, b)));
    let minChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.min(a, b)));

    svg.append("linearGradient")
      .attr("id", "detailed-price-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": "Black",
        }, {
          "offset": "100%",
          "color": "Black"
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // coloring the area based on based on current value
    svg.append("linearGradient")
      .attr("id", "detailed-area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          color: "rgb(242, 242, 242)"
        }, {
          "offset": (minChartHeight) * 100 / maxChartHeight + "%",
          "color": "rgb(242, 242, 242)",
        }, {
          "offset": "100%",
          "color": "rgb(242, 242, 242)"
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // price chart area
    svg.append('path')
      .data([dataArray])
      .attr("id", "detailed-price-chart-area")
      .attr("d", priceArea)

    // price chart
    svg
      .append('path')
      .data([dataArray])
      .style('fill', 'none')
      .attr('id', 'detailed-price-Chart')
      .attr('d', priceLine);

    // Draw the Y-axis on the DOM
    this.makeyYaxis(svg, "y-axis-1d-detailed-price", yPrice, width, 4);

    let filter = svg.append("filter").attr("id", "glow-criss-cross");
    let gridlines = svg.append("g")
      .attr("id", "gridline-criss-cross")

    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "1")
      .attr("edgeMode", "duplicate")
      .attr("result", "coloredBlur");

    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    let xTicks = x.ticks(4);
    let yTicksPrice = yPrice.ticks(4);

    for (let index = 0; index < xTicks.length; index++) {

      let xTick = xTicks[index];

      gridlines
        .append("line")
        .attr("x1", x(xTick))
        .attr("x2", x(xTick))
        .attr("y1", pricePlotHeight + volumePlotHeight)
        .attr("y2", 0)
        .attr("stroke", "black")
        .style("filter", "url(#glow-criss-cross)")
        .style("opacity", 0.1);
    }

    yTicksPrice.forEach(yTick => {
      gridlines
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yPrice(yTick))
        .attr("y2", yPrice(yTick))
        .attr("stroke", "black")
        .style("opacity", 0.1)
        .style("filter", "url(#glow-criss-cross)");

      // y-axis ticks
      gridlines
        .append("line")
        .attr("x1", width)
        .attr("x2", width + 6)
        .attr("y1", yPrice(yTick))
        .attr("y2", yPrice(yTick))
        .attr("stroke", "black")
        .style("opacity", 0.8)
        .style("filter", "url(#glow-criss-cross)");
    })

    // volume plot
    // get y-min and y-max
    let volumePoints = dataArray.map(t => Math.abs(t.volume));

    let volumeMin = volumePoints.reduce((a, b) => Math.min(a, b));
    let volumeMax = volumePoints.reduce((a, b) => Math.max(a, b));

    // Create the Y-axis band scale
    const yVolume = d3.scaleLinear()
      .domain([volumeMin, volumeMax])
      .range([volumePlotHeight, volumePlotHeight * 0.2]);

    svg.append("rect")
      .attr("class", "rect rect-volume-plot-bg-1d-detailed")
      .attr("transform", "translate(0" + "," + pricePlotHeight + ")")
      .attr("height", volumePlotHeight)
      .attr("width", x(dataArray[dataArray.length - 1].date));

    // Draw the Y-axis on the DOM


    svg.append("g")
      .attr("class", "y-axis y-axis-1d-detailed-volume")
      .call(d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(".4s")))
      .call(g => g.select(".domain").remove())
      .attr("transform", "translate(" + width + ",0)")

    svg.select("g.y-axis.y-axis-1d-detailed-volume")
      .attr("transform", "translate(" + width + "," + pricePlotHeight + ")")


    let yTicksVolume = yVolume.ticks(3);
    yTicksVolume.forEach(yTick => {
      gridlines
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yVolume(yTick) + pricePlotHeight)
        .attr("y2", yVolume(yTick) + pricePlotHeight)
        .attr("stroke", "black")
        .style("opacity", 0.1)
        .style("filter", "url(#glow-criss-cross)");

      // y-axis ticks
      gridlines
        .append("line")
        .attr("x1", width)
        .attr("x2", width + 6)
        .attr("y1", yVolume(yTick) + pricePlotHeight)
        .attr("y2", yVolume(yTick) + pricePlotHeight)
        .attr("stroke", "black")
        .style("opacity", 0.8)
        .style("filter", "url(#glow-criss-cross)");
    })
    // Bars
    let barData = dataArray;

    svg.append('g')
      .attr("class", "volume-plot-bar")
      .attr("transform", "translate(0," + (pricePlotHeight) + ")")
      .attr("width", width)
      .selectAll("mybar")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        if (i == 0) {
          return x(d.date)
        }
        return x(d.date) - width / 4 / dataArray.length;
      })
      .attr("fill", "black")
      .attr("y", function (d) { return yVolume(0) })
      .attr("transform", "translate(-1,0)")
      .attr("width", function (d, i) {
        if (i == 0 || i == dataArray.length - 1) {
          return width / 4 / dataArray.length;
        }
        return width / 2 / dataArray.length;
      })
      .attr("height", function (d) {
        return volumePlotHeight - yVolume(0);
      })
      .transition()
      .duration((d, i) => 500)
      .attr("y", function (d) { return yVolume(Math.abs(d.volume)) })
      .attr("height", function (d) { return volumePlotHeight - yVolume(Math.abs(d.volume)); })











    // divider for price and volume plots
    svg
      .append('line')
      .attr('class', 'line line-plot-divider-1d-detailed')
      .attr("x1", 0)
      .attr("y1", pricePlotHeight)
      .attr("x2", width)
      .attr("y2", pricePlotHeight)


    // tooltip
    var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");
    // current price line

    focus
      .append('line')
      .attr('class', 'line line-current-price-line-1d-detailed')

    // tracking line that moves along with the mouse and intersects the plot
    focus.append('line')
      .attr('class', 'line line-tooltip-line-1d-detailed')
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", pricePlotHeight + volumePlotHeight);

    // line diviing the tooltip
    focus.append('line')
      .attr('class', 'line line-tooltip-divider-1d-detailed')
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0);

    // cicle that traces the plot as mouse moves
    focus.append("circle").attr("r", 0)

    // tooltip box
    focus.append("rect")
      .attr("class", "tooltip-box");

    // tooltip time text
    focus.append("text")
      .attr("class", "tooltip-time")
      .attr("x", 0)
      .attr("y", 0)

    // tooltip time price
    focus.append("text")
      .attr("class", "tooltip-price")
      .attr("x", 5)
      .attr("y", 0);

    // Overlay
    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", pricePlotHeight + volumePlotHeight)
      .attr("fill", "transparent")
      .on("mouseover", function () {
        focus.style("display", null);
        focus.select(".tooltip-time").text('');
      })
      .on("mouseout", function () {
        focus.style("display", "none");
      })
      .on("mousemove", (_, d, n) => {
        // get time stamp from mouse position
        let timeStamp = x.invert(d3.mouse(n[d])[0]);

        // returns selected timestamp
        let selectedTimeStamp = d3.bisector((d: any) => {
          return d.date;
        }).left;

        // price and time at the timeframe indicated by mouse location
        let index = selectedTimeStamp(dataArray, timeStamp, 1);
        let price = dataArray[index - 1].close;
        let time = dataArray[index - 1].date;

        // set data for tooltip
        focus.select(".tooltip-time").text(this.datePipe.transform(time, 'yy/MM/dd'));
        focus.select(".tooltip-price").text(price.toFixed(2));

        let tooltipTimeY = focus.select('.tooltip-time').node().getBBox().y;
        let tooltipTimeWidth = focus.select(".tooltip-time").node().getBBox().width;
        let tooltipTimeHeight = focus.select('.tooltip-time').node().getBBox().height;
        let tooltipPriceWidth = focus.select(".tooltip-price").node().getBBox().width

        // move focus along with mouse
        focus.attr("transform", "translate(" + x(time) + "," + "0)");

        focus.select('.tooltip-box').attr('fill', 'black')

        // set y's for tooltip divider
        focus.select(".line.line-tooltip-divider-1d-detailed").attr('y1', tooltipTimeY);
        focus.select(".line.line-tooltip-divider-1d-detailed").attr('y2', tooltipTimeY + tooltipTimeHeight);

        // setting tooltip-line y1
        // focus.select(".tooltip-line").style("display", null);
        focus.select(".tooltip-line").attr("y1", tooltipTimeY + tooltipTimeHeight);

        // to adjust tooltip at edges
        if (x(time) + tooltipPriceWidth + 5 > width) {

          focus.select(".tooltip-time").attr("transform",
            "translate(" + (-5 - tooltipTimeWidth - x(time) - 5 - tooltipPriceWidth + width) + ",0)");

          focus.select(".tooltip-price").attr("transform",
            "translate(" + (- x(time) - 5 - tooltipPriceWidth + width) + ",0)");

          focus.select(".line.line-tooltip-divider-1d-detailed").attr("transform",
            "translate(" + (- x(time) - 5 - tooltipPriceWidth + width) + ",0)");

          focus.select(".tooltip-box")
            .attr("x", -5 - tooltipTimeWidth - x(time) - 5 - tooltipPriceWidth + width)
            .attr("y", tooltipTimeY)
            .attr("height", tooltipTimeHeight)
            .attr("width", tooltipTimeWidth + tooltipPriceWidth + 5 + 5);

        }
        else if (x(time) < tooltipTimeWidth + 5) {


          focus.select(".tooltip-time").attr("transform",
            "translate(" + (-5 - tooltipTimeWidth - x(time) + tooltipTimeWidth + 5) + ",0)");

          focus.select(".tooltip-price").attr("transform",
            "translate(" + (- x(time) + tooltipTimeWidth + 5) + ",0)");

          focus.select(".line.line-tooltip-divider-1d-detailed").attr("transform",
            "translate(" + (- x(time) + tooltipTimeWidth + 5) + ",0)");

          focus.select(".tooltip-box")
            .attr("x", -5 - tooltipTimeWidth - x(time) + tooltipTimeWidth + 5)
            .attr("y", tooltipTimeY)
            .attr("height", tooltipTimeHeight)
            .attr("width", tooltipTimeWidth + tooltipPriceWidth + 5 + 5);
        }
        else {

          focus.select(".tooltip-time").attr("transform", "translate(" + (-5 - tooltipTimeWidth) + ",0)");

          focus.select(".tooltip-price").attr("transform", "translate(" + 0 + ",0)");
          focus.select(".line.line-tooltip-divider-1d-detailed").attr("transform", "translate(" + 0 + ",0)");

          focus.select(".tooltip-box").
            attr("x", -tooltipTimeWidth - 5).
            attr("y", tooltipTimeY).
            attr("height", tooltipTimeHeight).
            attr("width", tooltipTimeWidth + tooltipPriceWidth + 5 + 5);
        }

        // adjusting current price line
        focus.select('line.line.line-current-price-line-1d-detailed')
          .attr("x1", 0 - x(time))
          .attr("x2", width - x(time))
          .attr("y1", yPrice(dataArray[index - 1].close))
          .attr("y2", yPrice(dataArray[index - 1].close))

        focus.select("circle")
          .attr("r", 5)
          .attr("transform", "translate(0," + yPrice(price) + ")");
      });
  }

  private DrawPlot1DDetailed(svg: any,
    data: ChartPoint[], closeDataPoint: ChartPoint,
    width: number, pricePlotHeight: number, volumePlotHeight: number,
    previousClose: number, openPrice: number, closePrice: number) {


    // clearing
    svg.selectAll("*").remove();



    let endTimeStamp = new Date()

    if(closeDataPoint == undefined){
      endTimeStamp = new Date(data[0].date.getFullYear(), data[0].date.getMonth(), data[0].date.getDate(), 
        16,0)

    }else{
      endTimeStamp = new Date(data[0].date.getFullYear(), data[0].date.getMonth(), data[0].date.getDate(), 
        closeDataPoint.date.getHours(), closeDataPoint.date.getMinutes())
    }

    // Creating Price Plot //
    // Create the X-axis band scale
    const x = d3.scaleTime()
      .range([0, width])
      .domain([
        data[0].date,
        endTimeStamp
      ]);


    // Draw the X-axis on the DOM
    svg.append("g")
      .attr("class", "x-axis x-axis-1d-detailed-plot")
      .attr("transform", "translate(0," + (pricePlotHeight + volumePlotHeight) + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat("%I %p")))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .attr("font-size", "1rem")
      .style("text-anchor", "end");

    // get y-min and y-max

    let pricePoints = data.map(t => t.close);
    pricePoints.push(previousClose);

    let priceMin = pricePoints.reduce((a, b) => Math.min(a, b));
    let priceMax = pricePoints.reduce((a, b) => Math.max(a, b));

    let yPriceMin = priceMin - (priceMax - priceMin) * 0.2
    let yPriceMax = priceMax + (priceMax - priceMin) * 0.2

    // Create the Y-axis band scale
    const yPrice = d3.scaleLinear()
      .domain([yPriceMin, yPriceMax])
      .range([pricePlotHeight, 0]);

    let dataArray = data.map(d => {
      return { 'date': d.date, 'close': parseFloat(d.close.toFixed(2)), 'volume': d.volume }
    })


    let filter = svg.append("filter").attr("id", "glow-criss-cross");
    let gridlines = svg.append("g")
      .attr("id", "gridline-criss-cross")

    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "1")
      .attr("edgeMode", "duplicate")
      .attr("result", "coloredBlur");

    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // coloring the plot based on value being higher or lower than previous close
    let areaColor = dataArray[dataArray.length - 1].close >= previousClose ? "green" : "red";

    let gridColor = areaColor;


    let xTicks = x.ticks(4);
    let yTicksPrice = yPrice.ticks(4);

    for (let index = 0; index < xTicks.length - 1; index++) {

      let xTick = xTicks[index];

      gridlines
        .append("line")
        .attr("x1", x(xTick))
        .attr("x2", x(xTick))
        .attr("y1", pricePlotHeight)
        .attr("y2", 0)
        .attr("stroke", gridColor)
        .style("filter", "url(#glow-criss-cross)")
        .style("opacity", 0.1);
    }

    yTicksPrice.forEach(yTick => {
      gridlines
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yPrice(yTick))
        .attr("y2", yPrice(yTick))
        .attr("stroke", gridColor)
        .style("opacity", 0.1)
        .style("filter", "url(#glow-criss-cross)");

      // y-axis ticks
      gridlines
        .append("line")
        .attr("x1", width)
        .attr("x2", width + 6)
        .attr("y1", yPrice(yTick))
        .attr("y2", yPrice(yTick))
        .attr("stroke", "black")
        .style("opacity", 0.8)
        .style("filter", "url(#glow-criss-cross)");
    })

    svg.append("linearGradient")
      .attr("id", "detailed-price-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", 0)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": areaColor
        }, {
          "offset": "100%",
          "color": areaColor
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // coloring the area based on based on current value
    let maxChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.max(a, b)));
    let minChartHeight = pricePlotHeight - yPrice(dataArray.map(d => d.close).reduce((a, b) => Math.min(a, b)));
    svg.append("linearGradient")
      .attr("id", "detailed-area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": "rgb(242, 242, 242)",
        }, {
          "offset": (minChartHeight) * 100 / maxChartHeight + "%",
          "color": "rgb(242, 242, 242)"
        }, {
          "offset": "100%",
          "color": "rgb(242, 242, 242)"
        }
      ])
      .enter().append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // plot functions
    const priceLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => x(d['date']))
      .y(d => yPrice(d['close']));

    const priceArea = d3.area()
      .x(d => x(d['date']))
      .y1(d => yPrice(d['close']))
      .y0(pricePlotHeight);

    // price chart area
    svg.append('path')
      .data([dataArray])
      .attr("id", "detailed-price-chart-area")
      .attr("d", priceArea)

    // price chart
    let path = svg
      .append('path')
      .data([dataArray])
      .style('fill', 'none')
      .attr('id', 'detailed-price-Chart')
      .attr('d', priceLine);

    // Draw the Y-axis on the DOM
    this.makeyYaxis(svg, "y-axis-1d-detailed-price", yPrice, width, 4);

    // close tags
    let tagLeftMargin = parseInt(svg.select('g.y-axis.y-axis-1d-detailed-price g.tick:first-of-type line').attr("x2"));
    svg.append("g").attr("class", "close-tags")

    //previous close tag
    this.priceTag(svg.select(".close-tags"), previousClose, 'previous-close-tag');


    svg.select('.previous-close-tag')
      .attr('transform', 'translate(' + (width + tagLeftMargin) + ',' + yPrice(previousClose) + ')');

    // volume plot

    let filteredDataArray = dataArray.filter(d => d.date.getMinutes() % 2 == 0)


    let d1 = filteredDataArray.slice(1, filteredDataArray.length - 1);
    let d2 = filteredDataArray.slice(1, filteredDataArray.length);

    d1.unshift({
      date: filteredDataArray[0].date,
      close: filteredDataArray[0].close,
      volume: 0
    });

    let filteredDataArrayWithTimeFrameVolume = d1.map((d, i) => {
      return {
        'date': d.date,
        'volume': d2[i].volume - d.volume
      }
    })

    // get y-min and y-max
    let volumePoints = filteredDataArrayWithTimeFrameVolume.map(t => Math.abs(t.volume));

    let volumeMin = volumePoints.reduce((a, b) => Math.min(a, b));
    let volumeMax = volumePoints.reduce((a, b) => Math.max(a, b));

    // Create the Y-axis band scale
    const yVolume = d3.scaleLinear()
      .domain([volumeMin, volumeMax])
      .range([volumePlotHeight, volumePlotHeight * 0.2]);

    svg.append("rect")
      .attr("class", "rect rect-volume-plot-bg-1d-detailed")
      .attr("transform", "translate(0" + "," + pricePlotHeight + ")")
      .attr("height", volumePlotHeight)
      .attr("width", x(dataArray[dataArray.length - 1].date));


    // Draw the Y-axis on the DOM
    svg.append("g")
      .attr("class", "y-axis y-axis-1d-detailed-volume")
      .call(d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(".4s")))
      .call(g => g.select(".domain").remove())
      .attr("transform", "translate(" + width + ",0)")

    svg.select("g.y-axis.y-axis-1d-detailed-volume")
      .attr("transform", "translate(" + width + "," + pricePlotHeight + ")")

    // Bars
    svg.append('g')
      .attr("class", "volume-plot-bar")
      .attr("transform", "translate(0," + (pricePlotHeight) + ")")
      .selectAll("mybar")
      .data(filteredDataArrayWithTimeFrameVolume)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.date); })
      .attr("y", function (d) { return yVolume(0) })
      .attr("fill", areaColor)
      .style("border-top-left", "1")
      .style("border-top-right", "1")
      .attr("width", (x(dataArray[1].date) - x(dataArray[0].date)))
      .attr("height", function (d) { return volumePlotHeight - yVolume(0) })
      // adding loading animation
      .transition()
      .duration((d, i) => 500)
      .attr("y", function (d) { return yVolume(Math.abs(d.volume)) })
      .attr("height", function (d) { return volumePlotHeight - yVolume(Math.abs(d.volume)); })

    // add grid to volume plot

    let yTicksVolume = yVolume.ticks(4)

    for (let index = 0; index < xTicks.length - 1; index++) {
      let xTick = xTicks[index];

      gridlines
        .append("line")
        .attr("x1", x(xTick))
        .attr("x2", x(xTick))
        .attr("y1", pricePlotHeight)
        .attr("y2", pricePlotHeight + volumePlotHeight)
        .attr("stroke", gridColor)
        .style("filter", "url(#glow-criss-cross)")
        .style("opacity", 0.2);
    }

    yTicksVolume.forEach(yTick => {
      gridlines
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yVolume(yTick) + pricePlotHeight)
        .attr("y2", yVolume(yTick) + pricePlotHeight)
        .attr("stroke", gridColor)
        .style("opacity", 0.2)
        .style("filter", "url(#glow-criss-cross)");
    })


    // divider for price and volume plots
    svg
      .append('line')
      .attr('class', 'line line-plot-divider-1d-detailed')
      .attr("x1", 0)
      .attr("y1", pricePlotHeight)
      .attr("x2", width)
      .attr("y2", pricePlotHeight)

    // tooltip
    var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");
    // current price line

    focus
      .append('line')
      .attr('class', 'line line-current-price-line-1d-detailed')

    // tracking line that moves along with the mouse and intersects the plot
    focus.append('line')
      .attr('class', 'line line-tooltip-line-1d-detailed')
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", pricePlotHeight + volumePlotHeight);

    // line diviing the tooltip
    focus.append('line')
      .attr('class', 'line line-tooltip-divider-1d-detailed')
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0);

    // cicle that traces the plot as mouse moves
    focus.append("circle").attr("r", 0)

    // tooltip box
    focus.append("rect")
      .attr("class", "tooltip-box");

    // tooltip time text
    focus.append("text")
      .attr("class", "tooltip-time")
      .attr("x", 0)
      .attr("y", 0)

    // tooltip time price
    focus.append("text")
      .attr("class", "tooltip-price")
      .attr("x", 5)
      .attr("y", 0);

    // previous close line
    svg
      .append('line')
      .attr('class', 'line line-previous-close-1d-detailed')
      .attr("x1", 0)
      .attr("y1", yPrice(previousClose))
      .attr("x2", width)
      .attr("y2", yPrice(previousClose))

    // Overlay
    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", pricePlotHeight + volumePlotHeight)
      .attr("fill", "transparent")
      .on("mouseover", function () {
        focus.style("display", null);
        focus.select(".tooltip-time").text('');
        svg.select("g.close-tags").style('display', null)
        svg.select('.previous-close-tag').select("rect")
          .attr("width", svg.select('.previous-close-tag').select("text").node().getBBox().width)
          .attr("height", svg.select('.previous-close-tag').select("text").node().getBBox().height)
          .attr("y", svg.select('.previous-close-tag').select("text").node().getBBox().y)
          .style("fill", "black")
      })
      .on("mouseout", function () {
        focus.style("display", "none");
        svg.select("g.close-tags").style('display', "none")
      })
      .on("mousemove", (_, d, n) => {



        // get time stamp from mouse position
        let timeStamp = x.invert(d3.mouse(n[d])[0]);

        // returns selected timestamp
        let selectedTimeStamp = d3.bisector((d: any) => {
          return d.date;
        }).left;

        // price and time at the timeframe indicated by mouse location
        let index = selectedTimeStamp(dataArray, timeStamp, 1);
        let price = dataArray[index - 1].close;
        let time = dataArray[index - 1].date;

        // set data for tooltip
        focus.select(".tooltip-time").text(this.datePipe.transform(time, 'h:mm a'));
        focus.select(".tooltip-price").text(price.toFixed(2));

        let tooltipTimeY = focus.select('.tooltip-time').node().getBBox().y;
        let tooltipTimeWidth = focus.select(".tooltip-time").node().getBBox().width;
        let tooltipTimeHeight = focus.select('.tooltip-time').node().getBBox().height;
        let tooltipPriceWidth = focus.select(".tooltip-price").node().getBBox().width

        // move focus along with mouse
        focus.attr("transform", "translate(" + x(time) + "," + "0)");

        if (price >= previousClose) {
          focus.select('.tooltip-box').attr('fill', 'green')
        } else {
          focus.select('.tooltip-box').attr('fill', 'red')
        }

        // set y's for tooltip divider
        focus.select(".line.line-tooltip-divider-1d-detailed").attr('y1', tooltipTimeY);
        focus.select(".line.line-tooltip-divider-1d-detailed").attr('y2', tooltipTimeY + tooltipTimeHeight);

        // setting tooltip-line y1
        // focus.select(".tooltip-line").style("display", null);
        focus.select(".tooltip-line").attr("y1", tooltipTimeY + tooltipTimeHeight);

        // to adjust tooltip at edges
        if (x(time) + tooltipPriceWidth + 5 > width) {

          focus.select(".tooltip-time").attr("transform",
            "translate(" + (-5 - tooltipTimeWidth - x(time) - 5 - tooltipPriceWidth + width) + ",0)");

          focus.select(".tooltip-price").attr("transform",
            "translate(" + (- x(time) - 5 - tooltipPriceWidth + width) + ",0)");

          focus.select(".line.line-tooltip-divider-1d-detailed").attr("transform",
            "translate(" + (- x(time) - 5 - tooltipPriceWidth + width) + ",0)");

          focus.select(".tooltip-box")
            .attr("x", -5 - tooltipTimeWidth - x(time) - 5 - tooltipPriceWidth + width)
            .attr("y", tooltipTimeY)
            .attr("height", tooltipTimeHeight)
            .attr("width", tooltipTimeWidth + tooltipPriceWidth + 5 + 5);

        }
        else if (x(time) < tooltipTimeWidth + 5) {


          focus.select(".tooltip-time").attr("transform",
            "translate(" + (-5 - tooltipTimeWidth - x(time) + tooltipTimeWidth + 5) + ",0)");

          focus.select(".tooltip-price").attr("transform",
            "translate(" + (- x(time) + tooltipTimeWidth + 5) + ",0)");

          focus.select(".line.line-tooltip-divider-1d-detailed").attr("transform",
            "translate(" + (- x(time) + tooltipTimeWidth + 5) + ",0)");

          focus.select(".tooltip-box")
            .attr("x", -5 - tooltipTimeWidth - x(time) + tooltipTimeWidth + 5)
            .attr("y", tooltipTimeY)
            .attr("height", tooltipTimeHeight)
            .attr("width", tooltipTimeWidth + tooltipPriceWidth + 5 + 5);
        }
        else {

          focus.select(".tooltip-time").attr("transform", "translate(" + (-5 - tooltipTimeWidth) + ",0)");

          focus.select(".tooltip-price").attr("transform", "translate(" + 0 + ",0)");
          focus.select(".line.line-tooltip-divider-1d-detailed").attr("transform", "translate(" + 0 + ",0)");

          focus.select(".tooltip-box").
            attr("x", -tooltipTimeWidth - 5).
            attr("y", tooltipTimeY).
            attr("height", tooltipTimeHeight).
            attr("width", tooltipTimeWidth + tooltipPriceWidth + 5 + 5);
        }

        svg.select('.current-price-tag')
          .attr('transform', 'translate(' + (width + tagLeftMargin) + ',' + yPrice(price) + ')')
          .select('text')
          .text(price);
        if (price >= previousClose) {
          svg.select("g.current-price-tag rect")
            .attr('fill', "green")
        } else {
          svg.select("g.current-price-tag rect")
            .attr('fill', "red")
        }
        // adjusting current price line
        focus.select('line.line.line-current-price-line-1d-detailed')
          .attr("x1", 0 - x(time))
          .attr("x2", width - x(time))
          .attr("y1", yPrice(dataArray[index - 1].close))
          .attr("y2", yPrice(dataArray[index - 1].close))

        focus.select("circle")
          .attr("r", 5)
          .attr("transform", "translate(0," + yPrice(price) + ")");
      });
  }


}