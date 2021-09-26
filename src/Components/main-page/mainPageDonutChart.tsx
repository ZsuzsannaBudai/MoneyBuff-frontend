import React from "react";
import {Doughnut} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";

class ChartsPage extends React.Component {
    state = {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [
            {
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1",
                    "#FFC870",
                    "#A8B3C5",
                    "#616774"
                ]
            }
        ]
    };

    options = {
        responsive: true,
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        plugins: {
            legend: {
                position: 'bottom' as any,
                title: {
                    display: true,
                    padding: {
                        top: 24
                    }
                }
            }
        }
    };

    render() {
        return (
            <MDBContainer id="doughnot">
                <Doughnut className="donut" data={this.state} options={this.options} />
            </MDBContainer>
        );
    }
}

export default ChartsPage;