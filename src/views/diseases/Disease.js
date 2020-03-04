import React from "react";
import * as fromDiseaseApi from "../../api/diseases";
import LinearProgress from "@material-ui/core/LinearProgress";

class Disease extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            diseaseId: this.props.match.params.id,
            disease: {}
        };
    }

    componentDidMount = async () => {
        this.setState({
            isLoaded: true,
            diseaseId: this.props.match.params.id,
            disease: await fromDiseaseApi.getDisease(this.props.match.params.id)
        });
    };

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                isLoaded: false
            });
            this.setState({
                isLoaded: true,
                diseaseId: this.props.match.params.id,
                disease: await fromDiseaseApi.getDisease(this.props.match.params.id)
            });
        }
    };

    render() {
        if (! this.state.isLoaded) {
            return (
                <LinearProgress/>
            );
        }
        return (
            <div>
                <h1>Hello {this.state.disease.name}</h1>
                <p>Il y a eu {this.state.disease.contractedDiseases.length} cas.</p>
            </div>
        );
    }
}

export default Disease;