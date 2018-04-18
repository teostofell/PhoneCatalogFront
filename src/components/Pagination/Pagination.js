import React from "react";
import { Link } from "react-router-dom";
import PageItem from "./PageItem";

class Pagination extends React.Component {
	render(){
        let {total, changePage} = this.props;
        
        var pages = Array.from({length: total}, (v, k) => k+1);

		return (
            <ul className="pagination">
                {pages.map(p => 
                    <PageItem number={p} changePage={changePage}/>
                )}
            </ul>
		);
	}
}

export default Pagination;