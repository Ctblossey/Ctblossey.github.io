function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var data_hold = data;
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var data_filtered = data.filter(data_hold.id = sample);
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var gauge_data = data.filter(data_hold.id = sample);
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var first = data_filtered[0];
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    var gauge_first = data_filtered[0]
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids_hold = data_filtered.out_ids;
    var otu_labels_hold = data_filtered.otu_labels;
    var sample_values_hold = data_filtered.sample_values;
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    var wash_freq = intToFloat(data_filtered.wfreq, 2);

    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks = data_filtered.otu_ids_hold

    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = {
      x: yticks.sample_values_hold,
      y: yticks.otu_labels_hold,
      type: 'h'

  };
  var data = [barData];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {

      title: "Top 10 Bacteria Cultures Found",
    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, barLayout)

    // Deliverable 2: 1. Create the trace for the bubble chart.
    var bubbleTrace = {
      x: yticks.sample_values_hold,
      y: yticks.sample_values_hold,
      mode: 'markers',
    };
    var bubbleData = [bubbleTrace];
    // Deliverable 2: 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Culters per Sample',
      xlabel: 'OTU ID',
      showlegend: false,
      hovermode: true,


    }

    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout)
    
    // Deliverable 3: 4. Create the trace for the gauge chart.
    var gaugeTrace = {
      domain: {x: [0,1], y: [0,1]},
      value: wash_freq,
      title: 'Belly Button Washing Frequency <font size="-1"> Scrubs per Week',

    }
    var gaugeData = [gaugeTrace];
    // Deliverable 3: 5. Create the layout for the gauge chart.
    var gauge_layout = {
      width: 600, height: 400, margin: { t: 0, b: 0}
    }

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gauge_layout);
  });
}
