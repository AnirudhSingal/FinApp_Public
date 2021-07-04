import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { TwoDecimalPipe } from 'src/app/_pipes/two-decimal.pipe';


@Injectable({
  providedIn: 'root'
})
export class QuoteCardDataboxD3ServiceService {

  constructor() { }

  public createSvg(cssSelector: string): any {
    d3.select(cssSelector).selectAll("*").remove();
    return d3.select(cssSelector)
      .append("svg")
  }

  public responsivefy(cssSelector: string, width: number, height: number) {
    // get container + svg aspect ratio
    let svg: any = d3.select(cssSelector);
    
    if(!svg.empty()){
        svg.attr("viewBox", "0 0 " + width + " " + height)
          .attr("perserveAspectRatio", "xMinYMid meet")
        const newWidth = svg.style("width");
        const newFontSize = 0.6 * (width / parseInt(newWidth));
        

        svg.selectAll(".tick text").style("font-size", newFontSize+"rem")
        svg.selectAll(".focus text").style("font-size", 1.5*newFontSize+"rem")
        svg.selectAll(".close-tags text").style("font-size", 1.5*newFontSize+"rem")
        svg.selectAll("line").style("stroke-width", 0.5*(width / parseInt(newWidth)))
        svg.select("path#detailed-price-Chart").style("stroke-width", 1.5*(width / parseInt(newWidth)))
        svg.select("path#priceChart").style("stroke-width", 1*(width / parseInt(newWidth)))
    }
  }

  public drawRangePlot(svg: any, width: number, height: number, value:number, upperLimit: number, lowerLimit: number):void{

    svg.selectAll("*").remove();
    
    const x = d3.scaleTime()
      .range([0, width])
      .domain([
        lowerLimit, upperLimit
    ]);
    
    svg
      .attr("height", height)
      .attr("width", width)
      
    let radius = 5;
    // Draw the X-axis on the DOM
    svg.append('line')
      .attr('class', 'line line-range')
      .attr("x1", radius)
      .attr("y1", height)
      .attr("x2", width-radius)
      .attr("y2", height);

    svg.append("circle").attr("r", 0)
      .attr("r", radius)
      .attr("transform", "translate(" + (width*(value-lowerLimit)/(upperLimit -lowerLimit)) +"," + (height - 5) + ")");

  } 

}
