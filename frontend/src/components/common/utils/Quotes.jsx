import React from 'react';
import Text from 'components/common/utils/Text';
import { randomItem } from 'utils/helpers';
import AllQuotes from 'data/quotes';

const Quotes = () => {
  const quote = randomItem(AllQuotes);
  return (
    <Text.VerticalAlign>
      <div className="auth__quotes">
        <h4 className="auth__quotes--text">{quote.text}</h4>
        <p>- {quote.name}</p>
      </div>
    </Text.VerticalAlign>
  );
};

export default Quotes;
