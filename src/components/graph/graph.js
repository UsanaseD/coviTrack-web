import React, { Component } from 'react';
import i18n from '../../i18n';
import Charts from 'react-apexcharts';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';


export default class graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    background: "#f4f4f4",
                    foreColor: "#333",
                },
                xaxis: {
                    type: "datetime",
                    categories: []
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                fill: {
                    colors: ["#F44336"]
                },
                dataLabels: {
                    enabled: false
                },

                title: {
                    text: "",
                    align: "center",
                    margin: 20,
                    offsetY: 20,
                    style: {
                        fontSize: "25px",
                    }
                },
                colors: ['#2E294E', '#4CAF50', '#FF4560'],
            },
            series: []
        }
    }
    componentWillReceiveProps(nextProps) {
        let data = [{
            name: "cases",
            data: []
        },
        {
            name: "recovered",
            data: []
        },
        {
            name: "deaths",
            data: []
        },
        ];
        let displayDate = []; 
    
        if (nextProps.history) {

            Object.keys(nextProps.history?.cases).forEach((key, index) => {
              displayDate.push(key);
            })
            Object.values(nextProps.history?.cases).forEach((value) => {
                data[0].data.push(value);
            });
            Object.values(nextProps.history?.recovered).forEach((value) => {
                data[1].data.push(value);
            });
            Object.values(nextProps.history?.deaths).forEach((value) => {
                data[2].data.push(value);
            });
            this.setState({
                options: {
                    ...this.state.options,
                    xaxis: {
                        ...this.state.options.xais,
                        categories: displayDate
                    },
                    title: {
                        ...this.state.options.title,
                        text: nextProps.countryName
                    }
                },
                series: data
            })
        }

    }
    render() {

        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {/* general title goes here */}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Charts
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height="450"
                            width="100%"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>{i18n.t('Close')}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

graph.propTypes = {
    fetchCountryHistory: PropTypes.object.isRequired
};


