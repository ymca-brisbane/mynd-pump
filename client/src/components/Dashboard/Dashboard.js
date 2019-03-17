import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actions from "../../actions";
// import { Cube } from "react-preloaders";

class Dashboard extends Component {
  componentDidMount() {
    // try {
      this.props.fetchSessions(1, 30, "dateAdded", "desc", "");
      this.props.fetchTags(1, 30, "dateAdded", "desc", "");
      this.props.fetchStats();
      this.props.fetchGraphData(30, "one_month");
    // }
    // catch {
      // err => console.log(err);
    }
  // }

  render() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return (
        <div></div>

        // <Container>
        //     {/* <Wrapper>
        //       <Header>
        //         <Graph>
        //           <DashboardGraph />
        //         </Graph>
        //         <DashboardStats />
        //       </Header>
        //       <DashboardAnalytics />
        //     </Wrapper> */}
        // </Container>
      );
    } else {
      return (
        <div></div>

        // <Container>
        //   <Cube color={"#48c0b9"} bgColor={"transparent"} />
        // </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.stats.isLoading
});

export default connect(
  mapStateToProps,
  // actions
)(Dashboard);