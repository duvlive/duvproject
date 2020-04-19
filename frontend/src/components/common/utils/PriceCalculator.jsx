import React from 'react';
import PropTypes from 'prop-types';
import { moneyFormat, getPercentage, getNairaSymbol } from 'utils/helpers';
import { VAT, DEFAULT_COMMISSION } from 'utils/constants';

const PriceCalculator = ({ askingPrice, commission }) => {
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const commissionToUse = commission || DEFAULT_COMMISSION;

  const { bidsCommission, handlingPercent, handlingPlus } = commissionToUse;
  const calcCommission = getPercentage(bidsCommission) * askingPrice;
  const calcVat = getPercentage(VAT) * calcCommission;
  const handling =
    getPercentage(handlingPercent) * askingPrice + parseInt(handlingPlus, 10);
  const amountToPay = askingPrice - (calcCommission + calcVat + handling);
  const entertainerFee = amountToPay > 0 ? amountToPay : 0;
  return (
    <>
      <h6 className="mb-4 text-font font-weight-light">
        You will be paid {getNairaSymbol()}
        {moneyFormat(entertainerFee)}{' '}
      </h6>

      {showBreakdown && (
        <div className="card card-custom">
          <div className="card-body">
            <h5 className="card-title text-yellow">Breakdown</h5>
            <div className="table-responsive">
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Your Bid</td>
                    <td className="text-right">
                      {getNairaSymbol()}
                      {moneyFormat(askingPrice)}
                    </td>
                  </tr>
                  <tr>
                    <td>Commission ({bidsCommission}%)</td>
                    <td className="text-negative text-right">
                      - {moneyFormat(calcCommission)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      VAT ({VAT}%)
                      <small className="small--3 d-block text-muted">
                        From commision
                      </small>
                    </td>
                    <td className="text-negative text-right">
                      - {moneyFormat(calcVat)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Handling ({handlingPercent}% + N{handlingPlus})
                    </td>
                    <td className="text-negative text-right">
                      - {moneyFormat(handling)}
                    </td>
                  </tr>
                  <tr>
                    <td>You will be paid</td>
                    <td className="text-white text-right">
                      <h6>
                        {getNairaSymbol()}
                        {moneyFormat(entertainerFee)}
                      </h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div
        className="text-link mb-4"
        onClick={() => setShowBreakdown(!showBreakdown)}
      >
        {showBreakdown ? 'Hide Breakdown' : 'Show Breakdown'}
      </div>
    </>
  );
};

PriceCalculator.propTypes = {
  askingPrice: PropTypes.number.isRequired,
  commission: PropTypes.object.isRequired,
};

export default PriceCalculator;
