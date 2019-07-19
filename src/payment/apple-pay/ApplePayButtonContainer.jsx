import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '@edx/frontend-i18n';

import { basketSelector } from '../data/selectors';
import { addMessage, MESSAGE_TYPES } from '../../feedback';
import ApplePayButton from './ApplePayButton';
import { redirectToReceipt } from './service';

import messages from './ApplePay.messages';

function ApplePayButtonContainer(props) {
  const handleMerchantValidationFailure = useCallback(() => {
    props.addMessage(
      'apple-pay-failure',
      props.intl.formatMessage(messages['payment.apple.pay.merchant.validation.failure']),
      null,
      MESSAGE_TYPES.WARNING,
    );
  });

  const handlePaymentAuthorizationFailure = useCallback(() => {
    props.addMessage(
      'apple-pay-failure',
      props.intl.formatMessage(messages['payment.apple.pay.authorization.failure']),
      null,
      MESSAGE_TYPES.ERROR,
    );
  });

  return (
    <ApplePayButton
      totalAmount={props.orderTotal}
      onPaymentComplete={redirectToReceipt}
      onMerchantValidationFailure={handleMerchantValidationFailure}
      onPaymentAuthorizationFailure={handlePaymentAuthorizationFailure}
      title={props.intl.formatMessage(messages['payment.apple.pay.pay.with.apple.pay'])}
      lang={props.intl.locale}
    />
  );
}

ApplePayButtonContainer.propTypes = {
  orderTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addMessage: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

ApplePayButtonContainer.defaultProps = {
  orderTotal: undefined,
};

export default connect(basketSelector, {
  addMessage,
})(injectIntl(ApplePayButtonContainer));