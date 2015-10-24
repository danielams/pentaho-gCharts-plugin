var gChartComponent = UnmanagedComponent.extend({

  options: {
    width: 400,
    height: 240,
    title: '',
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true,
  },

  update: function () {
    this.ph = $("#" + this.htmlObject).empty();
    var redraw = _.bind(this.redraw, this);
    if (typeof this.valuesArray != "undefined" && this.valuesArray.length > 0) {
      this.synchronous(redraw, this.valuesArray);
    } else {
      var params = Dashboards.propertiesArrayToObject(this.parameters);
      this.parameters = Dashboards.objectToPropertiesArray(params);
      this.triggerQuery(this.chartDefinition, redraw, {
      });
    }
  },

  values: function (object) {
    var arrayHeaders = new Array();
    var tempArray = new Array();
    var concatArray = new Array();
    for (var index = 0; index < object.queryState.lastResults().metadata.length; index++) {
      arrayHeaders.push(object.queryState.lastResults().metadata[index].colName.toString());
    }
    tempArray.push(arrayHeaders);
    return concatArray = tempArray.concat(object.queryState.lastResults().resultset);
  },

  redraw: function (Querydata) {

    var myself = this;
    google.load('visualization', '1.0', { 'packages': ['map'], callback: function () { drawChart(myself); } });

    function drawChart(myself) {
      var arrayData = new Array();
      arrayData = myself.values(myself);
      var data = new google.visualization.arrayToDataTable(arrayData);

      var options = (typeof (myself.chartDefinition.options) !== "undefined") ? myself.chartDefinition.options : myself.options;

      var wrapper = new google.visualization.ChartWrapper({
        chartType: myself.chartDefinition.chartType,
        dataTable: data,
        options: options,
        containerId: myself.htmlObject,
      });
      wrapper.draw();
    }

  },

}); 
