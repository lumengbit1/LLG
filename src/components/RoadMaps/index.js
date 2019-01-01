import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import RoadMap1 from './RoadMap1'; // Left hand roadmap
import RoadMap6 from './RoadMap6'; // Right hand combined roadmaps
import Scores from './Scores';


const styles = theme => ({

})

class RoadMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roadMap1Data: [
        ['B','P','P','P','B','P','P','','','','','','','','','','','','',''],
        ['B','P','P','B','B','','','','','','','','','','','','','','',''],
        ['B-c-bottom-red','P-c-top-blue','T---green','B','B','','','','','','','','','','','','','','',''],
        ['B-c-bottom-red','P-c-top-blue','T---green','B','B','','','','','','','','','','','','','','',''],
        ['B-c-bottom-red','P-c-top-blue','T---green','B','B','','','','','','','','','','','','','','',''],
        ['B-c-bottom-red','P-c-top-blue','T---green','B','B','','','','','','','','','','','','','','','']
      ],
      roadMap6Data: {
        BigRoad: Array(6).fill(Array(60).fill('')),
        BigEye: Array(6).fill(Array(60).fill('')),
        SmallRoad: Array(6).fill(Array(60).fill('')),
        Cockroach: Array(6).fill(Array(60).fill('')),
        Predictor: {P:Array(3).fill(''), B:Array(3).fill('')},
      }
    }
  }

  componentDidUpdate(prevProps,prevState) {
  }

  onRightArrow() {
    console.log($('.roadmap-rh').innerWidth(),$('.roadmap-rh.main-tbl').innerWidth())
    $(".roadmap-rh").animate({scrollLeft: $('.main-tbl').innerWidth()}, 800);
  }

  render() {
    const {classes, roadmaps } = this.props;

    return (
        <footer className="footer-tbl">
    <div className="container">
      <div className="row">

        <div className="col-md-4">
          <div className="heading-div">
            <Scores betType="Main" />
          </div>
           <RoadMap1 rowData={roadmaps ? roadmaps.BeadRoad : Array(6).fill([])}/>
        </div>

        <div className="col-md-8">
          <div className="heading-div">
            <Scores betType="Side" />
          </div>
           <div className="footer-tbl-grid-mb">
            <div className="scroll-div roadmap-rh">
                <RoadMap6 rowData={roadmaps ? roadmaps : this.state.roadMap6Data} />
            </div>
             {document.body.clientWidth>460 ? (<a className="b-right-arrow" onClick={() => {this.onRightArrow()}}>
               <img src={require('../../images/arrow.png')} />
             </a>):''}
           </div>
        </div>
        </div>
      </div>
  </footer>
    )
  }
}

export default withStyles(styles)(RoadMaps);
