import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Terms from 'docs/src/pages/onepirate/Terms';

function Page() {
  return (
    <AppTheme title="(주)도울정보기술" description="A onepirate theme">
      <Terms />
    </AppTheme>
  );
}

export default Page;
