import React from "react";
import Phone from "../Phone/Phone";
import "./PhonesList.css";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";

function PhonesList(props) {
	let phones = props.items;
	let { addToCart, removeFromCart, OrderId, total, changePage } = props;

	if (phones === null)
		return <Spinner isSpinning={true} />

	return (
		<React.Fragment>
			<div className="row">
				{
					phones.map((item) =>
						<div className="col-lg-3 col-md-4 mb-3">
							<Phone data={item} key={item.Id} addToCart={addToCart} removeFromCart={removeFromCart} OrderId={OrderId} />
						</div>
					)
				}
			</div>
			<div className="row">
				<Pagination total={total} changePage={changePage} />
			</div>
		</React.Fragment>
	);
}

export default PhonesList;