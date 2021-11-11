import { Bar } from "react-chartjs-2";
  
function App(props) {
  return (
    <div className="App">
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: props.labels,
            datasets: [
              {
                // Label for bars
                label: "Average Ratings",
                // Data or value of your each variable
                data: props.data,
                // Color of each bar
                backgroundColor: props.colors,
                // // Border color of each bar
                borderColor: props.colors,
                // borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
  
export default App;