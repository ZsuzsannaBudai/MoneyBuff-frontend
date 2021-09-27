export {}
// import React from "react";
// import {Doughnut} from "react-chartjs-2";
// import {MDBContainer} from "mdbreact";
//
// class ChartsPage extends React.Component {
//     state = {
//         labels: ["Income", "Expenses"],
//         datasets: [
//             {
//                 // @ts-ignore
//                 data: [this.props.totalIncome, this.props.totalExpenses],
//                 backgroundColor: ["#F7464A", "#46BFBD"],
//                 hoverBackgroundColor: [
//                     "#FF5A5E",
//                     "#5AD3D1",
//                 ]
//             }
//         ]
//     };
//
//     options = {
//         responsive: true,
//         elements: {
//             arc: {
//                 borderWidth: 0
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'bottom' as any,
//                 title: {
//                     display: true,
//                     padding: {
//                         top: 24
//                     }
//                 }
//             }
//         }
//     };
//
//     render() {
//         // this.state.datasets[]
//         return (
//             <MDBContainer id="doughnot">
//                 <Doughnut className="donut" data={this.state} options={this.options} />
//             </MDBContainer>
//         );
//     }
// }
//
// export default ChartsPage;