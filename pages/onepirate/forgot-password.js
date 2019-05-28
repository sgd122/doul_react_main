import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import ForgotPassword from 'docs/src/pages/onepirate/ForgotPassword';

function Page() {
  return (
    <AppTheme title="(주)도울정보기술" description="A onepirate theme">
      <ForgotPassword />
    </AppTheme>
  );
}

export default Page;
