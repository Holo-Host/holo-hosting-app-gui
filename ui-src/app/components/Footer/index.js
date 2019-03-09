import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage
          {...messages.orgMessage}
          values={{
            org: <A href="#">Holo.org</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
