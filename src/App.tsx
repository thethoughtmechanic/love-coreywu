import { DesktopApp } from './desktop/DesktopApp';
import { MOBILE_MEDIA, useMediaQuery } from './hooks/useMediaQuery';
import { MobileShell } from './mobile/MobileShell';

function App() {
  const isMobile = useMediaQuery(MOBILE_MEDIA);

  if (isMobile) {
    return <MobileShell />;
  }

  return <DesktopApp />;
}

export default App;
