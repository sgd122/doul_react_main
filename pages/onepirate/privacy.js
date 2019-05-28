import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Privacy from 'docs/src/pages/onepirate/Privacy';

function Page() {
  return (
    <AppTheme title="(주)도울정보기술" description="A onepirate theme">
      <Privacy />
    </AppTheme>
  );
}

export default Page;
