import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ChartPoint } from 'src/app/_models/chart-point';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageIndexesChartD3ServiceService {

  constructor() { }
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
        break;
      case "1Y":
      case "YTD":
      case "6M":
        return d3.timeFormat("%b");
        break;
      case "1M":
        return d3.timeFormat("%d %b");
        break;
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
      // const newWidth = svg.style("width");
      // const newFontSize = 0.6 * (width / parseInt(newWidth));

      // svg.selectAll(".tick text").style("font-size", newFontSize + "rem");
      // svg.selectAll(".focus text").style("font-size", 1.5 * newFontSize + "rem");
      // svg.selectAll(".close-tags text").style("font-size", 1.5 * newFontSize + "rem");
      // svg.selectAll("line").style("stroke-width", 0.5 * (width / parseInt(newWidth)));
      // svg.select("path#priceChart").style("stroke-width", 1 * (width / parseInt(newWidth)));
    }
  }

  public drawPlot(figureId: string, isContinuous: boolean, data: Observable<ChartPoint[]>, idValue: string, priceSvg: any,
    width: number, pricePlotHeight: number, previousClose: number, openPrice: number,
    closePrice: number): void {

    // isContinuous :  forex and bitcoin are calculated on a continuous basis, theres no opne and close time
    // for all practical purposes.
    data.pipe(
      map(res => {

        // sort data in the reverse order of time
        res.sort((a, b) => <any>b.date - <any>a.date)
        // get last open date
        let operatingDate = new Date(res[0].date).getDate();

        // only select data for the last open day
        let data: ChartPoint[] = [];

        if (isContinuous) {

          return {
            'data': res.reverse(),
          }
        } else {

          res.forEach(element => {
            if (new Date(element.date).getDate() == operatingDate) {
              data.push(element);
            }
          });
          // get the close time for previous day here
          let previousDayCloseDataPoint = res.find(_ => {
            return _.date.getDate() != operatingDate
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
        }
      })
    ).subscribe(res => {

      this.DrawPlot1DSimple(figureId, isContinuous, priceSvg, idValue, res, width, pricePlotHeight, previousClose, closePrice);
    });
  }

  private DrawPlot1DSimple(figureId: string, isContinuous: boolean, svg: any, idValue: string, dataObject: any,
    width: number, pricePlotHeight: number,
    previousClose: number, closePrice: number) {

    let data: ChartPoint[] = dataObject.data;

    let closeDataPoint: ChartPoint = isContinuous ? undefined : dataObject.closeTimestamp

    // clearing 
    svg.selectAll("*").remove();

    // Creating Price Plot //
    // Create the X-axis band scale
    let upperDomain: Date;
    if (isContinuous) {
      upperDomain = data[data.length - 1].date;
    } else {
      upperDomain = new Date(data[0].date.getFullYear(), data[0].date.getMonth(), data[0].date.getDate(), closeDataPoint.date.getHours(), closeDataPoint.date.getMinutes());
    }

    const x = d3.scaleTime()
      .range([0, width])
      .domain([
        data[0].date,
        upperDomain
      ]);




    // // Draw the X-axis on the DOM
    // svg.append("g")
    //   .attr("class", "x-axis x-axis-1d-detailed-plot")
    //   .attr("transform", "translate(0," + (pricePlotHeight) + ")")
    //   .call(d3.axisBottom(x).ticks(3).tickFormat(d3.timeFormat("%I %p")))
    //   .selectAll("text")
    //   .style("text-anchor", "end");

    // svg.selectAll("g.x-axis.x-axis-1d-detailed-plot .tick")
    //   .each(function (d) {
    //     this.childNodes[1].setAttribute("transform", "translate(" + (this.getBBox().width / 2) + ",0)")
    //   })

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
      return { 'date': d.date, 'close': d.close, 'volume': d.volume }
      // return { 'date': d.date, 'close': parseFloat(d.close.toFixed(2)), 'volume': d.volume }
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
      .attr("id", "simple-area-gradient-" + idValue)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", pricePlotHeight)
      .attr("x2", 0).attr("y2", pricePlotHeight - maxChartHeight)
      .selectAll("stop")
      .data([
        {
          "offset": "0%",
          "color": "white"
          // "color": "rgb(231, 245, 251)"
          // // "color": "rgb(242, 242, 242)",
        },
        {
          "offset": (minChartHeight) * 100 / maxChartHeight + "%",
          // "color": "rgb(231, 245, 251)",
          "color": "white"
        
        },
        {
          "offset": "100%",
          "color": "white"
        
          // "color": "rgb(231, 245, 251)"
          // "color": "rgb(242, 242, 242)"
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
      .curve(d3.curveBasis)
      .x(d => x(d['date']))
      .y(d => yPrice(d['close']));

    const priceArea = d3.area()
      .x(d => x(d['date']))
      .y1(d => yPrice(d['close']))
      .y0(pricePlotHeight);

    // price chart area  
    svg.append('path')
      .data([dataArray])
      .attr("id", "price-chart-area")
      .attr("d", priceArea)
      .style("fill", "url(#simple-area-gradient-" + idValue + ")")

    // price chart
    svg
      .append('path')
      .data([dataArray])
      .style('fill', 'none')
      .style('stroke', "rgb(90, 183, 226)")
      .attr('id', 'priceChart')
      .attr('d', priceLine);

    let gridlines = svg.append("g")
      .attr("id", "gridline-major-index-criss-cross")



    // let indexX = 0;
    //  let incrementX = width / 10

    // while (indexX <= width) {
    //   gridlines
    //     .append("line")
    //     .attr("x1", indexX)
    //     .attr("x2", indexX)
    //     .attr("y1", pricePlotHeight)
    //     .attr("y2", 0)
    //     .attr("stroke", "blue")
    //     .style("opacity", 0.4);
    //   indexX = indexX + incrementX;

    // }

    // let indexY = 0;
    // let incrementY = pricePlotHeight / 5
    // while (indexY <= pricePlotHeight) {
    //   gridlines
    //     .append("line")
    //     .attr("x1", 0)
    //     .attr("x2", width)
    //     .attr("y1", indexY)
    //     .attr("y2", indexY)
    //     .attr("stroke", "blue")
    //     .style("opacity", 0.4);

    //   indexY = indexY + incrementY

    // }


    /// adding glow filter

    let filter = svg.append("filter").attr("id", figureId + "-glow");
    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "2")
      .attr("edgeMode", "duplicate")
      .attr("result", "coloredBlur");

    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    svg.select("path#priceChart").style("filter", "url(#" + figureId + "-glow)");

    // adjusting size according to width
    const newWidth = svg.style("width");
    const newFontSize = 0.6 * (width / parseInt(newWidth));

    svg.selectAll(".tick text").style("font-size", newFontSize + "rem");
    svg.selectAll(".focus text").style("font-size", 1.5 * newFontSize + "rem");
    svg.selectAll(".close-tags text").style("font-size", 1.5 * newFontSize + "rem");
    svg.selectAll("line").style("stroke-width", 0.5 * (width / parseInt(newWidth)));
    svg.select("path#priceChart").style("stroke-width", 1 * (width / parseInt(newWidth)));

  }
}
