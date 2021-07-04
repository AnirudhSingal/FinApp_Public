import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { TwoDecimalPipe } from 'src/app/_pipes/two-decimal.pipe';

@Injectable({
  providedIn: 'root'
})
export class ListPageYearRangeD3Service {

  constructor(
    private twoDecimalPipe: TwoDecimalPipe
  ) { }

  public createSvg(cssSelector: string): any {
    d3.select(cssSelector).selectAll("*").remove();
    return d3.select(cssSelector)
      .append("svg")
  }

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
      svg.selectAll("line").style("stroke-width", 4 * (width / parseInt(newWidth)))
    }
  }

  public drawRangePlot(svg: any, width: number, height: number, currentPrice: number, dayHigh: number, dayLow: number, yearHigh: number, yearLow: number): void {



    svg.selectAll("*").remove();

    svg
      .attr("height", height)
      .attr("width", width)

    try {
      // Draw the X-axis on the DOM

      const x = d3.scalePoint()
        .range([0, width - height])
        .domain([
          yearLow.toString(), yearHigh.toString()
        ]);

      const x_axis = d3.axisBottom(x).ticks(2).tickSize(0);

      if ((yearHigh - yearLow) == 0) {
        throw Error;
      }

      svg.append('line')
        .attr('class', 'line line-year-range')
        .attr("x1", height / 2)
        // .attr("x1", radius)
        .attr("y1", 2 + height / 3)
        .attr("x2", width - height / 2)
        .attr("y2", 2 + height / 3);

      svg.append('line')
        .attr('class', 'line line-day-range')
        .attr("x1", height / 2 + (((dayLow - yearLow) * (width - height)) / (yearHigh - yearLow)))
        .attr("y1", 2 + height / 3)
        .attr("x2", height / 2 + (((dayHigh - yearLow) * (width - height)) / (yearHigh - yearLow)))
        .attr("y2", 2 + height / 3)

      let axis = svg.append("g")
        .call(x_axis)
        .attr("transform", "translate(10," + (4 + height / 3) + ")")


      axis.select("path").attr("color", "transparent")

      // moving the first tick towards right
      let firstTick = axis.select(".tick:first-of-type text")
      firstTick
        .attr('transform', 'translate(' + firstTick.node().getBBox().width / 2 + ',0)')

      // moving the last tick towards left
      let lastTick = axis.select(".tick:last-of-type text")
      lastTick
        .attr('transform', 'translate(' + (-1 * lastTick.node().getBBox().width / 2) + ',0)')

      //  pointer for current price
      let pointer = svg.append("g")
        .attr("class", "current-price-pointer")

      pointer
        .append('path')
        .attr('d', "m255.496 0c-96.853 0-175.649 78.796-175.649 175.649v.667c0 34.718 9.311 68.883 26.926 98.799l134.534 228.489c2.687 4.563 7.579 7.371 12.874 7.389h.052c5.274 0 10.164-2.771 12.873-7.3l136.427-228.089c18.064-30.2 27.612-64.764 27.612-99.955 0-96.853-78.796-175.649-175.649-175.649zm-1.262 75.506-75.506 75.506 33.805 75.506 75.506c0 41.7-33.805 75.506-75.506 75.506z")
        .attr('transform', "scale(" + (height / 3 / 512) + ")");

      pointer
        .attr('transform', "translate(" +
          ((height / 2 - pointer.node().getBBox().width / 2) + // to bring the pointer to the starting of the range
            (((currentPrice - yearLow) * (width - height)) / (yearHigh - yearLow))) + // to move the pointer to current value on range scale
          ",0)");
      // axis.select(".tick:first-child()").attr("color", "transparent")
      // axis.select(".tick:last-child()").attr("color", "transparent")
    } catch (error) {
      svg.selectAll("*").remove();
    };
    // if ((yearHigh - yearLow) != 0) {
    // }
  }
}